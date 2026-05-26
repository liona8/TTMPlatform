'use client'

import { Bell, Search, Moon, Sun, Menu } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import { useState } from 'react'

interface TopbarProps {
  title?: string
}

export function Topbar({ title }: TopbarProps) {
  const { theme, toggleTheme } = useTheme()
  const [searchFocused, setSearchFocused] = useState(false)

  return (
    <header className="topbar" role="banner">
      {/* ── Left: mobile menu + title ── */}
      <div className="topbar__left">
        <button className="topbar__menu-btn" aria-label="Open menu">
          <Menu size={20} strokeWidth={2} />
        </button>
        {title && (
          <h1 className="topbar__title text-headline-sm">{title}</h1>
        )}
      </div>

      {/* ── Center: search ── */}
      <div className={`topbar__search${searchFocused ? ' topbar__search--focused' : ''}`}>
        <Search size={16} strokeWidth={2} color="var(--on-surface-variant)" />
        <input
          type="search"
          placeholder="Search tasks, courses…"
          className="topbar__search-input text-body-sm"
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          aria-label="Search"
        />
      </div>

      {/* ── Right: actions ── */}
      <div className="topbar__actions">
        {/* Theme toggle */}
        <button
          className="topbar__icon-btn"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light'
            ? <Moon size={18} strokeWidth={2} />
            : <Sun size={18} strokeWidth={2} />
          }
        </button>

        {/* Notifications */}
        <button className="topbar__icon-btn topbar__notif-btn" aria-label="Notifications">
          <Bell size={18} strokeWidth={2} />
          <span className="topbar__badge" aria-label="3 unread notifications">3</span>
        </button>
      </div>

      <style>{`
        .topbar {
          position: sticky;
          top: 0;
          z-index: 50;
          height: var(--topbar-height);
          background: var(--surface-container-lowest);
          border-bottom: 1px solid var(--outline-variant);
          display: flex;
          align-items: center;
          gap: var(--space-2);
          padding: 0 var(--space-4);
        }

        .topbar__left {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
        }
        .topbar__title {
          color: var(--on-surface);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .topbar__menu-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--on-surface-variant);
          padding: 8px;
          border-radius: var(--radius-md);
          transition: background 0.15s;
        }
        .topbar__menu-btn:hover { background: var(--surface-container); }

        /* ── Search ── */
        .topbar__search {
          flex: 1;
          max-width: 480px;
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--surface-container-low);
          border: 1px solid var(--outline-variant);
          border-radius: var(--radius-md);
          padding: 0 12px;
          height: 40px;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .topbar__search--focused {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px color-mix(in srgb, var(--primary) 15%, transparent);
        }
        .topbar__search-input {
          flex: 1;
          background: none;
          border: none;
          outline: none;
          color: var(--on-surface);
          min-width: 0;
        }
        .topbar__search-input::placeholder { color: var(--on-surface-variant); }

        /* ── Actions ── */
        .topbar__actions {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-left: auto;
        }
        .topbar__icon-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--on-surface-variant);
          width: 40px;
          height: 40px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.15s, color 0.15s;
          position: relative;
        }
        .topbar__icon-btn:hover {
          background: var(--surface-container);
          color: var(--on-surface);
        }
        .topbar__notif-btn { position: relative; }
        .topbar__badge {
          position: absolute;
          top: 6px;
          right: 6px;
          width: 16px;
          height: 16px;
          border-radius: var(--radius-full);
          background: var(--error);
          color: var(--on-error);
          font-size: 10px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
        }

        @media (max-width: 768px) {
          .topbar { padding: 0 var(--space-2); }
          .topbar__menu-btn { display: flex; }
          .topbar__search { max-width: none; }
        }
      `}</style>
    </header>
  )
}