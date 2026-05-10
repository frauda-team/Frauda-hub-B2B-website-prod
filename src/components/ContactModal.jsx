import React from 'react'
import { createPortal } from 'react-dom'
import { Icon, LinkedInIcon } from './Brand'

export default function ContactModal({ onClose }) {
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return createPortal(
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9000,
        background: 'rgba(0,0,0,0.55)',
        backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px 20px',
        animation: 'fh-fadein .2s ease-out',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'var(--bg-elev)',
          border: '1px solid var(--border-strong)',
          borderRadius: 'var(--r-xl)',
          padding: '40px 36px',
          width: '100%', maxWidth: 420,
          boxShadow: 'var(--shadow-pop)',
          animation: 'fh-risein 0.3s cubic-bezier(0.22,1,0.36,1) both',
          position: 'relative',
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute', top: 16, right: 16,
            width: 36, height: 36, borderRadius: 8, border: '1px solid var(--border)',
            background: 'transparent', color: 'var(--fg-muted)',
            display: 'grid', placeItems: 'center', cursor: 'pointer',
            transition: 'background .12s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-soft)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <Icon.X size={13} />
        </button>

        <div className="h-eyebrow" style={{ marginBottom: 10 }}>Contact us</div>
        <h2 style={{ fontSize: 28, fontFamily: 'var(--font-display)', fontWeight: 700, margin: 0, color: 'var(--fg)' }}>
          Let's talk.
        </h2>
        <p style={{ fontSize: 15, color: 'var(--fg-muted)', lineHeight: 1.6, marginTop: 12, marginBottom: 28 }}>
          We're building Frauda Hub in the open and love hearing from businesses thinking about fraud prevention.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <ContactCard
            href="https://www.linkedin.com/company/frauda-hub"
            target="_blank"
            icon={<LinkedInIcon size={18} />}
            label="LinkedIn"
            sub="Follow & send us a message"
          />
          <ContactCard
            href="mailto:team@frauda.io"
            icon={<Icon.Mail size={18} />}
            label="Email"
            sub="team@frauda.io"
          />
        </div>
      </div>
    </div>,
    document.body
  )
}

function ContactCard({ href, target, icon, label, sub }) {
  const [hovered, setHovered] = React.useState(false)
  return (
    <a
      href={href}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      style={{
        textDecoration: 'none',
        display: 'flex', alignItems: 'center', gap: 14,
        padding: '14px 16px',
        borderRadius: 'var(--r-md)',
        border: '1px solid var(--border)',
        background: hovered ? 'var(--bg-soft)' : 'transparent',
        transition: 'background .12s',
        cursor: 'pointer',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        width: 40, height: 40, borderRadius: 10,
        background: 'var(--accent-soft)',
        display: 'grid', placeItems: 'center',
        color: 'var(--accent)', flexShrink: 0,
      }}>
        {icon}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--fg)' }}>{label}</div>
        <div style={{ fontSize: 13, color: 'var(--fg-muted)', marginTop: 2 }}>{sub}</div>
      </div>
      <Icon.Arrow size={12} style={{ color: 'var(--fg-faint)', flexShrink: 0 }} />
    </a>
  )
}
