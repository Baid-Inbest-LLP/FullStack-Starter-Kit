import { useEffect, useRef, useState } from 'react';

export default function ConfirmModal({
  open,
  opened,
  title = 'Are you sure?',
  message = '',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'danger',
  loading = false,
  onConfirm,
  onCancel,
  onClose,
}) {
  const isOpen = open ?? opened;
  const handleCancel = onCancel || onClose;
  const confirmRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => setVisible(true));
      confirmRef.current?.focus();
    } else {
      setVisible(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') handleCancel?.();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, handleCancel]);

  if (!isOpen) return null;

  const themes = {
    danger: {
      iconBg: 'confirm-modal-icon confirm-modal-icon--danger',
      accentBar: 'bg-gradient-to-r from-red-500 to-rose-500',
      btn: 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-red-200 hover:shadow-red-300',
      btnFocus: 'focus-visible:ring-red-500',
    },
    warning: {
      iconBg: 'confirm-modal-icon confirm-modal-icon--warning',
      accentBar: 'bg-gradient-to-r from-amber-400 to-orange-500',
      btn: 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-amber-200 hover:shadow-amber-300',
      btnFocus: 'focus-visible:ring-amber-500',
    },
    primary: {
      iconBg: 'confirm-modal-icon confirm-modal-icon--primary',
      accentBar: 'confirm-modal-accent-bar--primary',
      btn: 'bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 shadow-primary-200 hover:shadow-primary-300',
      btnFocus: 'focus-visible:ring-primary-500',
    },
  };

  const t = themes[variant] || themes.danger;

  const icons = {
    danger: (
      <svg
        className="w-7 h-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
    ),
    warning: (
      <svg
        className="w-7 h-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
        />
      </svg>
    ),
    primary: (
      <svg
        className="w-7 h-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      onClick={handleCancel}
    >
      <div
        className={`absolute inset-0 bg-gray-900/60 backdrop-blur-[6px] transition-opacity duration-300 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div
        className={`confirm-modal-card relative rounded-3xl w-full max-w-[380px] overflow-hidden transition-all duration-300 ease-out ${
          visible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-1 w-full">
          <div className={`h-full w-full ${t.accentBar}`} />
        </div>

        <div className="px-7 pt-7 pb-2 text-center">
          <div
            className={`w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center ring-8 ${t.iconBg}`}
          >
            {icons[variant] || icons.danger}
          </div>

          <h3 className="confirm-modal-title text-[1.1rem] font-bold leading-tight mb-2">{title}</h3>
          {message && (
            <p className="confirm-modal-message text-[0.85rem] leading-relaxed max-w-[280px] mx-auto">
              {message}
            </p>
          )}
        </div>

        <div className="px-7 pb-7 pt-4 flex gap-3">
          <button
            type="button"
            onClick={handleCancel}
            disabled={loading}
            className="confirm-modal-cancel flex-1 px-4 py-2.5 text-sm font-semibold rounded-xl transition-all duration-150 active:scale-[0.97] disabled:opacity-50"
          >
            {cancelLabel}
          </button>
          <button
            ref={confirmRef}
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className={`flex-1 px-4 py-2.5 text-sm font-semibold text-white rounded-xl shadow-lg transition-all duration-150 active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 ${t.btn} ${t.btnFocus}`}
          >
            {loading ? 'Please wait…' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
