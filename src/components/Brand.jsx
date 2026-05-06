import React from 'react'

export function FraudaMark({ size = 22, variant = 'gradient' }) {
  const gid = React.useId()
  const fill = variant === 'mono' ? 'currentColor' : `url(#${gid})`
  return (
    <svg width={size} height={size} viewBox="0 0 1080 1080" aria-hidden="true"
      style={{ display: 'block', flexShrink: 0 }}>
      <defs>
        <linearGradient id={gid} x1="326" y1="1282" x2="421" y2="277" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3271D7" />
          <stop offset="1" stopColor="#1A3C71" />
        </linearGradient>
      </defs>
      <path d="M894 496H588.511C584.356 496 580.893 499.181 580.54 503.321L572.65 596H886.631C877.785 648.961 860.975 699.461 836.198 747.5H566.564C562.388 747.5 558.914 750.714 558.589 754.878L539.779 995.942C485.633 982.048 436.48 958.786 392.317 926.156L440.065 353.17C440.497 347.987 444.83 344 450.031 344H894V496ZM894 298H414.642C406.354 298 399.438 304.329 398.704 312.584L347.57 888.247C325.632 867.08 305.146 843.186 286.115 816.562C219.372 723.188 186 619.5 186 505.5V84H894V298Z" fill={fill} />
    </svg>
  )
}

export function FraudaWordmark({ size = 18 }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 10,
      fontFamily: 'var(--font-display)',
      fontSize: size, fontWeight: 600, letterSpacing: '-0.025em',
      lineHeight: 1, color: 'var(--fg)',
    }}>
      <FraudaMark size={size * 1.5} />
      <span>Frauda <span style={{ opacity: 0.55, fontWeight: 400 }}>Hub</span></span>
    </span>
  )
}

export function StatusDot({ tone = 'ok', pulse = true }) {
  const colors = {
    ok:     'var(--ok)',
    warn:   'var(--warn)',
    danger: 'var(--danger)',
    idle:   'var(--fg-faint)',
  }
  const c = colors[tone] || tone
  return (
    <span style={{ position: 'relative', width: 8, height: 8, display: 'inline-block', flexShrink: 0 }}>
      <span style={{
        position: 'absolute', inset: 0, borderRadius: '50%',
        background: c,
        animation: pulse ? 'fh-pulse 1.6s ease-in-out infinite' : 'none',
      }} />
      <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: c }} />
    </span>
  )
}

export function GridBg({ opacity = 0.5 }) {
  return (
    <div aria-hidden="true" style={{
      position: 'absolute', inset: 0, pointerEvents: 'none', opacity,
      backgroundImage:
        'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
      backgroundSize: '32px 32px',
      maskImage: 'radial-gradient(ellipse at center, #000 30%, transparent 75%)',
    }} />
  )
}

export function LinkedInIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3V9zm6 0h3.8v1.65h.05c.53-.95 1.83-1.95 3.77-1.95C20.4 8.7 21 11 21 14.05V21h-4v-6.2c0-1.48-.03-3.38-2.06-3.38-2.06 0-2.38 1.6-2.38 3.27V21H9V9z" />
    </svg>
  )
}

export const Icon = {
  Shield: (p) => (
    <svg viewBox="0 0 24 24" width={p.size||16} height={p.size||16} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z"/>
    </svg>
  ),
  Bolt: (p) => (
    <svg viewBox="0 0 24 24" width={p.size||16} height={p.size||16} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 3 4 14h7l-1 7 9-11h-7l1-7z"/>
    </svg>
  ),
  Eye: (p) => (
    <svg viewBox="0 0 24 24" width={p.size||16} height={p.size||16} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  Lock: (p) => (
    <svg viewBox="0 0 24 24" width={p.size||16} height={p.size||16} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="11" width="16" height="10" rx="2"/>
      <path d="M8 11V7a4 4 0 0 1 8 0v4"/>
    </svg>
  ),
  Check: (p) => (
    <svg viewBox="0 0 24 24" width={p.size||16} height={p.size||16} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12l5 5L20 6"/>
    </svg>
  ),
  Arrow: (p) => (
    <svg viewBox="0 0 24 24" width={p.size||16} height={p.size||16} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6"/>
    </svg>
  ),
  Alert: (p) => (
    <svg viewBox="0 0 24 24" width={p.size||16} height={p.size||16} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l10 18H2L12 3z"/>
      <path d="M12 10v5M12 18h.01"/>
    </svg>
  ),
  Play: (p) => (
    <svg viewBox="0 0 24 24" width={p.size||16} height={p.size||16} fill="currentColor">
      <path d="M7 4v16l13-8L7 4z"/>
    </svg>
  ),
  Search: (p) => (
    <svg viewBox="0 0 24 24" width={p.size||16} height={p.size||16} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7"/>
      <path d="M21 21l-4.3-4.3"/>
    </svg>
  ),
  Mail: (p) => (
    <svg viewBox="0 0 24 24" width={p.size||16} height={p.size||16} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2"/>
      <path d="M3 7l9 6 9-6"/>
    </svg>
  ),
  Chip: (p) => (
    <svg viewBox="0 0 24 24" width={p.size||16} height={p.size||16} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="6" width="12" height="12" rx="2"/>
      <path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3"/>
    </svg>
  ),
  Sun: (p) => (
    <svg viewBox="0 0 24 24" width={p.size||16} height={p.size||16} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4"/>
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
    </svg>
  ),
  Moon: (p) => (
    <svg viewBox="0 0 24 24" width={p.size||16} height={p.size||16} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  ),
  X: (p) => (
    <svg viewBox="0 0 24 24" width={p.size||16} height={p.size||16} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M18 6L6 18M6 6l12 12"/>
    </svg>
  ),
}
