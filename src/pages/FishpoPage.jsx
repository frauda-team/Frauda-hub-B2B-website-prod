import React from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import { FraudaMark, Icon, StatusDot, GridBg, LinkedInIcon, FraudaWordmark } from '../components/Brand'
import FishpoDemo from '../components/FishpoDemo'
import DashboardDemo from '../components/DashboardDemo'

export default function FishpoPage({ theme, onToggleTheme }) {
  const [modal, setModal] = React.useState(null)

  return (
    <div className="page-wrap" style={{ width: '100%', minHeight: '100vh', background: 'var(--bg)', color: 'var(--fg)' }}>
      <Nav theme={theme} onToggleTheme={onToggleTheme} />
      <Hero onOpenDemo={() => setModal('demo')} onOpenDashboard={() => setModal('dashboard')} />
      <Solution />
      <DemoCTA onOpenDemo={() => setModal('demo')} onOpenDashboard={() => setModal('dashboard')} />
      <Pillars />
      <FinalCTA />
      <Footer />
      {modal && (
        <Modal
          title={modal === 'demo' ? 'Fishpo — detection video' : 'Fishpo — admin console video'}
          onClose={() => setModal(null)}
        >
          {modal === 'demo'      && <FishpoDemo />}
          {modal === 'dashboard' && <DashboardDemo />}
        </Modal>
      )}
    </div>
  )
}

function Hero({ onOpenDemo }) {
  return (
    <section className="hero-sect" style={{ position: 'relative', overflow: 'hidden' }}>
      <GridBg opacity={0.5} />
      <div aria-hidden="true" className="hero-blob" style={{
        position: 'absolute', top: -200, right: -160, width: 720, height: 720,
        background: 'radial-gradient(closest-side, rgba(50,113,215,0.18), transparent 70%)',
      }} />

      <div className="inner" style={{ position: 'relative' }}>
        <div className="hero-badge" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32, flexWrap: 'wrap' }}>
          <Link to="/hub" className="hub-chip">
            <FraudaMark size={14} />
            A Frauda Hub product
          </Link>
          <div className="chip chip-accent">
            <StatusDot tone="ok" /> Pilot open
          </div>
        </div>

        <h1 className="h-display hero-headline" style={{ fontSize: 'clamp(44px, 6.5vw, 88px)', margin: 0, maxWidth: 1000 }}>
          The email scam{' '}
          <em style={{
            fontStyle: 'italic',
            background: 'var(--accent-grad)',
            WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
            display: 'inline-block', paddingRight: '0.22em',
          }}>shield</em>
          <br />for your team.
        </h1>

        <p className="hero-body" style={{
          fontSize: 18, lineHeight: 1.6, color: 'var(--fg-muted)',
          maxWidth: 580, marginTop: 28,
        }}>
          Fishpo catches phishing, AI-generated scams, and social engineering attacks
          in real time — inside Outlook and Gmail. No SOC required.
        </p>

        <div className="hero-cta" style={{ display: 'flex', gap: 12, marginTop: 36, flexWrap: 'wrap' }}>
          <button className="btn btn-primary btn-xl" onClick={onOpenDemo}>
            <Icon.Play size={14} /> Watch the demo
          </button>
          <button className="btn btn-ghost btn-xl">
            Join the pilot <Icon.Arrow size={16} />
          </button>
        </div>
      </div>
    </section>
  )
}

