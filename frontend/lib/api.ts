const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function guestLogin(name?: string) {
  const res = await fetch(`${API_URL}/auth/guest`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) throw new Error("Failed to log in as guest");
  return res.json();
}

export async function getTasks(token: string) {
  const res = await fetch(`${API_URL}/tasks`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
}

export async function getTask(token: string, id: string) {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch task");
  return res.json();
}

export async function createTask(token: string, title: string, labels?: string[]) {
  const res = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, labels }),
  });
  if (!res.ok) throw new Error("Failed to create task");
  return res.json();
}

export async function updateTask(
  token: string,
  id: string,
  data: { title?: string; description?: string; status?: string; priority?: string; labels?: string[] }
) {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update task");
  return res.json();
}

export async function deleteTask(token: string, id: string) {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to delete task");
}

export async function getProjects(token: string) {
  const res = await fetch(`${API_URL}/projects`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
}

export async function createProject(token: string, name: string) {
  const res = await fetch(`${API_URL}/projects`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) throw new Error("Failed to create project");
  return res.json();
}

export async function deleteProject(token: string, id: string) {
  const res = await fetch(`${API_URL}/projects/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to delete project");
}