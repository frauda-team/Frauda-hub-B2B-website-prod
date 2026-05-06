import React from 'react'
import { FraudaMark, Icon, StatusDot } from './Brand'

const DURATION = 13

const SCENES = [
  { t: 0,    label: 'Overview dashboard' },
  { t: 3.5,  label: 'Live feed — new threat' },
  { t: 7.0,  label: 'Threat detail opened' },
  { t: 10.5, label: 'Risk analysis complete' },
]

function currentLabel(t) {
  return SCENES.filter(s => t >= s.t).slice(-1)[0]?.label ?? ''
}

export default function DashboardDemo() {
  const [t, setT] = React.useState(0)
  const [playing, setPlaying] = React.useState(true)
  const raf = React.useRef(null)
  const last = React.useRef(null)

  React.useEffect(() => {
    function tick(now) {
      if (last.current === null) last.current = now
      const dt = (now - last.current) / 1000
      last.current = now
      setT(prev => {
        const next = prev + dt
        return next >= DURATION ? 0 : next
      })
      raf.current = requestAnimationFrame(tick)
    }
    if (playing) {
      last.current = null
      raf.current = requestAnimationFrame(tick)
    }
    return () => { if (raf.current) cancelAnimationFrame(raf.current) }
  }, [playing])

  const pct = (t / DURATION) * 100
  const scene = t < 3.5 ? 0 : t < 7 ? 1 : t < 10.5 ? 2 : 3

  function handleScrub(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    setT(ratio * DURATION)
    setPlaying(false)
  }

  return (
    <div style={{
      width: '100%', height: '100%', background: 'var(--bg)',
      display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-sans)',
    }}>
      {/* app shell */}
      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', flex: 1, minHeight: 0 }}>
        <Sidebar />
        <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden' }}>
          <Topbar scene={scene} />
          <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
            <SceneOverview visible={scene === 0} t={t} />
            <SceneFeed     visible={scene === 1} t={t} />
            <SceneDetail   visible={scene === 2} t={t} />
            <SceneRisk     visible={scene === 3} t={t} />
          </div>
        </div>
      </div>

      {/* player */}
      <div style={{
        padding: '12px 16px', borderTop: '1px solid var(--border)',
        background: 'var(--bg-elev)', display: 'flex', flexDirection: 'column', gap: 7, flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={() => setPlaying(p => !p)}
            style={{
              width: 32, height: 32, borderRadius: '50%',
              background: 'var(--accent)', color: 'var(--accent-fg)',
              border: 'none', cursor: 'pointer', display: 'grid', placeItems: 'center',
              flexShrink: 0, transition: 'filter .12s',
            }}
            onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.15)'}
            onMouseLeave={e => e.currentTarget.style.filter = ''}
          >
            {playing ? <PauseIcon /> : <PlayIcon />}
          </button>

          <button
            onClick={() => { setT(0); setPlaying(true) }}
            style={{
              width: 28, height: 28, borderRadius: '50%',
              background: 'transparent', color: 'var(--fg-muted)',
              border: '1px solid var(--border-strong)', cursor: 'pointer',
              display: 'grid', placeItems: 'center', flexShrink: 0,
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-soft)'; e.currentTarget.style.color = 'var(--fg)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--fg-muted)' }}
          >
            <RestartIcon />
          </button>

          <div onClick={handleScrub} style={{
            flex: 1, height: 6, background: 'var(--bg-soft)', borderRadius: 3,
            cursor: 'pointer', position: 'relative',
          }}>
            <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${pct}%`, background: 'var(--accent)', borderRadius: 3 }} />
            <div style={{
              position: 'absolute', top: '50%', left: `${pct}%`,
              width: 12, height: 12, borderRadius: '50%',
              background: 'var(--accent)', transform: 'translate(-50%, -50%)',
              boxShadow: '0 0 0 3px var(--bg-elev)',
            }} />
          </div>

          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-muted)', minWidth: 36, textAlign: 'right', flexShrink: 0 }}>
            {t.toFixed(1)}s
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, paddingLeft: 2 }}>
          {playing && <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--danger)', animation: 'fh-pulse 1.2s ease-in-out infinite', flexShrink: 0 }} />}
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-muted)', letterSpacing: '0.04em' }}>
            {playing ? 'LIVE · ' : ''}{currentLabel(t)}
          </span>
        </div>
      </div>
    </div>
  )
}

function PauseIcon() {
  return <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor"><rect x="0" y="0" width="3.5" height="12" rx="1"/><rect x="6.5" y="0" width="3.5" height="12" rx="1"/></svg>
}
function PlayIcon() {
  return <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><path d="M2 1l9 5-9 5V1z"/></svg>
}
function RestartIcon() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
}

function Sidebar() {
  const items = [
    ['Overview', Icon.Eye, true], ['Live feed', Icon.Bolt, false],
    ['Employees', Icon.Chip, false], ['Policies', Icon.Shield, false],
    ['Investigations', Icon.Search, false],
  ]
  return (
    <aside style={{ borderRight: '1px solid var(--border)', background: 'var(--bg-elev)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '16px 14px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <FraudaMark size={20} />
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 600, letterSpacing: '-0.02em' }}>
            Fishpo <span style={{ opacity: 0.45, fontWeight: 400 }}>console</span>
          </div>
        </div>
        <div style={{ marginTop: 12, padding: '8px 10px', borderRadius: 8, background: 'var(--bg-soft)', fontSize: 12 }}>
          <div style={{ fontWeight: 600 }}>Acme Industries</div>
          <div style={{ color: 'var(--fg-muted)', fontSize: 11, marginTop: 2 }}>247 seats · Riga, LV</div>
        </div>
      </div>
      <nav style={{ padding: 8, flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {items.map(([name, Ic, sel]) => (
          <div key={name} style={{
            padding: '8px 10px', borderRadius: 7, fontSize: 13,
            display: 'flex', alignItems: 'center', gap: 9, cursor: 'default',
            background: sel ? 'var(--accent-soft)' : 'transparent',
            color: sel ? 'var(--accent)' : 'var(--fg-muted)',
            fontWeight: sel ? 600 : 400,
          }}>
            <Ic size={14} /> {name}
          </div>
        ))}
      </nav>
      <div style={{ padding: 12, borderTop: '1px solid var(--border)', fontSize: 11.5, color: 'var(--fg-muted)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 5 }}>
          <StatusDot tone="ok" /> All 247 agents healthy
        </div>
        <div>Models · v2026.04</div>
      </div>
    </aside>
  )
}

function Topbar({ scene }) {
  const titles = ['Overview · last 7 days', 'Live feed', 'Threat detail', 'Risk analysis']
  return (
    <header style={{
      borderBottom: '1px solid var(--border)', padding: '12px 22px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0,
    }}>
      <div>
        <div className="h-eyebrow">{titles[scene]}</div>
        <div style={{ fontSize: 18, fontWeight: 600, marginTop: 4, letterSpacing: '-0.01em' }}>
          {scene === 0 ? 'Welcome back, Linda' : scene === 1 ? 'Real-time events' : scene === 2 ? 'Phishing · m.berzins' : 'Risk score breakdown'}
        </div>
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <div style={{
          height: 32, padding: '0 12px', borderRadius: 8, border: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', gap: 7, fontSize: 12.5, color: 'var(--fg-muted)',
          minWidth: 180,
        }}>
          <Icon.Search size={13} /> Search threats…
        </div>
        <div className="btn btn-primary btn-sm">Export report</div>
      </div>
    </header>
  )
}

function fade(visible) {
  return {
    position: 'absolute', inset: 0,
    opacity: visible ? 1 : 0,
    transition: 'opacity 0.6s ease',
    pointerEvents: visible ? 'auto' : 'none',
    overflow: 'auto', padding: '18px 22px',
    display: 'flex', flexDirection: 'column', gap: 16,
  }
}

function SceneOverview({ visible, t }) {
  const kpis = [
    { l: 'Threats neutralised', v: '1,247', d: '+12%', tone: 'ok' },
    { l: 'Phishing blocked',    v: '892',   d: '+8%',  tone: 'ok' },
    { l: 'AI-gen scams',        v: '143',   d: '+34%', tone: 'warn' },
    { l: 'Verdict time',        v: '0.6s',  d: '−0.1s',tone: 'ok' },
    { l: 'Agents online',       v: '247/247', d: '100%', tone: 'ok' },
  ]
  return (
    <div style={fade(visible)}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 12 }}>
        {kpis.map(it => (
          <div key={it.l} className="card" style={{ padding: 16 }}>
            <div style={{ fontSize: 11, color: 'var(--fg-muted)', lineHeight: 1.3 }}>{it.l}</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, marginTop: 8, fontWeight: 700 }}>{it.v}</div>
            <div className={`chip chip-${it.tone === 'ok' ? 'accent' : 'warn'}`} style={{ marginTop: 10, fontSize: 11 }}>{it.d}</div>
          </div>
        ))}
      </div>
      <BarChart />
    </div>
  )
}

function BarChart() {
  const bars = React.useMemo(() => Array.from({ length: 42 }, (_, i) => ({
    safe:   18 + Math.round(Math.sin(i / 4) * 7 + (i * 7 + 3) % 10),
    warn:   Math.round((i * 3 + 1) % 4),
    danger: Math.round(Math.abs(Math.sin(i / 6) * 3) + (i * 2) % 3),
  })), [])
  const max = Math.max(...bars.map(b => b.safe + b.warn + b.danger))
  return (
    <div className="card" style={{ padding: 18 }}>
      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 14 }}>Events / hour — last 7 days</div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 100 }}>
        {bars.map((b, i) => {
          const h = ((b.safe + b.warn + b.danger) / max) * 100
          return (
            <div key={i} style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
              <div style={{ height: `${h}%`, display: 'flex', flexDirection: 'column', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ flex: b.danger, background: 'var(--danger)' }} />
                <div style={{ flex: b.warn,   background: 'var(--warn)' }} />
                <div style={{ flex: b.safe,   background: 'var(--accent)', opacity: 0.8 }} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function SceneFeed({ visible, t }) {
  const rows = [
    { sev: 'danger', who: 'm.berzins',  kind: 'Phishing',           src: 'micros0ft-secure.com',  age: '2m',  score: 98, isNew: true },
    { sev: 'danger', who: 'finance',    kind: 'AI voice scam',      src: '+371 ··· unknown',       age: '11m', score: 91 },
    { sev: 'warn',   who: 'k.ozols',    kind: 'Suspicious link',    src: 'bit.ly/3xZ',             age: '24m', score: 64 },
    { sev: 'danger', who: 'hr',         kind: 'Credential harvest', src: 'docusign-portal.ru',     age: '38m', score: 88 },
    { sev: 'warn',   who: 'ceo-asst',   kind: 'CEO impersonation',  src: 'l.kalniņš@acmе.lv',     age: '1h',  score: 76 },
  ]
  return (
    <div style={fade(visible)}>
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '12px 18px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Live threat feed</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12, color: 'var(--fg-muted)' }}>
            <StatusDot tone="ok" /> Streaming
          </div>
        </div>
        {rows.map((r, i) => (
          <div key={i} style={{
            padding: '12px 18px',
            borderTop: i === 0 ? 'none' : '1px solid var(--border)',
            display: 'grid', gridTemplateColumns: '10px 1fr 60px 56px', gap: 14, alignItems: 'center',
            background: r.isNew && visible ? 'var(--accent-soft)' : 'transparent',
            transition: 'background 0.5s',
            animation: r.isNew ? 'fh-flag 0.4s ease-out' : 'none',
          }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: `var(--${r.sev === 'ok' ? 'ok' : r.sev})` }} />
            <div>
              <div style={{ fontSize: 13.5, fontWeight: 600 }}>{r.kind}</div>
              <div style={{ fontSize: 11.5, color: 'var(--fg-muted)', fontFamily: 'var(--font-mono)', marginTop: 2 }}>
                {r.who}@acme.lv ← {r.src}
              </div>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--fg-muted)', textAlign: 'right' }}>{r.age} ago</span>
            <span className={`chip chip-${r.sev === 'ok' ? 'accent' : r.sev}`} style={{ fontSize: 11.5, justifyContent: 'center' }}>{r.score}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function SceneDetail({ visible }) {
  return (
    <div style={fade(visible)}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontSize: 11, color: 'var(--fg-muted)', marginBottom: 6 }}>Threat classification</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--danger)' }}>Phishing · 98 / 100</div>
          <div style={{ fontSize: 13, color: 'var(--fg-muted)', marginTop: 8, lineHeight: 1.6 }}>
            Brand impersonation with credential harvest. Sender domain registered 2 days ago.
          </div>
          <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[['Sender domain', 'micros0ft-secure.com'], ['Registration', '2 days ago'], ['Link target', 'micr0soft-login.ru'], ['Urgency cues', '4 detected']].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                <span style={{ color: 'var(--fg-muted)' }}>{k}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontSize: 11, color: 'var(--fg-muted)', marginBottom: 12 }}>Affected employee</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--bg-soft)', display: 'grid', placeItems: 'center', fontSize: 14, fontWeight: 600, color: 'var(--fg-muted)' }}>MB</div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600 }}>Maris Bērziņš</div>
              <div style={{ fontSize: 12, color: 'var(--fg-muted)' }}>CTO · m.berzins@acme.lv</div>
            </div>
          </div>
          <div style={{ marginTop: 14, padding: '10px 12px', borderRadius: 8, background: 'var(--accent-soft)', fontSize: 12.5, color: 'var(--accent)' }}>
            <Icon.Check size={13} style={{ display: 'inline', marginRight: 6 }} />
            Email quarantined · employee warned · IT notified
          </div>
          <div style={{ marginTop: 12, fontSize: 12.5, color: 'var(--fg-muted)', lineHeight: 1.6 }}>
            0 clicks · 0 keystrokes · 0 credentials exposed
          </div>
        </div>
      </div>
    </div>
  )
}

function SceneRisk({ visible }) {
  const people = [
    ['Maris Bērziņš', 'CTO',     'high', 4],
    ['Anita Kalniņa', 'CFO',     'high', 3],
    ['Kārlis Ozols',  'Eng',     'med',  2],
    ['Linda Liepa',   'IT lead', 'low',  1],
    ['Jānis Krūmiņš', 'Sales',   'med',  2],
  ]
  const tones = { high: 'danger', med: 'warn', low: 'accent' }
  return (
    <div style={fade(visible)}>
      <div className="card" style={{ padding: 20 }}>
        <div style={{ fontSize: 11, color: 'var(--fg-muted)', marginBottom: 4 }}>People</div>
        <div style={{ fontSize: 17, fontWeight: 600, marginBottom: 18 }}>Highest-risk teammates</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {people.map(([name, role, lvl, n]) => (
            <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--bg-soft)', display: 'grid', placeItems: 'center', fontSize: 12, fontWeight: 600, color: 'var(--fg-muted)', flexShrink: 0 }}>
                {name.split(' ').map(s => s[0]).join('')}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{name}</div>
                <div style={{ fontSize: 12, color: 'var(--fg-muted)' }}>{role} · {n} incident{n > 1 ? 's' : ''} this week</div>
              </div>
              <span className={`chip chip-${tones[lvl]}`} style={{ fontSize: 11.5 }}>{lvl}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
