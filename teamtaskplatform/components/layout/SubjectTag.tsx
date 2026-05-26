/** Color map for subject categories */
export const SUBJECT_COLORS = {
  CS:    { bg: '#dbeafe', text: '#1e40af', accent: '#3b82f6' }, // blue
  MATH:  { bg: '#fef3c7', text: '#92400e', accent: '#f59e0b' }, // amber
  ENG:   { bg: '#d1fae5', text: '#065f46', accent: '#10b981' }, // emerald
  PHYS:  { bg: '#ede9fe', text: '#4c1d95', accent: '#7c3aed' }, // violet
  HIST:  { bg: '#fee2e2', text: '#7f1d1d', accent: '#ef4444' }, // red
  BIO:   { bg: '#ccfbf1', text: '#134e4a', accent: '#14b8a6' }, // teal
  CHEM:  { bg: '#fce7f3', text: '#831843', accent: '#ec4899' }, // pink
  ECON:  { bg: '#f0fdf4', text: '#14532d', accent: '#22c55e' }, // green
} as const

export type SubjectKey = keyof typeof SUBJECT_COLORS

interface SubjectTagProps {
  subject: SubjectKey
  label?: string
}

export function SubjectTag({ subject, label }: SubjectTagProps) {
  const colors = SUBJECT_COLORS[subject] ?? { bg: '#f1f5f9', text: '#475569', accent: '#64748b' }

  return (
    <span
      className="subject-tag text-label-sm"
      style={{
        background: colors.bg,
        color: colors.text,
      }}
    >
      {label ?? subject}

      <style>{`
        .subject-tag {
          display: inline-flex;
          align-items: center;
          padding: 2px 8px;
          border-radius: var(--radius-full);
          white-space: nowrap;
          flex-shrink: 0;
        }
      `}</style>
    </span>
  )
}