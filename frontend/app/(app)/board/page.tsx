"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getTasks } from "@/lib/api";
import Card from "@/components/Card";

interface Task {
  id: string;
  title: string;
  status: string;
  priority: string;
}

const COLUMNS = [
  { key: "todo", label: "To Do" },
  { key: "in_progress", label: "Doing" },
  { key: "done", label: "Completed" },
];

export default function BoardPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.push("/login");
      return;
    }

    getTasks(token)
      .then(setTasks)
      .catch(() => setError("Failed to load tasks"))
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) return <p className="text-sm text-foreground/70">Loading tasks...</p>;
  if (error) return <p className="text-sm text-red-500">{error}</p>;

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {COLUMNS.map((column) => {
        const columnTasks = tasks.filter((t) => t.status === column.key);
        return (
          <div key={column.key} className="flex flex-col gap-3 w-72 shrink-0">
            <h2 className="text-sm font-semibold text-foreground/80">
              {column.label} <span className="text-foreground/40">{columnTasks.length}</span>
            </h2>
            {columnTasks.map((task) => (
              <Card key={task.id} className="text-sm">
                {task.title}
              </Card>
            ))}
            {columnTasks.length === 0 && (
              <p className="text-xs text-foreground/40">No tasks</p>
            )}
          </div>
        );
      })}
    </div>
  );
}