'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  CheckSquare,
  CalendarDays,
  BookOpen,
  BarChart2,
  Settings,
  GraduationCap,
  X,
} from 'lucide-react'
import { useState } from 'react'

const NAV_ITEMS = [
  { href: '/',           label: 'Dashboard',  icon: LayoutDashboard },
  { href: '/tasks',      label: 'Tasks',      icon: CheckSquare },
  { href: '/calendar',   label: 'Calendar',   icon: CalendarDays },
  { href: '/courses',    label: 'Courses',    icon: BookOpen },
  { href: '/progress',   label: 'Progress',   icon: BarChart2 },
] as const

const BOTTOM_ITEMS = [
  { href: '/settings',   label: 'Settings',   icon: Settings },
] as const

export function Sidebar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* ── Mobile overlay ── */}
      {mobileOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setMobileOpen(false)}
          aria-hidden
        />
      )}

      <aside className={`sidebar${mobileOpen ? ' sidebar--open' : ''}`} aria-label="Main navigation">
        {/* Logo */}
        <div className="sidebar__logo">
          <GraduationCap size={24} strokeWidth={2} color="var(--on-primary)" />
          <span className="sidebar__logo-text">CampusTask</span>
          <button
            className="sidebar__close"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="sidebar__nav" role="navigation">
          <ul role="list">
            {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
              const active = pathname === href
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`sidebar__link${active ? ' sidebar__link--active' : ''}`}
                    aria-current={active ? 'page' : undefined}
                  >
                    <Icon size={20} strokeWidth={2} />
                    <span>{label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Bottom */}
        <div className="sidebar__bottom">
          {BOTTOM_ITEMS.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`sidebar__link${pathname === href ? ' sidebar__link--active' : ''}`}
            >
              <Icon size={20} strokeWidth={2} />
              <span>{label}</span>
            </Link>
          ))}

          {/* User avatar stub */}
          <div className="sidebar__user">
            <div className="sidebar__avatar" aria-hidden>JD</div>
            <div className="sidebar__user-info">
              <p className="text-label-md" style={{ color: 'var(--on-surface)' }}>Jane Doe</p>
              <p className="text-label-sm" style={{ color: 'var(--on-surface-variant)' }}>Computer Science</p>
            </div>
          </div>
        </div>
      </aside>

      <style>{`
        .sidebar {
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          width: var(--sidebar-width);
          background: var(--surface-container-lowest);
          border-right: 1px solid var(--outline-variant);
          display: flex;
          flex-direction: column;
          z-index: 100;
          transition: transform 0.25s ease;
        }

        /* ── Logo ── */
        .sidebar__logo {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 var(--space-2);
          height: var(--topbar-height);
          background: var(--primary-container);
          border-bottom: 1px solid var(--outline-variant);
          flex-shrink: 0;
        }
        .sidebar__logo-text {
          font-size: 18px;
          font-weight: 700;
          color: var(--on-primary);
          letter-spacing: -0.01em;
          flex: 1;
        }
        .sidebar__close {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--on-primary);
          padding: 4px;
          border-radius: var(--radius-sm);
        }

        /* ── Nav ── */
        .sidebar__nav {
          flex: 1;
          overflow-y: auto;
          padding: var(--space-2) var(--space-1);
        }
        .sidebar__nav ul { list-style: none; display: flex; flex-direction: column; gap: 2px; }

        .sidebar__link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          border-radius: var(--radius-md);
          color: var(--on-surface-variant);
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: background 0.15s, color 0.15s;
        }
        .sidebar__link:hover {
          background: var(--surface-container);
          color: var(--on-surface);
        }
        .sidebar__link--active {
          background: var(--surface-container-high);
          color: var(--primary);
          font-weight: 600;
        }

        /* ── Bottom ── */
        .sidebar__bottom {
          padding: var(--space-1);
          border-top: 1px solid var(--outline-variant);
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .sidebar__user {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          margin-top: 4px;
        }
        .sidebar__avatar {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-full);
          background: var(--primary);
          color: var(--on-primary);
          font-size: 12px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .sidebar__user-info { min-width: 0; }
        .sidebar__user-info p { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

        /* ── Mobile ── */
        .sidebar-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.4);
          z-index: 99;
          backdrop-filter: blur(2px);
        }

        @media (max-width: 768px) {
          .sidebar {
            transform: translateX(-100%);
            width: 280px;
            box-shadow: var(--shadow-3);
          }
          .sidebar--open {
            transform: translateX(0);
          }
          .sidebar__close {
            display: flex;
          }
        }
      `}</style>
    </>
  )
}