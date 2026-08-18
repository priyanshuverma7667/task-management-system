import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Input({ label, className = "", id, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`px-3 py-2 rounded-md border border-[var(--border)] bg-[var(--card)] text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] ${className}`}
        {...props}
      />
    </div>
  );
}