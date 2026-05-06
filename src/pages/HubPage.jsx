import React from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import { FraudaMark, FraudaWordmark, Icon, StatusDot, GridBg, LinkedInIcon } from '../components/Brand'

export default function HubPage({ theme, onToggleTheme }) {
  return (
    <div className="page-wrap" style={{ width: '100%', minHeight: '100vh', background: 'var(--bg)', color: 'var(--fg)' }}>
      <Nav theme={theme} onToggleTheme={onToggleTheme} />
      <Hero />
      <Portfolio />
      <Problem />
      <Team />
      <FinalCTA />
      <BackedBy />
      <Footer />
    </div>
  )
}

function Hero() {
  return (
    <section className="hero-sect" style={{ position: 'relative', overflow: 'hidden' }}>
      <GridBg opacity={0.5} />
      <div aria-hidden="true" style={{
        position: 'absolute', top: -200, right: -160, width: 720, height: 720,
        background: 'radial-gradient(closest-side, rgba(50,113,215,0.18), transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="inner" style={{ position: 'relative' }}>
        <div className="hero-badge" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32, flexWrap: 'wrap' }}>
          <FraudaMark size={66} />
          <div className="chip chip-accent">
            <StatusDot tone="ok" /> Private beta · EU only
          </div>
        </div>

        <h1 className="h-display hero-headline" style={{ fontSize: 'clamp(44px, 6.5vw, 88px)', margin: 0, maxWidth: 1000 }}>
          The fraud-defence{' '}
          <em style={{
            fontStyle: 'italic',
            background: 'var(--accent-grad)',
            WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
            display: 'inline-block', paddingRight: '0.2em',
          }}>hub</em>
          <br />for European businesses.
        </h1>

        <p className="hero-body" style={{
          fontSize: 18, lineHeight: 1.6, color: 'var(--fg-muted)',
          maxWidth: 580, marginTop: 28,
        }}>
          Frauda Hub is a holding company building AI-powered fraud-prevention tools for European SMEs.
          Two products, one mission: keep your business safe.
        </p>

        <div className="hero-cta" style={{ display: 'flex', gap: 12, marginTop: 36, flexWrap: 'wrap' }}>
          <button className="btn btn-primary btn-xl">Join early access <Icon.Arrow size={16} /></button>
          <a
            href="https://www.linkedin.com/company/frauda-hub/posts/?feedView=all"
            target="_blank" rel="noopener noreferrer"
            className="btn btn-ghost btn-xl"
            style={{ textDecoration: 'none' }}
          >
            <LinkedInIcon size={16} /> Follow on LinkedIn
          </a>
        </div>
      </div>
    </section>
  )
}

