import React from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import ContactModal from '../components/ContactModal'
import { FraudaMark, FraudaWordmark, Icon, StatusDot, GridBg, LinkedInIcon } from '../components/Brand'

export default function HubPage({ theme, onToggleTheme }) {
  const [showContact, setShowContact] = React.useState(false)
  const openContact = () => setShowContact(true)
  const closeContact = () => setShowContact(false)
  return (
    <div className="page-wrap" style={{ width: '100%', minHeight: '100vh', background: 'var(--bg)', color: 'var(--fg)' }}>
      <Nav theme={theme} onToggleTheme={onToggleTheme} onContact={openContact} />
      <Hero onContact={openContact} />
      <TrustBar />
      <Problem />
      <FishpoTeaser />
      <FromTheLab />
      <FinalCTA onContact={openContact} />
      <Footer onContact={openContact} />
      {showContact && <ContactModal onClose={closeContact} />}
    </div>
  )
}

function Hero({ onContact }) {
  return (
    <section className="hero-sect" style={{ position: 'relative', overflow: 'hidden' }}>
      <GridBg opacity={0.5} />
      <div aria-hidden="true" className="hero-blob" style={{
        position: 'absolute', top: -200, right: -160, width: 720, height: 720,
        background: 'radial-gradient(closest-side, rgba(50,113,215,0.18), transparent 70%)',
      }} />

      <div className="inner" style={{ position: 'relative' }}>
        <div className="hero-badge" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32, flexWrap: 'wrap' }}>
          <FraudaMark size={66} />
          <div className="chip chip-accent">
            <StatusDot tone="ok" /> Seeking free pilots
          </div>
        </div>

        <h1 className="h-display hero-headline" style={{ fontSize: 'clamp(44px, 6.5vw, 88px)', margin: 0, maxWidth: 1000 }}>
          Protect your business from fraud —{' '}
          <em style={{
            fontStyle: 'italic',
            background: 'var(--accent-grad)',
            WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
            display: 'inline-block', paddingRight: '0.2em',
          }}>before</em>
          <br />it reaches your team.
        </h1>

        <p className="hero-body" style={{
          fontSize: 18, lineHeight: 1.6, color: 'var(--fg-muted)',
          maxWidth: 580, marginTop: 28,
        }}>
          Frauda Hub builds AI-powered fraud-prevention tools for European SMEs.
          Our flagship product Fishpo stops phishing emails before anyone clicks.
        </p>

        <div className="hero-cta" style={{ display: 'flex', gap: 12, marginTop: 36, flexWrap: 'wrap' }}>
          <Link to="/fishpo" className="btn btn-primary btn-xl" style={{ textDecoration: 'none' }}>
            Explore Fishpo <Icon.Arrow size={16} />
          </Link>
          <button className="btn btn-ghost btn-xl" onClick={onContact}>
            Get in touch
          </button>
        </div>
        <div className="gdpr-trust">
          <span><Icon.Lock size={11} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />GDPR-compliant</span>
          <span>EU data only</span>
          <span>Free pilot available</span>
        </div>
      </div>
    </section>
  )
}

function TrustBar() {
  const items = [
    { icon: <Icon.Shield size={13} />, text: 'Backed by RTU & University of Latvia' },
    { icon: <Icon.Lock size={13} />,   text: 'GDPR-compliant · EU data only' },
    { icon: <StatusDot tone="ok" />,   text: 'Free pilot available' },
    { icon: <Icon.Chip size={13} />,   text: 'Built on RTU RUDENS HPC' },
  ]
  return (
    <div className="trust-bar nav-pad">
      <div className="trust-bar-inner inner">
        {items.map(({ icon, text }) => (
          <div key={text} className="trust-item">{icon}{text}</div>
        ))}
      </div>
    </div>
  )
}

function Problem() {
  const stats = [
    ['€8B+', 'Lost to online fraud in the EU annually'],
    ['91%',  'Of cyberattacks begin with a phishing email'],
    ['3.4×', 'Increase in AI-generated scams since 2023'],
    ['68%',  'Of SMEs lack dedicated fraud prevention'],
  ]
  return (
    <section className="section">
      <div className="inner">
        <div className="h-eyebrow" style={{ marginBottom: 16 }}>The problem</div>
        <h2 className="h-display" style={{ fontSize: 'clamp(36px, 4vw, 56px)', margin: 0, maxWidth: 800 }}>
          Fraud is evolving faster than your team can keep up.
        </h2>
        <p style={{ fontSize: 17, color: 'var(--fg-muted)', maxWidth: 620, marginTop: 18, lineHeight: 1.6 }}>
          Phishing, social engineering, and AI-generated scams target employees daily.
          Annual training isn't enough — your people need real-time protection at the point of contact.
        </p>
        <div className="grid-4" style={{
          gap: 1, marginTop: 56,
          background: 'var(--border)',
          borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)',
        }}>
          {stats.map(([n, l]) => (
            <div key={n} style={{ background: 'var(--bg)', padding: '36px 24px' }}>
              <div className="stat-number">{n}</div>
              <div style={{ fontSize: 14, color: 'var(--fg-muted)', marginTop: 10, maxWidth: 220 }}>{l}</div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 12, color: 'var(--fg-muted)', marginTop: 20, lineHeight: 1.5 }}>
          Sources: ENISA Threat Landscape 2024 · Verizon DBIR 2024 · Europol IOCTA 2024
        </p>
      </div>
    </section>
  )
}