function Solution() {
  const steps = [
    ['Install',  'A lightweight desktop agent that takes under 2 minutes to deploy across your organization. Single-tenant, MDM-ready, no rebuild required.'],
    ['Detect',   'Local AI models analyse messages, links and attachments in real time — phishing, scams, social engineering, AI-generated impersonation.'],
    ['Protect',  'Threats are quarantined and the employee is alerted with plain-language reasoning. Your security team sees everything in one console.'],
  ]
  return (
    <section className="section" style={{ background: 'var(--bg-soft)' }}>
      <div className="inner">
        <div className="h-eyebrow" style={{ marginBottom: 16 }}>How Fishpo works</div>
        <h2 className="h-display" style={{ fontSize: 'clamp(36px, 4vw, 56px)', margin: 0, maxWidth: 700 }}>
          Three steps. Zero threats slip past.
        </h2>
        <div className="grid-3" style={{ marginTop: 64 }}>
          {steps.map(([t, d], i) => (
            <div key={t} className="card" style={{ padding: '40px 32px 32px' }}>
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: 64, lineHeight: 1, marginBottom: 28,
                fontStyle: 'italic',
                background: 'var(--accent-grad)',
                WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
                letterSpacing: '0.02em', fontWeight: 600,
              }}>
                {['I', 'II', 'III'][i]}
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, marginBottom: 14, letterSpacing: '-0.01em', fontWeight: 600 }}>{t}</div>
              <div style={{ fontSize: 15, color: 'var(--fg-muted)', lineHeight: 1.65 }}>{d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function DemoCTA({ onOpenDemo, onOpenDashboard }) {
  return (
    <section className="section-sm">
      <div className="inner">
        <div className="card demo-cta-card" style={{ padding: '48px 52px' }}>
          <div>
            <div className="h-eyebrow" style={{ marginBottom: 14 }}>Product videos</div>
            <div className="h-display" style={{ fontSize: 'clamp(28px, 3vw, 40px)', maxWidth: 560 }}>
              See Fishpo stop a phishing attack in 10 seconds — and tour the admin console.
            </div>
            <div style={{ fontSize: 15, color: 'var(--fg-muted)', marginTop: 14, maxWidth: 480, lineHeight: 1.6 }}>
              Two video walkthroughs: the end-user experience and the security team's console. No install or signup.
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flexShrink: 0 }}>
            <button className="btn btn-primary" onClick={onOpenDemo}>
              <Icon.Play size={12} /> Watch detection video
            </button>
            <button className="btn btn-primary" onClick={onOpenDashboard}
              style={{ background: 'transparent', color: 'var(--accent)', border: '1.5px solid var(--accent)' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent-soft)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
            >
              <Icon.Play size={12} /> Watch console video
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function Pillars() {
  const items = [
    { icon: Icon.Eye,    t: 'Real-time monitoring',      d: 'Continuously scans inbound email, chat and web interactions for fraud patterns — without slowing anything down.' },
    { icon: Icon.Lock,   t: 'Privacy-first architecture', d: 'Inference runs on the device. Message bodies never leave your infrastructure. GDPR-aligned by construction.' },
    { icon: Icon.Bolt,   t: 'Zero workflow disruption',  d: 'Sits silently in the system tray. The first time your team notices is the moment it saves them.' },
    { icon: Icon.Shield, t: 'Adversarial-resilient',     d: 'Models are trained against AI-generated and obfuscated attacks — the threat surface that traditional filters miss.' },
  ]
  return (
    <section className="section" style={{ background: 'var(--bg-soft)' }}>
      <div className="inner">
        <div className="h-eyebrow" style={{ marginBottom: 16 }}>Why Fishpo</div>
        <h2 className="h-display" style={{ fontSize: 'clamp(36px, 4vw, 56px)', margin: 0, maxWidth: 700 }}>
          Intelligent protection at every layer.
        </h2>
        <div className="grid-2" style={{ marginTop: 56 }}>
          {items.map(({ icon: Ic, t, d }) => (
            <div key={t} style={{
              padding: '28px 4px 28px 0',
              borderTop: '1px solid var(--border)',
              display: 'grid', gridTemplateColumns: '44px 1fr', gap: 18, alignItems: 'start',
            }}>
              <div style={{ color: 'var(--accent)', paddingTop: 4 }}><Ic size={24} /></div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, marginBottom: 10, fontWeight: 600 }}>{t}</div>
                <div style={{ fontSize: 15, color: 'var(--fg-muted)', lineHeight: 1.65 }}>{d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FinalCTA() {
  return (
    <section className="section" style={{ textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden="true" style={{
        position: 'absolute', inset: '20% -10% auto -10%', height: 400,
        background: 'radial-gradient(ellipse at center, rgba(50,113,215,0.14), transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div className="inner" style={{ position: 'relative' }}>
        <div className="h-eyebrow" style={{ marginBottom: 16 }}>Join the pilot</div>
        <h2 className="h-display" style={{ fontSize: 'clamp(36px, 5vw, 64px)', margin: '0 auto', maxWidth: 800 }}>
          Ready to stop the next scam before it reaches your team?
        </h2>
        <p style={{ fontSize: 17, color: 'var(--fg-muted)', maxWidth: 520, margin: '20px auto 0', lineHeight: 1.6 }}>
          We're onboarding our first Fishpo pilot partners. Priority pricing. Direct input into what we build.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 36, flexWrap: 'wrap' }}>
          <button className="btn btn-primary btn-xl">Join Fishpo pilot <Icon.Arrow size={16} /></button>
          <button className="btn btn-ghost btn-xl">Talk to founders</button>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="foot-pad footer-row" style={{
      borderTop: '1px solid var(--border)',
      fontSize: 13, color: 'var(--fg-muted)',
    }}>
      <FraudaWordmark size={15} />
      <div>© 2026 Frauda Hub. Riga, Latvia.</div>
      <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
        <a
          href="https://www.linkedin.com/company/frauda-hub/posts/?feedView=all"
          target="_blank" rel="noopener noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6, textDecoration: 'none', color: 'var(--fg-muted)' }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--fg)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--fg-muted)'}
        >
          <LinkedInIcon size={13} /> LinkedIn
        </a>
        {['Contact', 'Privacy', 'Security'].map(l => (
          <a key={l} href="#" style={{ textDecoration: 'none', color: 'var(--fg-muted)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--fg)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--fg-muted)'}
          >{l}</a>
        ))}
      </div>
    </footer>
  )
}

function Modal({ title, children, onClose }) {
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
        background: 'rgba(7,16,31,0.82)',
        backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '24px 20px',
        animation: 'fh-fadein .2s ease-out',
      }}
    >
      {/* title bar */}
      <div
        className="modal-title-bar"
        onClick={e => e.stopPropagation()}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: 10, color: 'rgba(255,255,255,0.8)', fontFamily: 'var(--font-sans)',
        }}
      >
        <span style={{ fontSize: 13, fontWeight: 500 }}>{title}</span>
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            width: 44, height: 44, borderRadius: 8, border: 'none',
            background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.85)',
            display: 'grid', placeItems: 'center', cursor: 'pointer',
            transition: 'background .12s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
        >
          <Icon.X size={14} />
        </button>
      </div>

      {/* video container — ~65% of screen, 16:9-ish */}
      <div
        className="modal-box"
        onClick={e => e.stopPropagation()}
        style={{
          borderRadius: 14, overflow: 'hidden',
          boxShadow: '0 32px 96px rgba(0,0,0,0.65)',
          animation: 'fh-risein 0.3s cubic-bezier(0.22,1,0.36,1) both',
        }}
      >
        {children}
      </div>

      <div style={{ marginTop: 12, fontSize: 12, color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-sans)' }}>
        Press <kbd style={{ fontFamily: 'var(--font-mono)', background: 'rgba(255,255,255,0.08)', padding: '1px 5px', borderRadius: 4 }}>Esc</kbd> to close
      </div>
    </div>,
    document.body
  )
}
