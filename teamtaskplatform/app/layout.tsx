import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from '@/components/layout/SideBar'
import { Topbar } from '@/components/layout/TopBar'
import { ThemeProvider } from '@/components/layout/ThemeProvider'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: { default: 'EduTask', template: '%s | EduTask' },
  description: 'Your academic task management dashboard',
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body>
        <ThemeProvider>
          <div className="app-shell">
            {/* ── Sidebar (desktop) ── */}
            <Sidebar />

            {/* ── Main content area ── */}
            <div className="main-wrapper">
              <Topbar />
              <main className="main-content">
                {children}
              </main>
            </div>
          </div>
        </ThemeProvider>

        <style>{`
          .app-shell {
            display: flex;
            min-height: 100dvh;
            background-color: var(--background);
          }

          .main-wrapper {
            flex: 1;
            display: flex;
            flex-direction: column;
            min-width: 0;
            /* offset for fixed sidebar on desktop */
            margin-left: var(--sidebar-width);
          }

          .main-content {
            flex: 1;
            padding: var(--space-4);
            max-width: 1440px;
            width: 100%;
            margin: 0 auto;
          }

          /* ── Mobile: sidebar is hidden, no offset ── */
          @media (max-width: 768px) {
            .main-wrapper {
              margin-left: 0;
            }
            .main-content {
              padding: var(--space-2);
            }
          }
        `}</style>
      </body>
    </html>
  )
}
