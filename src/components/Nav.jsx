import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FraudaWordmark, Icon, LinkedInIcon } from './Brand'

export default function Nav({ theme, onToggleTheme }) {
  const { pathname } = useLocation()

  const links = [
    { label: 'Hub', path: '/' },
    { label: 'Fishpo', path: '/fishpo' },
    { label: 'Datco', path: '/datco' },
  ]

  return (
    <header style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '20px 64px', borderBottom: '1px solid var(--border)',
      position: 'sticky', top: 0,
      background: 'color-mix(in srgb, var(--bg) 80%, transparent)',
      backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
      zIndex: 50,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <FraudaWordmark size={26} />
        </Link>
        <button
          onClick={onToggleTheme}
          aria-label="Toggle theme"
          style={{
            width: 32, height: 32, borderRadius: 999, display: 'grid', placeItems: 'center',
            border: '1px solid var(--border-strong)', background: 'transparent',
            color: 'var(--fg)', cursor: 'pointer', transition: 'background .15s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-soft)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          {theme === 'dark' ? <Icon.Sun size={14} /> : <Icon.Moon size={14} />}
        </button>
      </div>

      <nav style={{ display: 'flex', gap: 28, fontSize: 14 }}>
        {links.map(l => (
          <Link
            key={l.path}
            to={l.path}
            style={{
              textDecoration: 'none',
              color: pathname === l.path ? 'var(--fg)' : 'var(--fg-muted)',
              fontWeight: pathname === l.path ? 500 : 400,
              transition: 'color .12s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--fg)'}
            onMouseLeave={e => e.currentTarget.style.color = pathname === l.path ? 'var(--fg)' : 'var(--fg-muted)'}
          >
            {l.label}
          </Link>
        ))}
      </nav>

      <div style={{ display: 'flex', gap: 10 }}>
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
    </header>
  )
}
