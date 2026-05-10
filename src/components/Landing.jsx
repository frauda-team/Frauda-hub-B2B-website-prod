import React from 'react'
import { FraudaMark, FraudaWordmark, Icon, StatusDot, GridBg, LinkedInIcon } from './Brand'
import ContactModal from './ContactModal'

export default function Landing({ onOpenDemo, onOpenDashboard, theme, onToggleTheme }) {
  const [showContact, setShowContact] = React.useState(false)
  const openContact = () => setShowContact(true)
  const closeContact = () => setShowContact(false)
  return (
    <div style={{ width: '100%', minHeight: '100vh', background: 'var(--bg)', color: 'var(--fg)' }}>
      <Nav theme={theme} onToggleTheme={onToggleTheme} onOpenDemo={onOpenDemo} onContact={openContact} />
      <Hero onOpenDemo={onOpenDemo} onContact={openContact} />
      <Problem />
      <Solution />
      <DemoCTA onOpenDemo={onOpenDemo} onOpenDashboard={onOpenDashboard} />
      <Pillars />
      <Team onContact={openContact} />
      <FinalCTA onContact={openContact} />
      <BackedBy />
      <Footer onContact={openContact} />
      {showContact && <ContactModal onClose={closeContact} />}
    </div>
  )
}

function Nav({ theme, onToggleTheme, onOpenDemo, onContact }) {
  return (
    <header style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '20px 64px', borderBottom: '1px solid var(--border)',
      position: 'sticky', top: 0,
      background: 'color-mix(in srgb, var(--bg) 80%, transparent)',
      backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
      zIndex: 50,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <FraudaWordmark size={17} />
        <button
          onClick={onToggleTheme}
          aria-label="Toggle theme"
          style={{
            width: 32, height: 32, borderRadius: 999, display: 'grid', placeItems: 'center',
            border: '1px solid var(--border-strong)', background: 'transparent',
            color: 'var(--fg)', cursor: 'pointer', transition: 'background .15s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-soft)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          {theme === 'dark' ? <Icon.Sun size={14} /> : <Icon.Moon size={14} />}
        </button>
      </div>

      <nav style={{ display: 'flex', gap: 28, fontSize: 14, color: 'var(--fg-muted)' }}>
        {['Products', 'Demos', 'How it works', 'Team'].map(l => (
          <a key={l} href="#" style={{ textDecoration: 'none', cursor: 'pointer', transition: 'color .12s' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--fg)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--fg-muted)'}
          >{l}</a>
        ))}
      </nav>

      <div style={{ display: 'flex', gap: 10 }}>
        <a
          href="https://www.linkedin.com/company/frauda-hub/posts/?feedView=all"
          target="_blank" rel="noopener noreferrer"
          className="btn btn-ghost btn-sm"
          style={{ textDecoration: 'none' }}
        >
          <LinkedInIcon size={13} /> Follow
        </a>
        <button className="btn btn-primary btn-sm" onClick={onContact}>
          Get in touch <Icon.Arrow size={13} />
        </button>
      </div>
    </header>
  )
}

function Hero({ onOpenDemo, onContact }) {
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
          <FraudaMark size={44} />
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
          <button className="btn btn-primary" onClick={onContact}>Get in touch <Icon.Arrow size={14} /></button>
          <a
            href="https://www.linkedin.com/company/frauda-hub/posts/?feedView=all"
            target="_blank" rel="noopener noreferrer"
            className="btn btn-ghost"
            style={{ textDecoration: 'none' }}
          >
            <LinkedInIcon size={14} /> Follow on LinkedIn
          </a>
          <button className="btn btn-ghost" onClick={onOpenDemo}>See demo</button>
        </div>

        <div style={{ marginTop: 80 }}>
          <ProgramsGrid onOpenDemo={onOpenDemo} />
        </div>
      </div>
    </section>
  )
}

function ProgramsGrid({ onOpenDemo }) {
  const programs = [
    {
      tag: 'Fishpo',
      status: 'Pilot open',
      title: 'Email scam shield',
      desc: 'Real-time phishing & AI-generated scam detection inside Outlook and Gmail. Built for SMEs that can\'t staff a 24/7 SOC.',
      cta: 'Join Fishpo pilot',
      onClick: onOpenDemo,
    },
    {
      tag: 'Datco',
      status: 'Live demo',
      title: 'Synthetic data for FinTech',
      desc: 'Answer 6 questions, get a compliant synthetic dataset for fraud, credit, AML or payment models — generated on RTU RUDENS HPC.',
      cta: 'Try the Datco demo',
      href: 'https://frauda-team.github.io/Datco-prod/',
    },
  ]

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 18 }}>
      {programs.map(p => (
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
          {p.href ? (
            <a
              href={p.href}
              target="_blank" rel="noopener noreferrer"
              className="btn btn-primary btn-sm"
              style={{ alignSelf: 'flex-start', textDecoration: 'none' }}
            >
              {p.cta} <Icon.Arrow size={13} />
            </a>
          ) : (
            <button className="btn btn-primary btn-sm" style={{ alignSelf: 'flex-start' }} onClick={p.onClick}>
              {p.cta} <Icon.Arrow size={13} />
            </button>
          )}
        </div>
      ))}
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

