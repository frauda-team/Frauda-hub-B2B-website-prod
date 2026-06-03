import React from 'react'
import Nav from '../components/Nav'
import ContactModal from '../components/ContactModal'
import Timeline from '../components/Timeline'
import { FraudaWordmark, Icon, LinkedInIcon } from '../components/Brand'

const TIMELINE = [
  {
    date: '2026-02-09',
    title: 'Start of HPC Challenge',
    description: 'Frauda Hub began as a project for the RTU High-Performance Computing Challenge.',
    link: null,
    photos: ['2026-02-09_hpc-start-1.png'],
  },
  {
    date: '2026-03-17',
    title: 'Mākslīgā Intelekta Diena 2026',
    description: 'Participated in the AI Day conference. Dialogue with Guna Puce on fraud prevention in the Baltics.',
    link: 'https://www.linkedin.com/in/guna-puce-ex-paidere-7b02a056/',
    photos: ['2026-03-17_mi-diena-1.png'],
  },
  {
    date: '2026-04-09',
    title: 'Start of FinQuest Coopetition',
    description: 'Entered the FinQuest financial technology coopetition.',
    link: null,
    photos: ['2026-04-09_finquest-start-1.png'],
  },
  {
    date: '2026-04-13',
    title: 'HPC Challenge — Final Pitch',
    description: 'Presented Frauda Hub at the RTU HPC Challenge final.',
    link: null,
    photos: ['2026-04-13_hpc-final-1.png'],
  },
  {
    date: '2026-04-14',
    title: 'Frauda on TV3',
    description: 'Featured on Latvian national television TV3 — coverage of student-built digital solutions for real-world problems.',
    link: 'https://tv3.lv/zinas/zinatne-un-tehnologijas/no-krapnieku-kersanas-lidz-marsrutu-planosanai-studenti-izstradajusi-digitalus-risinajumiem-realam-problemam/',
    photos: ['2026-04-14_tv3-1.png'],
  },
  {
    date: '2026-04-22',
    title: 'Frauda on LTV1',
    description: 'Featured on LTV1 national broadcast — RTU students develop a tool for scam detection.',
    link: 'https://www.lsm.lv/raksts/dzive-stils/tehnologijas-un-zinatne/26.05.2026-rtu-studenti-izstrada-riku-krapnieku-atpazisanai.a647232/',
    photos: ['2026-04-22_ltv1-1.png'],
  },
  {
    date: '2026-05-11',
    title: 'FinQuest Final — Top 5',
    description: 'Reached the top 5 out of 72 teams at the FinQuest Coopetition final.',
    link: null,
    photos: ['2026-05-11_finquest-final-1.png'],
  },
  {
    date: '2026-05-13',
    title: 'FinTech Baltic Days',
    description: 'Volunteered at FinTech Baltic Days — networking with the Baltic fintech ecosystem.',
    link: null,
    photos: ['2026-05-13_fintech-baltic-1.png'],
  },
  {
    date: '2026-05-14',
    title: 'DeepTech Conference',
    description: 'Attended the DeepTech Atelier conference in Riga (May 14–15).',
    link: null,
    photos: ['2026-05-14_deeptech-1.png'],
  },
]

export default function AboutPage({ theme, onToggleTheme }) {
  const [showContact, setShowContact] = React.useState(false)
  const openContact = () => setShowContact(true)
  const closeContact = () => setShowContact(false)
  return (
    <div className="page-wrap" style={{ width: '100%', minHeight: '100vh', background: 'var(--bg)', color: 'var(--fg)' }}>
      <Nav theme={theme} onToggleTheme={onToggleTheme} onContact={openContact} />
      <HeroMission />
      <TeamSection />
      <AcademicBacking />
      <SocialProofQuote />
      <OurStory />
      <Footer onContact={openContact} />
      {showContact && <ContactModal onClose={closeContact} />}
    </div>
  )
}

function HeroMission() {
  return (
    <section className="hero-sect" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="inner" style={{ position: 'relative' }}>
        <div className="hero-badge" style={{ marginBottom: 24 }}>
          <div className="h-eyebrow">About us</div>
        </div>
        <h1 className="h-display hero-headline" style={{ fontSize: 'clamp(36px, 5.5vw, 72px)', margin: 0, maxWidth: 900 }}>
          We believe fraud prevention should be{' '}
          <em style={{
            fontStyle: 'italic',
            background: 'var(--accent-grad)',
            WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
            display: 'inline-block', paddingRight: '0.1em',
          }}>simple</em>
          {', '}private, and accessible.
        </h1>
        <p className="hero-body" style={{
          fontSize: 18, lineHeight: 1.65, color: 'var(--fg-muted)',
          maxWidth: 600, marginTop: 28,
        }}>
          Frauda Hub builds AI-powered fraud-prevention tools for European SMEs.
          Born from academic research at RTU and focused on privacy-first design,
          we believe every business — not just enterprises with a SOC — deserves real-time protection.
        </p>
      </div>
    </section>
  )
}

