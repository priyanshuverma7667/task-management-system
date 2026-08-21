interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      {/* Overlay behind the sidebar on mobile, click to close */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed md:static top-0 left-0 h-full z-50
          w-56 border-r border-[var(--border)] bg-[var(--card)] flex flex-col p-4 gap-6
          transition-transform duration-200
          ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
        `}
      >
        <div className="font-semibold text-lg">Dexter</div>
        <nav className="flex flex-col gap-1">
          <a href="/board" className="px-3 py-2 rounded-md hover:bg-[var(--border)] text-sm font-medium">
            Tasks
          </a>
                   <a href="/projects" className="px-3 py-2 rounded-md hover:bg-[var(--border)] text-sm font-medium">
            Projects
          </a>
          <a href="/settings" className="px-3 py-2 rounded-md hover:bg-[var(--border)] text-sm font-medium">
            Settings
          </a>
        </nav>
      </aside>
    </>
  );
}