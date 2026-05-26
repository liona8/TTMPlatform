import { Clock, ChevronRight } from 'lucide-react'
import { SubjectTag, SUBJECT_COLORS } from './SubjectTag'
import { StatusChip, type Status } from './StatusChip'
import { ProgressBar } from './ProgressBar'

export interface TaskCardProps {
  title: string
  subject: keyof typeof SUBJECT_COLORS
  dueDate: string
  status: Status
  /** 0–100 */
  progress?: number
  description?: string
  onClick?: () => void
}

export function TaskCard({
  title,
  subject,
  dueDate,
  status,
  progress,
  description,
  onClick,
}: TaskCardProps) {
  const accentColor = SUBJECT_COLORS[subject]?.accent ?? 'var(--primary)'

  return (
    <article
      className="task-card card-hover card-border"
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
      style={{ '--accent': accentColor } as React.CSSProperties}
    >
      {/* Left accent bar */}
      <div className="task-card__accent" aria-hidden />

      <div className="task-card__body">
        {/* Header row */}
        <div className="task-card__header">
          <SubjectTag subject={subject} />
          <StatusChip status={status} />
        </div>

        {/* Title */}
        <h3 className="task-card__title text-headline-sm">{title}</h3>

        {/* Description */}
        {description && (
          <p className="task-card__desc text-body-sm">{description}</p>
        )}

        {/* Progress bar */}
        {progress !== undefined && (
          <ProgressBar value={progress} className="task-card__progress" />
        )}

        {/* Footer */}
        <div className="task-card__footer">
          <span className="task-card__due text-label-sm">
            <Clock size={12} strokeWidth={2} />
            Due {dueDate}
          </span>
          {onClick && (
            <ChevronRight size={16} strokeWidth={2} color="var(--outline)" />
          )}
        </div>
      </div>

      <style>{`
        .task-card {
          background: var(--surface-container-lowest);
          border-radius: var(--radius-md);
          display: flex;
          overflow: hidden;
          cursor: ${onClick ? 'pointer' : 'default'};
          box-shadow: var(--shadow-1);
          transition: box-shadow 0.2s ease, transform 0.2s ease;
        }
        .task-card:hover {
          box-shadow: var(--shadow-2);
          transform: translateY(-1px);
        }

        /* 4px accent left border */
        .task-card__accent {
          width: 4px;
          flex-shrink: 0;
          background: var(--accent);
        }

        .task-card__body {
          flex: 1;
          padding: var(--space-2);
          display: flex;
          flex-direction: column;
          gap: 8px;
          min-width: 0;
        }

        .task-card__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }

        .task-card__title {
          color: var(--on-surface);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .task-card__desc {
          color: var(--on-surface-variant);
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .task-card__progress { margin-top: 4px; }

        .task-card__footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 4px;
        }
        .task-card__due {
          display: flex;
          align-items: center;
          gap: 4px;
          color: var(--on-surface-variant);
        }
      `}</style>
    </article>
  )
}