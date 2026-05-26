import {
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
  type ReactNode,
  forwardRef,
} from 'react'

/* ─── Shared style tag ─── */
const fieldStyles = `
  .field { display: flex; flex-direction: column; gap: 6px; }
  .field__label {
    font-size: 14px;
    font-weight: 600;
    color: var(--on-surface);
    line-height: 20px;
    letter-spacing: 0.02em;
  }
  .field__label--required::after { content: ' *'; color: var(--error); }
  .field__wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }
  .field__icon {
    position: absolute;
    left: 12px;
    color: var(--on-surface-variant);
    display: flex;
    pointer-events: none;
  }
  .field__control {
    width: 100%;
    height: 40px;
    padding: 0 12px;
    background: var(--surface-container-lowest);
    border: 1px solid var(--outline-variant);
    border-radius: var(--radius-md);
    font-family: inherit;
    font-size: 14px;
    color: var(--on-surface);
    outline: none;
    transition: border-color 0.15s, box-shadow 0.15s;
  }
  .field__control--with-icon { padding-left: 36px; }
  .field__control:focus {
    border-color: var(--primary);
    border-width: 2px;
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--primary) 15%, transparent);
  }
  .field__control:disabled { opacity: 0.5; cursor: not-allowed; background: var(--surface-container); }
  .field__control--error { border-color: var(--error) !important; }
  .field__control--error:focus { box-shadow: 0 0 0 3px color-mix(in srgb, var(--error) 15%, transparent); }
  .field__control::placeholder { color: var(--on-surface-variant); }
  .field__hint { font-size: 12px; color: var(--on-surface-variant); }
  .field__hint--error { color: var(--error); }
  textarea.field__control { height: auto; padding: 10px 12px; resize: vertical; }
`

/* ─── Input ─── */
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  hint?: string
  error?: string
  icon?: ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, error, icon, className = '', id, required, ...rest },
  ref,
) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
  const hasError = Boolean(error)

  return (
    <div className="field">
      {label && (
        <label
          htmlFor={inputId}
          className={`field__label${required ? ' field__label--required' : ''}`}
        >
          {label}
        </label>
      )}
      <div className="field__wrapper">
        {icon && <span className="field__icon">{icon}</span>}
        <input
          ref={ref}
          id={inputId}
          className={`field__control${icon ? ' field__control--with-icon' : ''}${hasError ? ' field__control--error' : ''} ${className}`}
          aria-invalid={hasError}
          aria-describedby={hint || error ? `${inputId}-hint` : undefined}
          required={required}
          {...rest}
        />
      </div>
      {(hint || error) && (
        <span
          id={`${inputId}-hint`}
          className={`field__hint${hasError ? ' field__hint--error' : ''}`}
        >
          {error ?? hint}
        </span>
      )}
      <style>{fieldStyles}</style>
    </div>
  )
})

/* ─── Textarea ─── */
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  hint?: string
  error?: string
  rows?: number
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, hint, error, rows = 4, className = '', id, required, ...rest },
  ref,
) {
  const fieldId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
  const hasError = Boolean(error)

  return (
    <div className="field">
      {label && (
        <label
          htmlFor={fieldId}
          className={`field__label${required ? ' field__label--required' : ''}`}
        >
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={fieldId}
        rows={rows}
        className={`field__control${hasError ? ' field__control--error' : ''} ${className}`}
        aria-invalid={hasError}
        aria-describedby={hint || error ? `${fieldId}-hint` : undefined}
        required={required}
        {...rest}
      />
      {(hint || error) && (
        <span
          id={`${fieldId}-hint`}
          className={`field__hint${hasError ? ' field__hint--error' : ''}`}
        >
          {error ?? hint}
        </span>
      )}
      <style>{fieldStyles}</style>
    </div>
  )
})