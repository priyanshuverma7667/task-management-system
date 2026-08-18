import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export default function Card({ className = "", children, ...props }: CardProps) {
  return (
    <div
      className={`rounded-lg border border-[var(--border)] bg-[var(--card)] p-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}