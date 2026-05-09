import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FraudaWordmark, FraudaMark, Icon, LinkedInIcon } from './Brand'

const LINKS = [
  { label: 'Hub',    path: '/hub' },
  { label: 'Fishpo', path: '/fishpo' },
  { label: 'Datco',  path: '/datco' },
]

export default function Nav({ theme, onToggleTheme }) {
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = React.useState(false)

  React.useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  React.useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <header className="nav-pad" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: '1px solid var(--border)',
        position: 'sticky', top: 0,
        background: 'color-mix(in srgb, var(--bg) 82%, transparent)',
        backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
        zIndex: 50, gap: 16,
      }}>
        {/* Left: logo + theme toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          <Link to="/hub" style={{ textDecoration: 'none', display: 'flex' }}>
            <FraudaWordmark size={26} />
          </Link>
          <button
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            style={{
              width: 44, height: 44, borderRadius: 999, display: 'grid', placeItems: 'center',
              border: '1px solid var(--border-strong)', background: 'transparent',
              color: 'var(--fg)', cursor: 'pointer', transition: 'background .15s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-soft)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            {theme === 'dark' ? <Icon.Sun size={14} /> : <Icon.Moon size={14} />}
          </button>
        </div>

        {/* Centre: desktop nav links */}
        <nav className="nav-links-desktop" style={{ alignItems: 'center' }}>
          {LINKS.map(l => (
            <Link
              key={l.path}
              to={l.path}
              style={{
                textDecoration: 'none', fontSize: 14, fontWeight: 500,
                color: pathname === l.path ? 'var(--fg)' : 'var(--fg-muted)',
                borderBottom: pathname === l.path ? '2px solid var(--accent)' : '2px solid transparent',
                paddingBottom: 2,
                transition: 'color .12s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--fg)'}
              onMouseLeave={e => e.currentTarget.style.color = pathname === l.path ? 'var(--fg)' : 'var(--fg-muted)'}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Right: actions + hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <div className="nav-actions-desktop">
            <a
              href="https://www.linkedin.com/company/frauda-hub/posts/?feedView=all"
              target="_blank" rel="noopener noreferrer"
              className="btn btn-ghost btn-sm"
              style={{ textDecoration: 'none' }}
            >
              <LinkedInIcon size={13} /> Follow
            </a>
            <button className="btn btn-primary btn-sm">
              Join early access <Icon.Arrow size={13} />
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="nav-mobile-toggle"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
            style={{
              width: 44, height: 44, borderRadius: 8, placeItems: 'center',
              border: '1px solid var(--border-strong)', background: 'transparent',
              color: 'var(--fg)', cursor: 'pointer',
            }}
          >
            {menuOpen ? <Icon.X size={16} /> : <MenuIcon />}
          </button>
        </div>
      </header>

      {/* Mobile fullscreen menu */}
      <div className={`nav-mobile-menu ${menuOpen ? 'open' : ''}`}>
        {LINKS.map(l => (
          <Link
            key={l.path}
            to={l.path}
            className={`nav-mobile-link ${pathname === l.path ? 'active' : ''}`}
          >
            {l.label}
          </Link>
        ))}
        <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <a
            href="https://www.linkedin.com/company/frauda-hub/posts/?feedView=all"
            target="_blank" rel="noopener noreferrer"
            className="btn btn-ghost"
            style={{ textDecoration: 'none', justifyContent: 'center' }}
          >
            <LinkedInIcon size={14} /> Follow on LinkedIn
          </a>
          <button className="btn btn-primary" style={{ justifyContent: 'center' }}>
            Join early access <Icon.Arrow size={14} />
          </button>
        </div>
      </div>
    </>
  )
}

function MenuIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M2 5h14M2 9h14M2 13h14" />
    </svg>
  )
}
