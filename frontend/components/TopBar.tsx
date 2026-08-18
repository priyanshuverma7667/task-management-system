interface TopBarProps {
  onMenuClick: () => void;
}

export default function TopBar({ onMenuClick }: TopBarProps) {
  return (
    <header className="h-14 border-b border-[var(--border)] flex items-center justify-between px-2 sm:px-4 gap-2">
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <button
          onClick={onMenuClick}
          className="md:hidden shrink-0 px-2 py-1 rounded-md hover:bg-[var(--card)]"
          aria-label="Toggle menu"
        >
          ☰
        </button>
        <input
          type="text"
          placeholder="Search"
          className="px-3 py-1.5 rounded-md border border-[var(--border)] bg-[var(--card)] text-sm w-full min-w-0 max-w-[8rem] sm:max-w-xs focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
        />
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button className="px-2 sm:px-3 py-1.5 rounded-md border border-[var(--border)] text-sm font-medium hover:bg-[var(--card)]">
          <span className="hidden sm:inline">Fields</span>
          <span className="sm:hidden">⚙</span>
        </button>
        <button className="px-2 sm:px-3 py-1.5 rounded-md bg-foreground text-background text-sm font-medium hover:opacity-90 whitespace-nowrap">
          <span className="hidden sm:inline">+ Add Task</span>
          <span className="sm:hidden">+</span>
        </button>
      </div>
    </header>
  );
}