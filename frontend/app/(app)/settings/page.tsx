"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/Card";

export default function SettingsPage() {
  const router = useRouter();
  const [name, setName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.push("/login");
      return;
    }
    setName(localStorage.getItem("userName") || "Guest");
  }, [router]);

  function handleLeaveWorkspace() {
    if (!confirm("Leave workspace? This will log you out and end your guest session.")) return;
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userName");
    router.push("/login");
  }

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-xl font-semibold mb-4">Profile</h1>

      <Card className="flex flex-col gap-4">
        <div>
          <label className="text-sm font-medium text-foreground/70">Name</label>
          <p className="text-base">{name}</p>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground/70">Account Type</label>
          <p className="text-base">Guest</p>
        </div>

        <div className="pt-4 border-t border-[var(--border)]">
          <p className="text-sm text-foreground/60 mb-2">
            Remove yourself from this workspace. This action ends your current guest session.
          </p>
          <button
            onClick={handleLeaveWorkspace}
            className="text-sm text-red-500 hover:underline"
          >
            Leave Workspace
          </button>
        </div>
      </Card>
    </div>
  );
}