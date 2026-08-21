"use client";

import { useEffect, useState } from "react";

const ACCENTS = [
  { name: "amber", hex: "#f59e0b" },
  { name: "blue", hex: "#3b82f6" },
  { name: "pink", hex: "#ec4899" },
  { name: "rose", hex: "#f43f5e" },
  { name: "emerald", hex: "#10b981" },
  { name: "black", hex: "#18181b" },
];

export default function ThemeMenu() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("light");
  const [accent, setAccent] = useState("blue");

  useEffect(() => {
    setMode(localStorage.getItem("theme-mode") || "light");
    setAccent(localStorage.getItem("theme-accent") || "blue");
  }, []);

  function setModeAndSave(newMode: string) {
    setMode(newMode);
    localStorage.setItem("theme-mode", newMode);
    document.documentElement.setAttribute("data-theme", newMode);
  }

  function setAccentAndSave(newAccent: string) {
    setAccent(newAccent);
    localStorage.setItem("theme-accent", newAccent);
    document.documentElement.setAttribute("data-accent", newAccent);
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-3 py-2 rounded-md hover:bg-[var(--border)] text-sm font-medium"
      >
        Theme
      </button>

      {open && (
        <div className="absolute bottom-full left-0 mb-1 w-48 bg-[var(--card)] border border-[var(--border)] rounded-md shadow-lg p-3 flex flex-col gap-3 z-50">
          <div>
            <p className="text-xs text-foreground/60 mb-1">Mode</p>
            <div className="flex gap-2">
              <button
                onClick={() => setModeAndSave("light")}
                className={`flex-1 text-xs px-2 py-1 rounded ${mode === "light" ? "bg-[var(--accent)] text-white" : "border border-[var(--border)]"}`}
              >
                Light
              </button>
              <button
                onClick={() => setModeAndSave("dark")}
                className={`flex-1 text-xs px-2 py-1 rounded ${mode === "dark" ? "bg-[var(--accent)] text-white" : "border border-[var(--border)]"}`}
              >
                Dark
              </button>
            </div>
          </div>

          <div>
            <p className="text-xs text-foreground/60 mb-1">Accent</p>
            <div className="flex flex-wrap gap-2">
              {ACCENTS.map((a) => (
                <button
                  key={a.name}
                  onClick={() => setAccentAndSave(a.name)}
                  title={a.name}
                  className={`w-6 h-6 rounded-full border-2 ${accent === a.name ? "border-foreground" : "border-transparent"}`}
                  style={{ backgroundColor: a.hex }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}