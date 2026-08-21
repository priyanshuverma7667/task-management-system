"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getTask, updateTask, deleteTask } from "@/lib/api";
import Card from "@/components/Card";
import Button from "@/components/Button";
import Input from "@/components/Input";

interface Task {
  id: string;
  title: string;
  description?: string;
  status: string;
  priority: string;
  labels?: string[];
}

const STATUS_OPTIONS = ["todo", "in_progress", "done", "on_hold"];
const PRIORITY_OPTIONS = ["no_priority", "urgent", "high", "medium", "low"];

export default function TaskDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");
  const [priority, setPriority] = useState("no_priority");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.push("/login");
      return;
    }
    getTask(token, id)
      .then((t) => {
        setTask(t);
        setTitle(t.title);
        setDescription(t.description || "");
        setStatus(t.status);
        setPriority(t.priority);
      })
      .catch(() => setError("Failed to load task"))
      .finally(() => setLoading(false));
  }, [id, router]);

  async function handleSave() {
    const token = localStorage.getItem("accessToken");
    if (!token) return;
    setSaving(true);
    try {
      await updateTask(token, id, { title, description, status, priority });
      router.push("/board");
    } catch {
      setError("Failed to save task");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    const token = localStorage.getItem("accessToken");
    if (!token) return;
    if (!confirm("Delete this task?")) return;
    try {
      await deleteTask(token, id);
      router.push("/board");
    } catch {
      setError("Failed to delete task");
    }
  }

  if (loading) return <p className="text-sm text-foreground/70">Loading...</p>;
  if (error) return <p className="text-sm text-red-500">{error}</p>;
  if (!task) return null;

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={() => router.push("/board")}
        className="text-sm text-foreground/60 hover:text-foreground mb-4"
      >
        ← Back to board
      </button>

      <Card className="flex flex-col gap-4">
        <Input label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="px-3 py-2 rounded-md border border-[var(--border)] bg-[var(--card)] text-foreground focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          />
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col gap-1 flex-1">
            <label className="text-sm font-medium">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="px-3 py-2 rounded-md border border-[var(--border)] bg-[var(--card)] text-foreground focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>{s.replace("_", " ")}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1 flex-1">
            <label className="text-sm font-medium">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="px-3 py-2 rounded-md border border-[var(--border)] bg-[var(--card)] text-foreground focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            >
              {PRIORITY_OPTIONS.map((p) => (
                <option key={p} value={p}>{p.replace("_", " ")}</option>
              ))}
            </select>
          </div>
        </div>

        {task.labels && task.labels.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {task.labels.map((label) => (
              <span key={label} className="text-xs px-2 py-0.5 rounded-full bg-[var(--border)] text-foreground/70">
                {label}
              </span>
            ))}
          </div>
        )}

        <div className="flex gap-2 mt-2">
          <Button variant="primary" onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </Button>
          <Button variant="secondary" onClick={() => router.push("/board")}>
            Cancel
          </Button>
          <button
            onClick={handleDelete}
            className="ml-auto text-sm text-red-500 hover:underline"
          >
            Delete task
          </button>
        </div>
      </Card>
    </div>
  );
}