function TeamPhoto({ src, name }) {
  const [hasPhoto, setHasPhoto] = React.useState(true)
  const initials = name.split(' ').map(s => s[0]).join('')

  if (!hasPhoto) {
    return (
      <div style={{
        width: '100%', aspectRatio: '1', borderRadius: 'var(--r-lg)',
        background: 'var(--accent-soft)', display: 'grid', placeItems: 'center',
        fontSize: 48, fontWeight: 700, color: 'var(--accent)',
        fontFamily: 'var(--font-display)',
      }}>
        {initials}
      </div>
    )
  }

  return (
    <img
      src={src} alt={name}
      onError={() => setHasPhoto(false)}
      style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', borderRadius: 'var(--r-lg)' }}
    />
  )
}

function TeamSection() {
  const team = [
    {
      name: 'Serhii Voitov',
      role: 'Co-Founder',
      photo: '/photos/team/serhii-voitov.png',
      skills: ['Strategic partnerships', 'Leadership', 'Full-stack development', 'FinTech domain knowledge'],
    },
    {
      name: 'Vladislavs Nikiforovs',
      role: 'Co-Founder',
      photo: '/photos/team/vladislavs-nikiforovs.png',
      skills: ['Regulated systems analysis', 'Database management', 'AI Agents', 'Pitching and networking'],
    },
  ]

  return (
    <section className="section">
      <div className="inner">
        <div className="h-eyebrow" style={{ marginBottom: 16 }}>The team</div>
        <h2 className="h-display" style={{ fontSize: 'clamp(32px, 4vw, 52px)', margin: '0 0 48px' }}>
          Meet the founders.
        </h2>
        <div className="grid-2">
          {team.map(member => (
            <div key={member.name} className="card" style={{ padding: '36px 32px', display: 'flex', flexDirection: 'column', gap: 24 }}>
              <TeamPhoto src={member.photo} name={member.name} />
              <div>
                <div className="h-display" style={{ fontSize: 26, marginBottom: 4 }}>{member.name}</div>
                <div style={{ fontSize: 14, color: 'var(--fg-muted)', fontWeight: 500 }}>{member.role}</div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {member.skills.map(skill => (
                  <span key={skill} className="chip" style={{ fontSize: 12 }}>{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function AcademicBacking() {
  const logos = [
    { src: '/logo-rtu.png', alt: 'Riga Technical University', label: 'Riga Technical University' },
    { src: '/logo-ul.png',  alt: 'University of Latvia',      label: 'University of Latvia' },
    { src: '/logo-ba.png',  alt: 'BA School of Business and Finance', label: 'BA School of Business and Finance' },
  ]

  return (
    <section className="section" style={{ background: 'var(--bg-soft)' }}>
      <div className="inner">
        <div className="h-eyebrow" style={{ marginBottom: 16 }}>Backed by</div>
        <h2 className="h-display" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', margin: '0 0 16px' }}>
          Academic roots.
        </h2>
        <p style={{ fontSize: 16, color: 'var(--fg-muted)', maxWidth: 560, lineHeight: 1.65, marginBottom: 48 }}>
          Frauda Hub is developed by a research-driven team with institutional backing from Latvia's top universities.
        </p>
        <div className="institution-logos-grid">
          {logos.map(l => (
            <div key={l.alt} className="card" style={{
              padding: '20px 16px', display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 12, textAlign: 'center',
            }}>
              <img
                src={l.src} alt={l.alt}
                style={{ width: '100%', maxWidth: 120, height: 72, objectFit: 'contain' }}
              />
              <span style={{ fontSize: 12, color: 'var(--fg-muted)', lineHeight: 1.4 }}>{l.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SocialProofQuote() {
  return (
    <section className="section">
      <div className="inner">
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <blockquote style={{
            margin: 0,
            padding: '48px 48px',
            borderLeft: '4px solid var(--accent)',
            background: 'var(--bg-soft)',
            borderRadius: '0 var(--r-lg) var(--r-lg) 0',
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute', top: 24, left: 24,
              fontSize: 80, lineHeight: 1, color: 'var(--accent-soft)',
              fontFamily: 'var(--font-display)', fontWeight: 700,
              pointerEvents: 'none', userSelect: 'none',
            }} aria-hidden="true">&ldquo;</div>
            <p style={{
              fontSize: 'clamp(20px, 2.5vw, 26px)',
              fontFamily: 'var(--font-display)',
              fontWeight: 500,
              lineHeight: 1.5,
              color: 'var(--fg)',
              margin: '0 0 28px',
              fontStyle: 'italic',
              position: 'relative',
            }}>
              My grandparents get phishing texts, emails and calls almost every day.
              I wanted to create something that would protect them.
            </p>
            <footer style={{ fontSize: 14, color: 'var(--fg-muted)', fontStyle: 'normal' }}>
              <strong style={{ color: 'var(--fg)' }}>Serhii Voitov</strong>
              {' '}— Latvian TV
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  )
}

function OurStory() {
  return (
    <section className="section" style={{ background: 'var(--bg-soft)' }}>
      <div className="inner">
        <div className="h-eyebrow" style={{ marginBottom: 16 }}>Our story so far</div>
        <h2 className="h-display" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', margin: '0 0 48px' }}>
          From university project to fraud prevention startup.
        </h2>
        <Timeline events={TIMELINE} />
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