function FishpoTeaser() {
  const features = [
    {
      icon: <Icon.Bolt size={20} />,
      title: 'Install',
      desc: 'Lightweight browser agent. Deploys in under 30 minutes — no IT team required.',
    },
    {
      icon: <Icon.Eye size={20} />,
      title: 'Detect',
      desc: 'Local AI model analyses every incoming email in real time. No data leaves your device.',
    },
    {
      icon: <Icon.Shield size={20} />,
      title: 'Protect',
      desc: 'Suspected scams are quarantined instantly and your team is alerted before anyone clicks.',
    },
  ]

  const ref = React.useRef(null)
  const [visible, setVisible] = React.useState(false)
  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect() }
    }, { threshold: 0.15 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="section" style={{ background: 'var(--bg-soft)' }}>
      <div className="inner" ref={ref}>
        <div className="h-eyebrow" style={{ marginBottom: 16 }}>Our flagship product</div>
        <h2 className="h-display" style={{ fontSize: 'clamp(36px, 4vw, 56px)', margin: 0 }}>
          Fishpo — email scam shield.
        </h2>
        <p style={{ fontSize: 17, color: 'var(--fg-muted)', maxWidth: 600, marginTop: 18, lineHeight: 1.6 }}>
          Real-time phishing detection that runs on-device. No SOC required, no data sent to the cloud.
          Built for SMEs that need enterprise-grade protection without enterprise complexity.
        </p>

        <div className="grid-3 fishpo-features" style={{
          marginTop: 48,
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateY(20px)',
          transition: 'opacity 0.5s ease, transform 0.5s ease',
        }}>
          {features.map((f, i) => (
            <div key={f.title} className="card" style={{
              padding: '32px 28px',
              opacity: visible ? 1 : 0,
              transform: visible ? 'none' : 'translateY(20px)',
              transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`,
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 'var(--r-md)',
                background: 'var(--accent-soft)', color: 'var(--accent)',
                display: 'grid', placeItems: 'center', marginBottom: 20,
              }}>
                {f.icon}
              </div>
              <div className="h-display" style={{ fontSize: 22, marginBottom: 10 }}>{f.title}</div>
              <div style={{ fontSize: 15, color: 'var(--fg-muted)', lineHeight: 1.65 }}>{f.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 40 }}>
          <Link to="/fishpo" className="btn btn-primary" style={{ textDecoration: 'none' }}>
            Explore Fishpo <Icon.Arrow size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}

function FromTheLab() {
  return (
    <section className="section">
      <div className="inner">
        <div className="h-eyebrow" style={{ marginBottom: 14 }}>From the lab</div>
        <h2 className="h-display" style={{ fontSize: 'clamp(28px, 3vw, 40px)', margin: 0, color: 'var(--fg-muted)' }}>
          Exploring new ideas.
        </h2>

        <div style={{ marginTop: 36, maxWidth: 520 }}>
          <div className="card" style={{ padding: '32px 28px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="product-badge">Datco</span>
              <span className="chip chip-accent" style={{ fontSize: 11 }}>
                <StatusDot tone="ok" /> Live demo
              </span>
            </div>
            <div>
              <div className="h-display" style={{ fontSize: 24, marginBottom: 10 }}>Synthetic data for FinTech</div>
              <div style={{ fontSize: 15, color: 'var(--fg-muted)', lineHeight: 1.65 }}>
                Answer 6 questions, get a compliant synthetic dataset for fraud, credit, AML or payment models — generated on RTU RUDENS HPC.
              </div>
            </div>
            <Link
              to="/datco"
              className="btn btn-ghost"
              style={{ alignSelf: 'flex-start', textDecoration: 'none' }}
            >
              Try Datco demo <Icon.Arrow size={14} />
            </Link>
          </div>
        </div>
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
          Ready to protect your team from the{' '}
          <em style={{
            fontStyle: 'italic',
            background: 'var(--accent-grad)',
            WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
            display: 'inline-block', paddingRight: '0.2em',
          }}>next</em>{' '}
          scam?
        </h2>
        <p style={{ fontSize: 17, color: 'var(--fg-muted)', maxWidth: 520, margin: '20px auto 0', lineHeight: 1.6 }}>
          We're offering a free pilot to the first businesses. Reach out — your input shapes what we build.
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
