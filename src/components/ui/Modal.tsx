import React, { type ReactNode, useEffect, useRef } from 'react';

interface ModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
  widthClass?: string;
}

export const Modal: React.FC<ModalProps> = ({
  open,
  title,
  onClose,
  children,
  footer,
  widthClass = 'w-[90vw] max-w-[640px] sm:max-w-[520px] md:max-w-[640px]',
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[1px] px-3"
      onMouseDown={onBackdropClick}
    >
      <div
        ref={dialogRef}
        className={`relative bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.18)] ${widthClass} max-h-[90vh] overflow-hidden`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#eee]">
          <h3 className="text-lg font-semibold text-[#0f172a]">{title}</h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-[#666] hover:text-[#111] text-xl leading-none px-2"
          >
            ×
          </button>
        </div>
        <div className="px-5 py-4 overflow-y-auto max-h-[60vh] sm:max-h-[65vh]">
          {children}
        </div>
        {footer && (
          <div className="px-5 py-4 border-t border-[#eee] bg-[#fafafa] flex justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
