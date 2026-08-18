"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Card from "@/components/Card";
import { guestLogin } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleGuestLogin() {
    setLoading(true);
    setError("");
    try {
      const data = await guestLogin();
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("userName", data.user.name);
      router.push("/board");
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-1 items-center justify-center min-h-screen">
      <Card className="flex flex-col gap-4 w-full max-w-sm text-center">
        <h1 className="text-2xl font-semibold">Let's get back on track</h1>
        <p className="text-sm text-foreground/70">
          Enter your email below to login to your account
        </p>

        <Button variant="primary" onClick={handleGuestLogin} disabled={loading}>
          {loading ? "Signing in..." : "Continue as Guest"}
        </Button>
        <Button variant="secondary" disabled={loading}>
          Login with Google
        </Button>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <p className="text-xs text-foreground/50">
          By clicking continue, you agree to our Terms of Service and Privacy Policy.
        </p>
      </Card>
    </div>
  );
}