import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export default function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  const base = "px-4 py-2 rounded-md font-medium transition-colors";
  const variants = {
    primary: "bg-foreground text-background hover:opacity-90",
    secondary: "border border-[var(--border)] bg-transparent text-foreground hover:bg-[var(--card)]",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props} />
  );
}