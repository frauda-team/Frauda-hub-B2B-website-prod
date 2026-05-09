import React from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import { FraudaMark, Icon, StatusDot, GridBg, LinkedInIcon, FraudaWordmark } from '../components/Brand'

export default function DatcoPage({ theme, onToggleTheme }) {
  return (
    <div className="page-wrap" style={{ width: '100%', minHeight: '100vh', background: 'var(--bg)', color: 'var(--fg)' }}>
      <Nav theme={theme} onToggleTheme={onToggleTheme} />
      <Hero />
      <HowItWorks />
      <UseCases />
      <FinalCTA />
      <Footer />
    </div>
  )
}

function Hero() {
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
            <StatusDot tone="ok" /> Live demo
          </div>
        </div>

        <h1 className="h-display hero-headline" style={{ fontSize: 'clamp(44px, 6.5vw, 88px)', margin: 0, maxWidth: 1000 }}>
          Synthetic data for{' '}
          <em style={{
            fontStyle: 'italic',
            background: 'var(--accent-grad)',
            WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
            display: 'inline-block', paddingRight: '0.22em',
          }}>FinTech</em>{' '}
          teams.
        </h1>

        <p className="hero-body" style={{
          fontSize: 18, lineHeight: 1.6, color: 'var(--fg-muted)',
          maxWidth: 580, marginTop: 28,
        }}>
          Answer 6 questions. Get a compliant synthetic dataset for fraud detection,
          credit scoring, AML, or payment models — generated on RTU RUDENS HPC.
          No real customer data. No compliance headache.
        </p>

        <div className="hero-cta" style={{ display: 'flex', gap: 12, marginTop: 36, flexWrap: 'wrap' }}>
          <a
            href="https://frauda-team.github.io/Datco-prod/"
            target="_blank" rel="noopener noreferrer"
            className="btn btn-primary btn-xl"
            style={{ textDecoration: 'none' }}
          >
            <Icon.Play size={14} /> Try the live demo
          </a>
          <button className="btn btn-ghost btn-xl">
            Request access <Icon.Arrow size={16} />
          </button>
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  const steps = [
    ['Define',   'Tell us your use case: fraud, credit, AML, payments, or custom. Answer 6 structured questions about data shape, volume, and compliance requirements.'],
    ['Generate', 'RTU RUDENS HPC runs our privacy-preserving synthetic data pipeline. Statistical properties match your domain without containing any real records.'],
    ['Validate', 'Receive your dataset with a full quality report — distribution metrics, correlation checks, and a compliance summary ready for auditors.'],
  ]
  return (
    <section className="section" style={{ background: 'var(--bg-soft)' }}>
      <div className="inner">
        <div className="h-eyebrow" style={{ marginBottom: 16 }}>How Datco works</div>
        <h2 className="h-display" style={{ fontSize: 'clamp(36px, 4vw, 56px)', margin: 0, maxWidth: 700 }}>
          From question to dataset in minutes.
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

function UseCases() {
  const cases = [
    { icon: Icon.Shield, t: 'Fraud detection models',   d: 'Train classifiers on realistic transaction patterns — including rare fraud events — without touching production data.' },
    { icon: Icon.Chip,   t: 'Credit scoring',           d: 'Generate applicant profiles with the statistical fingerprint of your portfolio, ready for model development and validation.' },
    { icon: Icon.Eye,    t: 'AML & compliance testing', d: 'Stress-test your AML rules against synthetic suspicious activity reports that mirror real typologies.' },
    { icon: Icon.Bolt,   t: 'Payment flow simulation',  d: 'Reproduce complex multi-party payment sequences at scale for QA, load testing, and model evaluation.' },
  ]
  return (
    <section className="section">
      <div className="inner">
        <div className="h-eyebrow" style={{ marginBottom: 16 }}>Use cases</div>
        <h2 className="h-display" style={{ fontSize: 'clamp(36px, 4vw, 56px)', margin: 0, maxWidth: 700 }}>
          Built for every FinTech data challenge.
        </h2>
        <div className="grid-2" style={{ marginTop: 56 }}>
          {cases.map(({ icon: Ic, t, d }) => (
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
    <section className="section" style={{ textAlign: 'center', position: 'relative', overflow: 'hidden', background: 'var(--bg-soft)' }}>
      <div aria-hidden="true" style={{
        position: 'absolute', inset: '20% -10% auto -10%', height: 400,
        background: 'radial-gradient(ellipse at center, rgba(50,113,215,0.14), transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div className="inner" style={{ position: 'relative' }}>
        <div className="h-eyebrow" style={{ marginBottom: 16 }}>Try it now</div>
        <h2 className="h-display" style={{ fontSize: 'clamp(36px, 5vw, 64px)', margin: '0 auto', maxWidth: 800 }}>
          Your next model starts with{' '}
          <em style={{
            fontStyle: 'italic',
            background: 'var(--accent-grad)',
            WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
            display: 'inline-block', paddingRight: '0.2em',
          }}>better data.</em>
        </h2>
        <p style={{ fontSize: 17, color: 'var(--fg-muted)', maxWidth: 520, margin: '20px auto 0', lineHeight: 1.6 }}>
          The Datco demo is live. Generate your first synthetic FinTech dataset in under 10 minutes — no account required.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 36, flexWrap: 'wrap' }}>
          <a
            href="https://frauda-team.github.io/Datco-prod/"
            target="_blank" rel="noopener noreferrer"
            className="btn btn-primary btn-xl"
            style={{ textDecoration: 'none' }}
          >
            <Icon.Play size={14} /> Try the live demo
          </a>
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
