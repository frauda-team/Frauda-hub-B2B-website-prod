import React from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import ContactModal from '../components/ContactModal'
import { FraudaMark, Icon, StatusDot, GridBg, LinkedInIcon, FraudaWordmark } from '../components/Brand'
import FishpoDemo from '../components/FishpoDemo'
import DashboardDemo from '../components/DashboardDemo'

export default function FishpoPage({ theme, onToggleTheme }) {
  const [modal, setModal] = React.useState(null)
  const [showContact, setShowContact] = React.useState(false)
  const openContact = () => setShowContact(true)
  const closeContact = () => setShowContact(false)

  return (
    <div className="page-wrap" style={{ width: '100%', minHeight: '100vh', background: 'var(--bg)', color: 'var(--fg)' }}>
      <Nav theme={theme} onToggleTheme={onToggleTheme} onContact={openContact} />
      <Hero onOpenDemo={() => setModal('demo')} onOpenDashboard={() => setModal('dashboard')} onContact={openContact} />
      <Solution />
      <DemoCTA onOpenDemo={() => setModal('demo')} onOpenDashboard={() => setModal('dashboard')} />
      <Pillars />
      <ComparisonTable />
      <FAQSection />
      <FinalCTA onContact={openContact} />
      <Footer onContact={openContact} />
      {modal && (
        <Modal
          title={modal === 'demo' ? 'Fishpo — detection video' : 'Fishpo — admin console video'}
          onClose={() => setModal(null)}
        >
          {modal === 'demo'      && <FishpoDemo />}
          {modal === 'dashboard' && <DashboardDemo />}
        </Modal>
      )}
      {showContact && <ContactModal onClose={closeContact} />}
    </div>
  )
}

function Hero({ onOpenDemo, onContact }) {
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
            <StatusDot tone="ok" /> Seeking first pilots
          </div>
        </div>

        <h1 className="h-display hero-headline" style={{ fontSize: 'clamp(44px, 6.5vw, 88px)', margin: 0, maxWidth: 1000 }}>
          Block phishing emails{' '}
          <em style={{
            fontStyle: 'italic',
            background: 'var(--accent-grad)',
            WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
            display: 'inline-block', paddingRight: '0.22em',
          }}>before</em>
          <br />anyone clicks.
        </h1>

        <p className="hero-body" style={{
          fontSize: 18, lineHeight: 1.6, color: 'var(--fg-muted)',
          maxWidth: 580, marginTop: 28,
        }}>
          AI detection inside Outlook and Gmail. Deploys in under 30 minutes.
          No SOC, no IT headaches, no rule-writing.
        </p>

        <div className="hero-cta" style={{ display: 'flex', gap: 12, marginTop: 36, flexWrap: 'wrap' }}>
          <button className="btn btn-primary btn-xl" onClick={onOpenDemo}>
            <Icon.Play size={14} /> Watch the demo
          </button>
          <button className="btn btn-ghost btn-xl" onClick={onContact}>
            Get in touch <Icon.Arrow size={16} />
          </button>
        </div>
        <div className="gdpr-trust">
          <span><Icon.Lock size={11} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />GDPR-compliant</span>
          <span>EU data only</span>
          <span>Inference runs on-device</span>
        </div>
      </div>
    </section>
  )
}

function useReveal() {
  const ref = React.useRef(null)
  const [visible, setVisible] = React.useState(false)
  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return [ref, visible]
}

