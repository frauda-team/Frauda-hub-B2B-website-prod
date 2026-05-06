import React from 'react'
import Nav from '../components/Nav'
import { Icon, StatusDot, GridBg, LinkedInIcon, FraudaWordmark } from '../components/Brand'

export default function DatcoPage({ theme, onToggleTheme }) {
  return (
    <div style={{ width: '100%', minHeight: '100vh', background: 'var(--bg)', color: 'var(--fg)' }}>
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
            Datco
          </span>
          <div className="chip chip-accent">
            <StatusDot tone="ok" /> Live demo
          </div>
        </div>

        <h1 className="h-display" style={{ fontSize: 'clamp(52px, 6.5vw, 88px)', margin: 0, maxWidth: 1000 }}>
          Synthetic data for{' '}
          <em style={{
            fontStyle: 'italic',
            background: 'var(--accent-grad)',
            WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
            display: 'inline-block', paddingRight: '0.08em',
          }}>FinTech</em>{' '}
          teams.
        </h1>

        <p style={{
          fontSize: 19, lineHeight: 1.55, color: 'var(--fg-muted)',
          maxWidth: 620, marginTop: 32,
        }}>
          Answer 6 questions. Get a compliant synthetic dataset for fraud detection,
          credit scoring, AML, or payment models — generated on RTU RUDENS HPC.
          No real customer data ever leaves your hands.
        </p>

        <div style={{ display: 'flex', gap: 12, marginTop: 36, flexWrap: 'wrap' }}>
          <a
            href="https://frauda-team.github.io/Datco-prod/"
            target="_blank" rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ textDecoration: 'none' }}
          >
            <Icon.Play size={12} /> Try the live demo
          </a>
          <button className="btn btn-ghost">Request access <Icon.Arrow size={14} /></button>
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
    <section style={{ padding: '120px 64px', background: 'var(--bg-soft)' }}>
      <div style={{ maxWidth: 1152, margin: '0 auto' }}>
        <div className="h-eyebrow" style={{ marginBottom: 16 }}>How Datco works</div>
        <h2 className="h-display" style={{ fontSize: 'clamp(36px, 4vw, 56px)', margin: 0, maxWidth: 700 }}>
          From question to dataset in minutes.
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

function UseCases() {
  const cases = [
    { icon: Icon.Shield, t: 'Fraud detection models',    d: 'Train classifiers on realistic transaction patterns — including rare fraud events — without touching production data.' },
    { icon: Icon.Chip,   t: 'Credit scoring',            d: 'Generate applicant profiles with the statistical fingerprint of your portfolio, ready for model development and validation.' },
    { icon: Icon.Eye,    t: 'AML & compliance testing',  d: 'Stress-test your AML rules against synthetic suspicious activity reports that mirror real typologies.' },
    { icon: Icon.Bolt,   t: 'Payment flow simulation',   d: 'Reproduce complex multi-party payment sequences at scale for QA, load testing, and model evaluation.' },
  ]
  return (
    <section style={{ padding: '120px 64px' }}>
      <div style={{ maxWidth: 1152, margin: '0 auto' }}>
        <div className="h-eyebrow" style={{ marginBottom: 16 }}>Use cases</div>
        <h2 className="h-display" style={{ fontSize: 'clamp(36px, 4vw, 56px)', margin: 0, maxWidth: 700 }}>
          Built for every FinTech data challenge.
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24, marginTop: 56 }}>
          {cases.map(({ icon: Ic, t, d }) => (
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
    <section style={{ padding: '120px 64px', textAlign: 'center', position: 'relative', overflow: 'hidden', background: 'var(--bg-soft)' }}>
      <div aria-hidden="true" style={{
        position: 'absolute', inset: '20% -10% auto -10%', height: 400,
        background: 'radial-gradient(ellipse at center, rgba(50,113,215,0.15), transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div className="h-eyebrow" style={{ marginBottom: 16 }}>Try it now</div>
      <h2 className="h-display" style={{ fontSize: 'clamp(40px, 5vw, 64px)', margin: '0 auto', maxWidth: 800 }}>
        Your next model starts with{' '}
        <em style={{
          fontStyle: 'italic',
          background: 'var(--accent-grad)',
          WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
          display: 'inline-block', paddingRight: '0.06em',
        }}>better data.</em>
      </h2>
      <p style={{ fontSize: 17, color: 'var(--fg-muted)', maxWidth: 560, margin: '20px auto 0', lineHeight: 1.55 }}>
        The Datco demo is live. Generate your first synthetic FinTech dataset
        in under 10 minutes — no account required.
      </p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 32, flexWrap: 'wrap' }}>
        <a
          href="https://frauda-team.github.io/Datco-prod/"
          target="_blank" rel="noopener noreferrer"
          className="btn btn-primary"
          style={{ textDecoration: 'none' }}
        >
          <Icon.Play size={12} /> Try the live demo
        </a>
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
