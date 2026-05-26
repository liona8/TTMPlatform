interface ProgressBarProps {
  /** 0–100 */
  value: number
  className?: string
  showLabel?: boolean
  color?: string
}

export function ProgressBar({ value, className = '', showLabel = false, color }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value))
  const barColor = color ?? (clamped === 100 ? 'var(--secondary)' : 'var(--primary)')

  return (
    <div className={`progress-wrap ${className}`}>
      {showLabel && (
        <span className="progress-label text-label-sm">{clamped}%</span>
      )}
      <div
        className="progress-track"
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${clamped}% complete`}
      >
        <div
          className="progress-fill"
          style={{ width: `${clamped}%`, background: barColor }}
        />
      </div>

      <style>{`
        .progress-wrap {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .progress-label {
          color: var(--on-surface-variant);
          align-self: flex-end;
        }
        .progress-track {
          height: 4px;
          background: var(--surface-container-high);
          border-radius: var(--radius-full);
          overflow: hidden;
        }
        .progress-fill {
          height: 100%;
          border-radius: var(--radius-full);
          transition: width 0.4s ease;
        }
      `}</style>
    </div>
  )
}