function Solution() {
  const [ref, visible] = useReveal()
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
        <div ref={ref} className="grid-3" style={{ marginTop: 64 }}>
          {steps.map(([t, d], i) => (
            <div key={t} className="card" style={{
              padding: '40px 32px 32px',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(28px)',
              transition: `opacity 0.55s ${i * 0.12}s, transform 0.55s cubic-bezier(0.22,1,0.36,1) ${i * 0.12}s`,
            }}>
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

function ComparisonTable() {
  const rows = [
    ['MX record change required',
     'Yes; reroutes all mail through US cloud',
     'Yes; reroutes all mail through UK/US cloud',
     'No; agent scans locally on employee PC'],
    ['Data processing location',
     'US cloud servers (DPA required for GDPR)',
     'UK/US/AU cloud (DPA required for GDPR)',
     'On-premises; email data never leaves the organization'],
    ['Baltic language scam detection (LV / RU / UK)',
     'English-centric (weaker in non-EN languages)',
     'English-centric',
     'Fine-tuned LLM for LV / RU / UK / EN scam patterns'],
    ['Deployment complexity',
     'Hours-days; MX config + policy tuning; 11% customers have MX misconfigs',
     'Hours; MX config + admin console setup',
     'Minutes; install agent on employee PCs'],
    ['IT security team required',
     'Yes; steep learning curve; dedicated security staff needed for policy management',
     'Yes; admin console training required; ongoing fine-tuning',
     'No; install and forget; runs silently in background'],
  ]
  return (
    <section className="section" style={{ background: 'var(--bg-soft)' }}>
      <div className="inner">
        <div className="h-eyebrow" style={{ marginBottom: 16 }}>How Fishpo compares</div>
        <h2 className="h-display" style={{ fontSize: 'clamp(32px, 3.5vw, 48px)', margin: 0, maxWidth: 600 }}>
          Not all email security is the same.
        </h2>
        <div className="table-scroll-hint">
          <svg viewBox="0 0 24 24" width={12} height={12} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6"/>
          </svg>
          Scroll to compare
        </div>
        <div className="table-wrap">
          <table className="cmp-table">
            <thead>
              <tr>
                <th style={{ textAlign: 'left' }}>Feature</th>
                <th>Proofpoint</th>
                <th>Mimecast</th>
                <th className="col-fishpo">Fishpo</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([feat, a, b, c], i) => (
                <tr key={feat} style={{ background: i % 2 === 0 ? 'var(--bg-elev)' : 'var(--bg-soft)' }}>
                  <td style={{ textAlign: 'left', verticalAlign: 'top' }}>{feat}</td>
                  <td style={{ textAlign: 'left', verticalAlign: 'top' }}>{a}</td>
                  <td style={{ textAlign: 'left', verticalAlign: 'top' }}>{b}</td>
                  <td className="col-fishpo" style={{ textAlign: 'left', verticalAlign: 'top' }}>{c}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

const FAQ_ITEMS = [
  { q: 'Does Fishpo require changes to our email server?',
    a: 'No. Fishpo connects via a lightweight add-in — no MX record changes, no email routing modifications, no infrastructure changes.' },
  { q: 'Where is our data processed and stored?',
    a: 'Inference runs locally on the device. Email content never leaves your infrastructure. The only data sent to Fishpo servers is anonymised threat telemetry. All EU customer data is stored in EU data centres.' },
  { q: 'Does it work with both Outlook and Gmail?',
    a: 'Yes. A single Fishpo licence covers both. Employees can use either client and threats are caught in both.' },
  { q: 'How long does deployment take?',
    a: 'Under 30 minutes for a full team. Fishpo ships as an Outlook/Gmail add-in plus an optional lightweight desktop agent. MDM-ready for bulk rollout.' },
  { q: 'What happens when a phishing email is detected?',
    a: 'The email is quarantined immediately. The employee sees a plain-language alert explaining why. Your security dashboard updates in real time.' },
  { q: 'What is the false-positive rate?',
    a: 'Under 0.5%. When Fishpo flags a legitimate email, the employee releases it in one click — and that feedback trains the model.' },
  { q: 'Can we pilot before committing?',
    a: 'Yes — the pilot is open now. You get full access, direct input into what we build, and priority pricing.' },
]

function FAQSection() {
  const [open, setOpen] = React.useState(null)
  return (
    <section className="section">
      <div className="inner">
        <div className="h-eyebrow" style={{ marginBottom: 16 }}>FAQ</div>
        <h2 className="h-display" style={{ fontSize: 'clamp(32px, 3.5vw, 48px)', margin: '0 0 40px' }}>
          Common questions.
        </h2>
        {FAQ_ITEMS.map((item, i) => (
          <div key={i} className="faq-item">
            <button className="faq-trigger" onClick={() => setOpen(open === i ? null : i)}>
              {item.q}
              <span className={`faq-icon${open === i ? ' open' : ''}`}>+</span>
            </button>
            {open === i && <div className="faq-answer">{item.a}</div>}
          </div>
        ))}
      </div>
    </section>
  )
}

function FinalCTA({ onContact }) {
  return (
    <section className="section" style={{ textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden="true" style={{
        position: 'absolute', inset: '20% -10% auto -10%', height: 400,
        background: 'radial-gradient(ellipse at center, rgba(50,113,215,0.14), transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div className="inner" style={{ position: 'relative' }}>
        <div className="h-eyebrow" style={{ marginBottom: 16 }}>Get in touch</div>
        <h2 className="h-display" style={{ fontSize: 'clamp(36px, 5vw, 64px)', margin: '0 auto', maxWidth: 800 }}>
          Ready to stop the next scam before it reaches your team?
        </h2>
        <p style={{ fontSize: 17, color: 'var(--fg-muted)', maxWidth: 520, margin: '20px auto 0', lineHeight: 1.6 }}>
          We're in the research phase and talking to businesses. Reach out — your input shapes what we build.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 36, flexWrap: 'wrap' }}>
          <button className="btn btn-primary btn-xl" onClick={onContact}>Get in touch <Icon.Arrow size={16} /></button>
        </div>
      </div>
    </section>
  )
}

function Footer({ onContact }) {
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
        <button onClick={() => window.open('mailto:team@frauda.io')} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontSize: 13, color: 'var(--fg-muted)', fontFamily: 'inherit' }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--fg)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--fg-muted)'}
        >team@frauda.io</button>
        <button onClick={onContact} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontSize: 13, color: 'var(--fg-muted)', fontFamily: 'inherit' }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--fg)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--fg-muted)'}
        >Contact</button>
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
