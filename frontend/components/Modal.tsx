interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ open, onClose, children }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div
        className="absolute inset-0"
        onClick={onClose}
      />
      <div className="relative bg-[var(--card)] border border-[var(--border)] rounded-lg p-6 w-full max-w-sm mx-4">
        {children}
      </div>
    </div>
  );
}