import { type ButtonHTMLAttributes, type ReactNode } from 'react'

type Variant = 'primary' | 'ghost' | 'danger'
type Size    = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  loading?: boolean
  children: ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  loading = false,
  children,
  disabled,
  className = '',
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`btn btn--${variant} btn--${size} ${className}`}
      disabled={disabled || loading}
      aria-busy={loading}
      {...rest}
    >
      {loading && <span className="btn__spinner" aria-hidden />}
      {!loading && icon && iconPosition === 'left' && (
        <span className="btn__icon" aria-hidden>{icon}</span>
      )}
      <span>{children}</span>
      {!loading && icon && iconPosition === 'right' && (
        <span className="btn__icon" aria-hidden>{icon}</span>
      )}

      <style>{`
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          border: none;
          border-radius: var(--radius);
          font-family: inherit;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.15s, box-shadow 0.15s, opacity 0.15s, transform 0.1s;
          white-space: nowrap;
          text-decoration: none;
        }
        .btn:active:not(:disabled) { transform: scale(0.97); }
        .btn:disabled { opacity: 0.5; cursor: not-allowed; }

        /* ── Sizes ── */
        .btn--sm { font-size: 13px; padding: 6px 12px; height: 32px; }
        .btn--md { font-size: 14px; padding: 8px 16px; height: 40px; }
        .btn--lg { font-size: 16px; padding: 10px 20px; height: 48px; }

        /* ── Variants ── */
        .btn--primary {
          background: var(--primary);
          color: var(--on-primary);
        }
        .btn--primary:hover:not(:disabled) {
          background: var(--primary-container);
          box-shadow: var(--shadow-2);
        }

        .btn--ghost {
          background: transparent;
          color: var(--primary);
          box-shadow: inset 0 0 0 1px var(--primary);
        }
        .btn--ghost:hover:not(:disabled) {
          background: var(--primary-fixed);
        }

        .btn--danger {
          background: var(--error);
          color: var(--on-error);
        }
        .btn--danger:hover:not(:disabled) {
          background: var(--on-error-container);
        }

        .btn__icon {
          display: flex;
          align-items: center;
        }

        /* Spinner */
        .btn__spinner {
          width: 14px;
          height: 14px;
          border: 2px solid currentColor;
          border-top-color: transparent;
          border-radius: var(--radius-full);
          animation: btn-spin 0.6s linear infinite;
          flex-shrink: 0;
        }
        @keyframes btn-spin { to { transform: rotate(360deg); } }
      `}</style>
    </button>
  )
}