function Portfolio() {
  const products = [
    {
      tag: 'Fishpo',
      status: 'Pilot open',
      title: 'Email scam shield',
      desc: 'Real-time phishing & AI-generated scam detection inside Outlook and Gmail. Built for SMEs that can\'t staff a 24/7 SOC.',
      cta: 'Explore Fishpo',
      to: '/fishpo',
    },
    {
      tag: 'Datco',
      status: 'Live demo',
      title: 'Synthetic data for FinTech',
      desc: 'Answer 6 questions, get a compliant synthetic dataset for fraud, credit, AML or payment models — generated on RTU RUDENS HPC.',
      cta: 'Explore Datco',
      to: '/datco',
    },
  ]

  return (
    <section className="section" style={{ background: 'var(--bg-soft)' }}>
      <div className="inner">
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 16 }}>
          <div>
            <div className="h-eyebrow" style={{ marginBottom: 12 }}>Frauda Hub portfolio</div>
            <h2 className="h-display" style={{ fontSize: 'clamp(36px, 4vw, 56px)', margin: 0 }}>
              Two tools. One mission.
            </h2>
          </div>
          <p style={{ fontSize: 16, color: 'var(--fg-muted)', maxWidth: 380, lineHeight: 1.6 }}>
            Each product in the Frauda Hub portfolio is an independent company — purpose-built for a specific fraud vector.
          </p>
        </div>

        <div className="grid-2 hero-cards" style={{ marginTop: 48 }}>
          {products.map(p => (
            <div key={p.tag} className="card" style={{ padding: '40px 36px', display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="product-badge">{p.tag}</span>
                <span className="chip chip-accent" style={{ fontSize: 11 }}>
                  <StatusDot tone="ok" /> {p.status}
                </span>
              </div>

              <div>
                <div className="h-display" style={{ fontSize: 'clamp(28px, 3vw, 40px)', marginBottom: 12 }}>{p.title}</div>
                <div style={{ fontSize: 15, color: 'var(--fg-muted)', lineHeight: 1.65 }}>{p.desc}</div>
              </div>

              <Link
                to={p.to}
                className="btn btn-primary"
                style={{ alignSelf: 'flex-start', textDecoration: 'none', marginTop: 'auto' }}
              >
                {p.cta} <Icon.Arrow size={14} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
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
      </div>
    </section>
  )
}

function Team() {
  return (
    <section className="section" style={{ background: 'var(--bg-soft)' }}>
      <div className="inner">
        <div className="grid-halves">
          <div>
            <div className="h-eyebrow" style={{ marginBottom: 14 }}>Built &amp; backed by</div>
            <h2 className="h-display" style={{ fontSize: 'clamp(32px, 3.5vw, 48px)', margin: 0 }}>
              Academic roots.<br />Real-world impact.
            </h2>
            <p style={{ fontSize: 16, color: 'var(--fg-muted)', maxWidth: 460, marginTop: 18, lineHeight: 1.65 }}>
              Frauda Hub is developed by a research-driven team with institutional backing
              from Latvia's top universities and the EU's cyber-resilience initiatives.
            </p>
            <div style={{ marginTop: 28, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button className="btn btn-ghost">Talk to the team <Icon.Arrow size={14} /></button>
            </div>
          </div>
          <InstitutionLogos />
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
        <div className="h-eyebrow" style={{ marginBottom: 16 }}>Early access</div>
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
          We're onboarding our first partners. Get priority pricing and direct input into what we build.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 36, flexWrap: 'wrap' }}>
          <button className="btn btn-primary btn-xl">Join early access <Icon.Arrow size={16} /></button>
          <button className="btn btn-ghost btn-xl">Talk to founders</button>
        </div>
      </div>
    </section>
  )
}

function InstitutionLogos() {
  const logos = [
    { src: '/logo-rtu.png', alt: 'Riga Technical University', label: 'Riga Technical University' },
    { src: '/logo-ul.png',  alt: 'University of Latvia',      label: 'University of Latvia' },
    { src: '/logo-ba.png',  alt: 'BA School of Business and Finance', label: 'BA School of Business' },
  ]

  return (
    <div style={{ position: 'relative', minHeight: 300 }}>
      {/* RTU — top left */}
      <div style={{ position: 'absolute', top: 0, left: '5%', width: '42%' }}>
        <LogoCard {...logos[0]} />
      </div>
      {/* UL — top right */}
      <div style={{ position: 'absolute', top: 0, right: '5%', width: '42%' }}>
        <LogoCard {...logos[1]} />
      </div>
      {/* BA — bottom centre */}
      <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '42%' }}>
        <LogoCard {...logos[2]} />
      </div>
    </div>
  )
}

function LogoCard({ src, alt, label }) {
  return (
    <div className="card" style={{
      padding: '20px 16px', display: 'flex', flexDirection: 'column',
      alignItems: 'center', gap: 12, textAlign: 'center',
    }}>
      <img
        src={src} alt={alt}
        style={{ width: '100%', maxWidth: 120, height: 72, objectFit: 'contain' }}
      />
      <span style={{ fontSize: 12, color: 'var(--fg-muted)', lineHeight: 1.4 }}>{label}</span>
    </div>
  )
}

function BackedBy() {
  return (
    <section className="section-sm" style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-soft)' }}>
      <div className="inner" style={{ textAlign: 'center' }}>
        <div className="h-eyebrow" style={{ marginBottom: 28 }}>Institutional backing</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 48, justifyContent: 'center', flexWrap: 'wrap' }}>
          {['Riga Technical University', 'University of Latvia', 'Banku Augstskola'].map(n => (
            <span key={n} style={{
              fontSize: 16, color: 'var(--fg)',
              fontFamily: 'var(--font-display)', fontWeight: 600, letterSpacing: '-0.01em',
            }}>{n}</span>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="foot-pad" style={{
      borderTop: '1px solid var(--border)',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      fontSize: 13, color: 'var(--fg-muted)', flexWrap: 'wrap', gap: 16,
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
