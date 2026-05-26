export type Status = 'pending' | 'in-progress' | 'completed' | 'overdue' | 'critical'

const STATUS_CONFIG: Record<Status, { label: string; bg: string; text: string; dot: string }> = {
  pending:     { label: 'Pending',     bg: 'var(--surface-container)',  text: 'var(--on-surface-variant)', dot: 'var(--outline)' },
  'in-progress':{ label: 'In Progress', bg: '#dbeafe',                  text: '#1e40af',                    dot: '#3b82f6' },
  completed:   { label: 'Completed',   bg: 'var(--secondary-container)',text: 'var(--on-secondary-container)', dot: 'var(--secondary)' },
  overdue:     { label: 'Overdue',     bg: 'var(--tertiary-fixed)',     text: 'var(--tertiary)',            dot: 'var(--tertiary)' },
  critical:    { label: 'Critical',    bg: 'var(--error-container)',    text: 'var(--on-error-container)',  dot: 'var(--error)' },
}

interface StatusChipProps {
  status: Status
}

export function StatusChip({ status }: StatusChipProps) {
  const config = STATUS_CONFIG[status]

  return (
    <span
      className="status-chip text-label-sm"
      style={{ background: config.bg, color: config.text }}
      role="status"
    >
      <span
        className="status-chip__dot"
        style={{ background: config.dot }}
        aria-hidden
      />
      {config.label}

      <style>{`
        .status-chip {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 3px 8px;
          border-radius: var(--radius);
          white-space: nowrap;
          flex-shrink: 0;
        }
        .status-chip__dot {
          width: 6px;
          height: 6px;
          border-radius: var(--radius-full);
          flex-shrink: 0;
        }
      `}</style>
    </span>
  )
}