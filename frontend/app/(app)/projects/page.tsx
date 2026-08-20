"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getProjects, createProject, deleteProject } from "@/lib/api";
import Card from "@/components/Card";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Modal from "@/components/Modal";

interface Project {
  id: string;
  name: string;
  priority: string;
}

export default function ProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [creating, setCreating] = useState(false);

  function loadProjects(token: string) {
    getProjects(token)
      .then(setProjects)
      .catch(() => setError("Failed to load projects"))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.push("/login");
      return;
    }
    loadProjects(token);
  }, [router]);

  async function handleCreate() {
    const token = localStorage.getItem("accessToken");
    if (!token || !newName.trim()) return;
    setCreating(true);
    try {
      await createProject(token, newName.trim());
      setNewName("");
      setModalOpen(false);
      loadProjects(token);
    } catch {
      setError("Failed to create project");
    } finally {
      setCreating(false);
    }
  }

  async function handleDelete(id: string) {
    const token = localStorage.getItem("accessToken");
    if (!token) return;
    if (!confirm("Delete this project?")) return;
    try {
      await deleteProject(token, id);
      loadProjects(token);
    } catch {
      setError("Failed to delete project");
    }
  }

  if (loading) return <p className="text-sm text-foreground/70">Loading projects...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Projects</h1>
        <Button variant="primary" onClick={() => setModalOpen(true)}>
          + Add Project
        </Button>
      </div>

      {error && <p className="text-sm text-red-500 mb-2">{error}</p>}

      <div className="border border-[var(--border)] rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[var(--card)] text-left text-foreground/60">
            <tr>
              <th className="px-4 py-2 font-medium">Project</th>
              <th className="px-4 py-2 font-medium">Priority</th>
              <th className="px-4 py-2 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-t border-[var(--border)]">
                <td className="px-4 py-2">{project.name}</td>
                <td className="px-4 py-2 capitalize">{project.priority.replace("_", " ")}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="text-red-500 hover:underline text-xs"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-2 text-foreground/40">No projects</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <h2 className="text-lg font-semibold mb-4">New Project</h2>
        <Input
          label="Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="e.g. Website Redesign"
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