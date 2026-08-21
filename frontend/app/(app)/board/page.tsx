"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getTasks, createTask } from "@/lib/api";
import Card from "@/components/Card";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Modal from "@/components/Modal";

interface Task {
  id: string;
  title: string;
  status: string;
  priority: string;
  labels?: string[];
  dueDate?: string;
}

const COLUMNS = [
  { key: "todo", label: "To Do" },
  { key: "in_progress", label: "Doing" },
  { key: "done", label: "Completed" },
  { key: "on_hold", label: "On Hold" },
];

export default function BoardPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newLabels, setNewLabels] = useState("");
  const [creating, setCreating] = useState(false);
  const [view, setView] = useState<"board" | "list">("board");
  const [fieldsOpen, setFieldsOpen] = useState(false);
  const [showPriority, setShowPriority] = useState(true);
  const [showDueDate, setShowDueDate] = useState(false);

  function loadTasks(token: string) {
    getTasks(token)
      .then(setTasks)
      .catch(() => setError("Failed to load tasks"))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.push("/login");
      return;
    }
    loadTasks(token);
  }, [router]);

  async function handleCreate() {
    const token = localStorage.getItem("accessToken");
    if (!token || !newTitle.trim()) return;

    setCreating(true);
    try {
      const labelsArray = newLabels.split(",").map((l) => l.trim()).filter(Boolean);
      await createTask(token, newTitle.trim(), labelsArray);
      setNewTitle("");
      setNewLabels("");
      setModalOpen(false);
      loadTasks(token);
    } catch {
      setError("Failed to create task");
    } finally {
      setCreating(false);
    }
  }

  if (loading) return <p className="text-sm text-foreground/70">Loading tasks...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4 gap-2 flex-wrap">
        <h1 className="text-xl font-semibold">Tasks</h1>
        <div className="flex items-center gap-2">
          <div className="flex rounded-md border border-[var(--border)] overflow-hidden text-sm">
            <button
              onClick={() => setView("list")}
              className={`px-3 py-1.5 ${view === "list" ? "bg-[var(--accent)] text-white" : "hover:bg-[var(--card)]"}`}
            >
              List
            </button>
            <button
              onClick={() => setView("board")}
              className={`px-3 py-1.5 ${view === "board" ? "bg-[var(--accent)] text-white" : "hover:bg-[var(--card)]"}`}
            >
              Board
            </button>
          </div>

          <div className="relative">
            <Button variant="secondary" onClick={() => setFieldsOpen(!fieldsOpen)}>
              Fields
            </Button>
            {fieldsOpen && (
              <div className="absolute right-0 mt-1 w-44 bg-[var(--card)] border border-[var(--border)] rounded-md shadow-lg p-3 flex flex-col gap-2 z-50">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={showPriority}
                    onChange={(e) => setShowPriority(e.target.checked)}
                  />
                  Priority
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={showDueDate}
                    onChange={(e) => setShowDueDate(e.target.checked)}
                  />
                  Due Date
                </label>
              </div>
            )}
          </div>

          <Button variant="primary" onClick={() => setModalOpen(true)}>
            + Add Task
          </Button>
        </div>
      </div>

      {error && <p className="text-sm text-red-500 mb-2">{error}</p>}

      {view === "board" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {COLUMNS.map((column) => {
            const columnTasks = tasks.filter((t) => t.status === column.key);
            return (
              <div key={column.key} className="flex flex-col gap-3">
                <h2 className="text-sm font-semibold text-foreground/80">
                  {column.label} <span className="text-foreground/40">{columnTasks.length}</span>
                </h2>
                {columnTasks.map((task) => (
                  <Card
                    key={task.id}
                    className="text-sm flex flex-col gap-2 cursor-pointer hover:opacity-80"
                    onClick={() => router.push(`/board/${task.id}`)}
                  >
                    <span>{task.title}</span>
                    {task.labels && task.labels.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {task.labels.map((label) => (
                          <span
                            key={label}
                            className="text-xs px-2 py-0.5 rounded-full bg-[var(--border)] text-foreground/70"
                          >
                            {label}
                          </span>
                        ))}
                      </div>
                    )}
                  </Card>
                ))}
                {columnTasks.length === 0 && (
                  <p className="text-xs text-foreground/40">No tasks</p>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {COLUMNS.map((column) => {
            const columnTasks = tasks.filter((t) => t.status === column.key);
            return (
              <div key={column.key}>
                <h2 className="text-sm font-semibold text-foreground/80 mb-2">
                  {column.label} <span className="text-foreground/40">{columnTasks.length}</span>
                </h2>
                <div className="border border-[var(--border)] rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-[var(--card)] text-left text-foreground/60">
                      <tr>
                        <th className="px-4 py-2 font-medium">Task</th>
                        {showPriority && <th className="px-4 py-2 font-medium">Priority</th>}
                        {showDueDate && <th className="px-4 py-2 font-medium">Due Date</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {columnTasks.map((task) => (
                        <tr
                          key={task.id}
                          className="border-t border-[var(--border)] cursor-pointer hover:bg-[var(--card)]"
                          onClick={() => router.push(`/board/${task.id}`)}
                        >
                          <td className="px-4 py-2">{task.title}</td>
                          {showPriority && (
                            <td className="px-4 py-2 capitalize">{task.priority.replace("_", " ")}</td>
                          )}
                          {showDueDate && (
                            <td className="px-4 py-2">
                              {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "—"}
                            </td>
                          )}
                        </tr>
                      ))}
                      {columnTasks.length === 0 && (
                        <tr>
                          <td
                            colSpan={1 + (showPriority ? 1 : 0) + (showDueDate ? 1 : 0)}
                            className="px-4 py-2 text-foreground/40"
                          >
                            No tasks
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <h2 className="text-lg font-semibold mb-4">New Task</h2>
        <Input
          label="Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="e.g. Design homepage"
        />
        <Input
          label="Labels (comma-separated)"
          value={newLabels}
          onChange={(e) => setNewLabels(e.target.value)}
          placeholder="e.g. Design, Deployment"
        />
        <div className="flex gap-2 mt-4">
          <Button variant="primary" onClick={handleCreate} disabled={creating}>
            {creating ? "Creating..." : "Create"}
          </Button>
          <Button variant="secondary" onClick={() => setModalOpen(false)}>
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
}