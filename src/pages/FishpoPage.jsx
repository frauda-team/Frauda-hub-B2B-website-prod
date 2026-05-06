import React from 'react'
import Nav from '../components/Nav'
import { FraudaMark, Icon, StatusDot, GridBg, LinkedInIcon, FraudaWordmark } from '../components/Brand'
import FishpoDemo from '../components/FishpoDemo'
import Dashboard from '../components/Dashboard'

export default function FishpoPage({ theme, onToggleTheme }) {
  const [modal, setModal] = React.useState(null)

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: 'var(--bg)', color: 'var(--fg)' }}>
      <Nav theme={theme} onToggleTheme={onToggleTheme} />
      <Hero onOpenDemo={() => setModal('demo')} onOpenDashboard={() => setModal('dashboard')} />
      <Solution />
      <DemoCTA onOpenDemo={() => setModal('demo')} onOpenDashboard={() => setModal('dashboard')} />
      <Pillars />
      <FinalCTA />
      <Footer />
      {modal && (
        <Modal
          title={modal === 'demo' ? 'Fishpo — email scam detection demo' : 'Fishpo admin console'}
          onClose={() => setModal(null)}
        >
          {modal === 'demo'      && <FishpoDemo />}
          {modal === 'dashboard' && <Dashboard />}
        </Modal>
      )}
    </div>
  )
}