function Solution() {
  const steps = [
    ['Install',  'A lightweight desktop agent that takes under 2 minutes to deploy across your organization. Single-tenant, MDM-ready, no rebuild required.'],
    ['Detect',   'Local AI models analyse messages, links and attachments in real time — phishing, scams, social engineering, AI-generated impersonation.'],
    ['Protect',  'Threats are quarantined and the employee is alerted with plain-language reasoning. Your security team sees everything in one console.'],
  ]
  return (
    <section style={{ padding: '120px 64px', background: 'var(--bg-soft)' }}>
      <div style={{ maxWidth: 1152, margin: '0 auto' }}>
        <div className="h-eyebrow" style={{ marginBottom: 16 }}>The solution</div>
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
            Fishpo is the email-scanning module of Frauda Hub. The interactive demo
            runs in your browser — no install, no signup.
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
    <section style={{ padding: '120px 64px' }}>
      <div style={{ maxWidth: 1152, margin: '0 auto' }}>
        <div className="h-eyebrow" style={{ marginBottom: 16 }}>How it works</div>
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

function Team({ onContact }) {
  return (
    <section style={{ padding: '96px 64px', background: 'var(--bg-soft)' }}>
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

function FinalCTA({ onContact }) {
  return (
    <section style={{ padding: '120px 64px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden="true" style={{
        position: 'absolute', inset: '20% -10% auto -10%', height: 400,
        background: 'radial-gradient(ellipse at center, rgba(50,113,215,0.15), transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div className="h-eyebrow" style={{ marginBottom: 16 }}>Get in touch</div>
      <h2 className="h-display" style={{ fontSize: 'clamp(40px, 5vw, 64px)', margin: '0 auto', maxWidth: 800 }}>
        Ready to protect your team from the{' '}
        <em style={{
          fontStyle: 'italic',
          background: 'var(--accent-grad)',
          WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
        }}>next</em>{' '}
        scam?
      </h2>
      <p style={{ fontSize: 17, color: 'var(--fg-muted)', maxWidth: 560, margin: '20px auto 0', lineHeight: 1.55 }}>
        We're in the research phase and talking to businesses. Reach out — your input shapes what we build.
      </p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 32, flexWrap: 'wrap' }}>
        <button className="btn btn-primary" onClick={onContact}>Get in touch <Icon.Arrow size={14} /></button>
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

function Footer({ onContact }) {
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
        <a
          href="mailto:team@frauda.io"
          style={{ textDecoration: 'none', color: 'var(--fg-muted)' }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--fg)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--fg-muted)'}
        >team@frauda.io</a>
        <button onClick={onContact} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontSize: 13, color: 'var(--fg-muted)', fontFamily: 'inherit' }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--fg)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--fg-muted)'}
        >Contact</button>
        {['Privacy', 'Security'].map(l => (
          <a key={l} href="#" style={{ textDecoration: 'none', color: 'var(--fg-muted)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--fg)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--fg-muted)'}
          >{l}</a>
        ))}
      </div>
    </footer>
  )
}
