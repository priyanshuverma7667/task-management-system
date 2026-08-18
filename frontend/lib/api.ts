const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function guestLogin(name?: string) {
  const res = await fetch(`${API_URL}/auth/guest`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });

  if (!res.ok) {
    throw new Error("Failed to log in as guest");
  }

  return res.json();
}