function Hero({ onOpenDemo }) {
  return (
    <section style={{ position: 'relative', padding: '88px 64px 96px', overflow: 'hidden' }}>
      <GridBg opacity={0.6} />
      <div aria-hidden="true" style={{
        position: 'absolute', top: -200, right: -160, width: 720, height: 720,
        background: 'radial-gradient(closest-side, rgba(50,113,215,0.22), transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{ position: 'relative', maxWidth: 1152, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)' }}>
            Fishpo
          </span>
          <div className="chip chip-accent">
            <StatusDot tone="ok" /> Pilot open
          </div>
        </div>

        <h1 className="h-display" style={{ fontSize: 'clamp(52px, 6.5vw, 88px)', margin: 0, maxWidth: 1000 }}>
          The email scam{' '}
          <em style={{
            fontStyle: 'italic',
            background: 'var(--accent-grad)',
            WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
            display: 'inline-block', paddingRight: '0.08em',
          }}>shield</em>
          <br />for your team.
        </h1>

        <p style={{
          fontSize: 19, lineHeight: 1.55, color: 'var(--fg-muted)',
          maxWidth: 620, marginTop: 32,
        }}>
          Fishpo catches phishing, AI-generated scams, and social engineering attacks
          in real time — inside Outlook and Gmail. Built for SMEs that can't staff a 24/7 SOC.
        </p>

        <div style={{ display: 'flex', gap: 12, marginTop: 36, flexWrap: 'wrap' }}>
          <button className="btn btn-primary" onClick={onOpenDemo}>
            <Icon.Play size={12} /> See it in action
          </button>
          <button className="btn btn-ghost">Join Fishpo pilot <Icon.Arrow size={14} /></button>
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
    <section style={{ padding: '120px 64px', background: 'var(--bg-soft)' }}>
      <div style={{ maxWidth: 1152, margin: '0 auto' }}>
        <div className="h-eyebrow" style={{ marginBottom: 16 }}>How Fishpo works</div>
        <h2 className="h-display" style={{ fontSize: 'clamp(36px, 4vw, 56px)', margin: 0, maxWidth: 700 }}>
          Three steps. Zero threats slip past.
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginTop: 64 }}>
          {steps.map(([t, d], i) => (
            <div key={t} className="card" style={{ padding: '40px 32px 32px' }}>
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: 64, lineHeight: 1, marginBottom: 28,
                fontStyle: 'italic',
                background: 'var(--accent-grad)',
                WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
                letterSpacing: '0.02em', fontWeight: 500,
              }}>
                {['I', 'II', 'III'][i]}
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 30, marginBottom: 14, letterSpacing: '-0.01em', fontWeight: 500 }}>{t}</div>
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
    <section style={{ padding: '96px 64px' }}>
      <div className="card" style={{
        maxWidth: 1152, margin: '0 auto', padding: '48px 56px',
        display: 'grid', gridTemplateColumns: '1fr auto', gap: 32, alignItems: 'center',
      }}>
        <div>
          <div className="h-eyebrow" style={{ marginBottom: 14 }}>See Fishpo in action</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, lineHeight: 1.1, maxWidth: 620, fontWeight: 500 }}>
            Watch a phishing email get caught inside Outlook — in 8 seconds, no setup.
          </div>
          <div style={{ fontSize: 14, color: 'var(--fg-muted)', marginTop: 14, maxWidth: 520 }}>
            The interactive demo runs in your browser — no install, no signup.
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button className="btn btn-primary" onClick={onOpenDemo}>
            <Icon.Play size={12} /> Open interactive demo
          </button>
          <button className="btn btn-ghost btn-sm" onClick={onOpenDashboard}>
            View product dashboard <Icon.Arrow size={14} />
          </button>
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
    <section style={{ padding: '120px 64px', background: 'var(--bg-soft)' }}>
      <div style={{ maxWidth: 1152, margin: '0 auto' }}>
        <div className="h-eyebrow" style={{ marginBottom: 16 }}>Why Fishpo</div>
        <h2 className="h-display" style={{ fontSize: 'clamp(36px, 4vw, 56px)', margin: 0, maxWidth: 700 }}>
          Intelligent protection at every layer.
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24, marginTop: 56 }}>
          {items.map(({ icon: Ic, t, d }) => (
            <div key={t} style={{
              padding: '28px 4px 28px 0',
              borderTop: '1px solid var(--border)',
              display: 'grid', gridTemplateColumns: '40px 1fr', gap: 18, alignItems: 'start',
            }}>
              <div style={{ color: 'var(--accent)', paddingTop: 4 }}><Ic size={22} /></div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, marginBottom: 8, fontWeight: 500 }}>{t}</div>
                <div style={{ fontSize: 14.5, color: 'var(--fg-muted)', lineHeight: 1.6, maxWidth: 480 }}>{d}</div>
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
    <section style={{ padding: '120px 64px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden="true" style={{
        position: 'absolute', inset: '20% -10% auto -10%', height: 400,
        background: 'radial-gradient(ellipse at center, rgba(50,113,215,0.15), transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div className="h-eyebrow" style={{ marginBottom: 16 }}>Join the pilot</div>
      <h2 className="h-display" style={{ fontSize: 'clamp(40px, 5vw, 64px)', margin: '0 auto', maxWidth: 800 }}>
        Ready to protect your team from the{' '}
        <em style={{
          fontStyle: 'italic',
          background: 'var(--accent-grad)',
          WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
          display: 'inline-block', paddingRight: '0.06em',
        }}>next</em>{' '}
        scam?
      </h2>
      <p style={{ fontSize: 17, color: 'var(--fg-muted)', maxWidth: 560, margin: '20px auto 0', lineHeight: 1.55 }}>
        We're onboarding our first Fishpo pilot partners. Get early access, priority pricing,
        and direct input into what we build.
      </p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 32, flexWrap: 'wrap' }}>
        <button className="btn btn-primary">Join Fishpo pilot <Icon.Arrow size={14} /></button>
        <button className="btn btn-ghost">Talk to founders</button>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)', padding: '40px 64px',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      fontSize: 13, color: 'var(--fg-muted)', flexWrap: 'wrap', gap: 16,
    }}>
      <FraudaWordmark size={15} />
      <div>© 2026 Frauda. Riga, Latvia. All rights reserved.</div>
      <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
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

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(7,16,31,0.72)',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: 24,
        animation: 'fh-fadein .2s ease-out',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: 1100, display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', marginBottom: 12,
          color: 'rgba(255,255,255,0.85)', fontFamily: 'var(--font-sans)',
        }}
      >
        <span style={{ fontSize: 13, fontWeight: 500, letterSpacing: '0.01em' }}>{title}</span>
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            width: 32, height: 32, borderRadius: 8, border: 'none',
            background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.8)',
            display: 'grid', placeItems: 'center', cursor: 'pointer',
            transition: 'background .12s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.16)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
        >
          <Icon.X size={14} />
        </button>
      </div>
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: 1100,
          height: 'min(680px, calc(100vh - 120px))',
          borderRadius: 12, overflow: 'hidden',
          boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
        }}
      >
        {children}
      </div>
      <div style={{ marginTop: 12, fontSize: 12, color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-sans)' }}>
        Press <kbd style={{ fontFamily: 'var(--font-mono)', background: 'rgba(255,255,255,0.08)', padding: '1px 5px', borderRadius: 4 }}>Esc</kbd> to close
      </div>
    </div>
  )
}
