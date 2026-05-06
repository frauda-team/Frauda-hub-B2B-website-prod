import React from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import { FraudaMark, FraudaWordmark, Icon, StatusDot, GridBg, LinkedInIcon } from '../components/Brand'

export default function HubPage({ theme, onToggleTheme }) {
  return (
    <div style={{ width: '100%', minHeight: '100vh', background: 'var(--bg)', color: 'var(--fg)' }}>
      <Nav theme={theme} onToggleTheme={onToggleTheme} />
      <Hero />
      <Problem />
      <Products />
      <Team />
      <FinalCTA />
      <BackedBy />
      <Footer />
    </div>
  )
}

function Hero() {
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
          <FraudaMark size={66} />
          <div className="chip chip-accent">
            <StatusDot tone="ok" /> Now in private beta · EU only
          </div>
        </div>

        <h1 className="h-display" style={{ fontSize: 'clamp(52px, 6.5vw, 88px)', margin: 0, maxWidth: 1000 }}>
          The fraud-defence{' '}
          <em style={{
            fontStyle: 'italic',
            background: 'var(--accent-grad)',
            WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
            display: 'inline-block', paddingRight: '0.08em',
          }}>hub</em>
          <br />for European businesses.
        </h1>

        <p style={{
          fontSize: 19, lineHeight: 1.55, color: 'var(--fg-muted)',
          maxWidth: 620, marginTop: 32,
        }}>
          Frauda Hub is a portfolio of fraud-prevention tools built for SMEs.
          Partner with us early — shape what we ship, get priority pricing,
          and pilot every module before public release.
        </p>

        <div style={{ display: 'flex', gap: 12, marginTop: 36, flexWrap: 'wrap' }}>
          <button className="btn btn-primary">Join early access <Icon.Arrow size={14} /></button>
          <a
            href="https://www.linkedin.com/company/frauda-hub/posts/?feedView=all"
            target="_blank" rel="noopener noreferrer"
            className="btn btn-ghost"
            style={{ textDecoration: 'none' }}
          >
            <LinkedInIcon size={14} /> Follow on LinkedIn
          </a>
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
    <section style={{ padding: '120px 64px' }}>
      <div style={{ maxWidth: 1152, margin: '0 auto' }}>
        <div className="h-eyebrow" style={{ marginBottom: 16 }}>The problem</div>
        <h2 className="h-display" style={{ fontSize: 'clamp(36px, 4vw, 56px)', margin: 0, maxWidth: 800 }}>
          Fraud is evolving faster than your team can keep up.
        </h2>
        <p style={{ fontSize: 17, color: 'var(--fg-muted)', maxWidth: 640, marginTop: 18, lineHeight: 1.55 }}>
          Phishing, social engineering, and AI-generated scams target employees daily.
          Annual training isn't enough — your people need real-time protection at the point of contact.
        </p>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, marginTop: 56,
          background: 'var(--border)',
          borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)',
        }}>
          {stats.map(([n, l]) => (
            <div key={n} style={{ background: 'var(--bg)', padding: '36px 24px' }}>
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 4vw, 56px)', lineHeight: 1,
                background: 'var(--accent-grad)',
                WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
              }}>{n}</div>
              <div style={{ fontSize: 14, color: 'var(--fg-muted)', marginTop: 10, maxWidth: 220 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Products() {
  const products = [
    {
      tag: 'Fishpo',
      status: 'Pilot open',
      title: 'Email scam shield',
      desc: 'Real-time phishing & AI-generated scam detection inside Outlook and Gmail. Built for SMEs that can\'t staff a 24/7 SOC.',
      cta: 'Learn about Fishpo',
      to: '/fishpo',
    },
    {
      tag: 'Datco',
      status: 'Live demo',
      title: 'Synthetic data for FinTech',
      desc: 'Answer 6 questions, get a compliant synthetic dataset for fraud, credit, AML or payment models — generated on RTU RUDENS HPC.',
      cta: 'Learn about Datco',
      to: '/datco',
    },
  ]

  return (
    <section style={{ padding: '120px 64px', background: 'var(--bg-soft)' }}>
      <div style={{ maxWidth: 1152, margin: '0 auto' }}>
        <div className="h-eyebrow" style={{ marginBottom: 16 }}>Our products</div>
        <h2 className="h-display" style={{ fontSize: 'clamp(36px, 4vw, 56px)', margin: 0, maxWidth: 700 }}>
          Two tools. One mission.
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 18, marginTop: 64 }}>
          {products.map(p => (
            <div key={p.tag} className="card" style={{ padding: 36, display: 'flex', flexDirection: 'column', gap: 16, minHeight: 280 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)' }}>
                  {p.tag}
                </span>
                <span className="chip" style={{ fontSize: 10.5 }}>
                  <StatusDot tone="ok" /> {p.status}
                </span>
              </div>
              <div className="h-display" style={{ fontSize: 36, lineHeight: 1.05, margin: 0 }}>{p.title}</div>
              <div style={{ fontSize: 14.5, color: 'var(--fg-muted)', lineHeight: 1.6, flex: 1 }}>{p.desc}</div>
              <Link
                to={p.to}
                className="btn btn-primary btn-sm"
                style={{ alignSelf: 'flex-start', textDecoration: 'none' }}
              >
                {p.cta} <Icon.Arrow size={13} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Team() {
  return (
    <section style={{ padding: '96px 64px' }}>
      <div style={{ maxWidth: 1152, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
        <div>
          <div className="h-eyebrow" style={{ marginBottom: 14 }}>Built &amp; backed by</div>
          <h2 className="h-display" style={{ fontSize: 'clamp(32px, 3.5vw, 48px)', margin: 0 }}>
            Academic roots.<br />Real-world impact.
          </h2>
          <p style={{ fontSize: 16, color: 'var(--fg-muted)', maxWidth: 460, marginTop: 18, lineHeight: 1.6 }}>
            Frauda is developed by a research-driven team with institutional backing
            from Latvia's top universities and the EU's cyber-resilience initiatives.
          </p>
        </div>
        <div style={{
          height: 320, borderRadius: 'var(--r-lg)', overflow: 'hidden',
          background: 'var(--accent-grad)', position: 'relative',
          display: 'grid', placeItems: 'center',
        }}>
          <div aria-hidden="true" style={{
            position: 'absolute', inset: 0, opacity: 0.18,
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }} />
          <FraudaMark size={140} />
        </div>
      </div>
    </section>
  )
}

function FinalCTA() {
  return (
    <section style={{ padding: '120px 64px', textAlign: 'center', position: 'relative', overflow: 'hidden', background: 'var(--bg-soft)' }}>
      <div aria-hidden="true" style={{
        position: 'absolute', inset: '20% -10% auto -10%', height: 400,
        background: 'radial-gradient(ellipse at center, rgba(50,113,215,0.15), transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div className="h-eyebrow" style={{ marginBottom: 16 }}>Early access</div>
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
        We're onboarding our first partners. Share your needs, and help us build
        the fraud detection your business deserves.
      </p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 32, flexWrap: 'wrap' }}>
        <button className="btn btn-primary">Join early access <Icon.Arrow size={14} /></button>
        <button className="btn btn-ghost">Talk to founders</button>
      </div>
    </section>
  )
}

function BackedBy() {
  return (
    <section style={{ padding: '64px 64px 80px', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1152, margin: '0 auto', textAlign: 'center' }}>
        <div className="h-eyebrow" style={{ marginBottom: 28 }}>Built &amp; backed by</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 64, justifyContent: 'center', flexWrap: 'wrap' }}>
          {['Riga Technical University', 'University of Latvia', 'Banku Augstskola'].map(n => (
            <span key={n} style={{
              fontSize: 17, color: 'var(--fg)',
              fontFamily: 'var(--font-display)', fontWeight: 500, letterSpacing: '-0.01em',
            }}>{n}</span>
          ))}
        </div>
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
