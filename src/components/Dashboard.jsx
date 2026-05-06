import React from 'react'
import { FraudaMark, Icon, StatusDot } from './Brand'

export default function Dashboard() {
  return (
    <div style={{ width: '100%', height: '100%', display: 'grid', gridTemplateColumns: '220px 1fr', background: 'var(--bg)', fontFamily: 'var(--font-sans)' }}>
      <Sidebar />
      <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Topbar />
        <div style={{ padding: '20px 28px', display: 'grid', gap: 16, overflow: 'auto', flex: 1 }} className="no-scrollbar">
          <KPIs />
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 16 }}>
            <Timeline />
            <ThreatTypes />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 16 }}>
            <Feed />
            <RiskPeople />
          </div>
        </div>
      </div>
    </div>
  )
}

function Sidebar() {
  const items = [
    ['Overview',       Icon.Eye,    true],
    ['Live feed',      Icon.Bolt,   false],
    ['Employees',      Icon.Chip,   false],
    ['Policies',       Icon.Shield, false],
    ['Investigations', Icon.Search, false],
    ['Models',         Icon.Chip,   false],
    ['Audit log',      Icon.Lock,   false],
  ]
  return (
    <aside style={{ borderRight: '1px solid var(--border)', background: 'var(--bg-elev)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '20px 16px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <FraudaMark size={22} />
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600, letterSpacing: '-0.02em' }}>
            Fishpo <span style={{ opacity: 0.5, fontWeight: 400 }}>console</span>
          </div>
        </div>
        <div style={{ marginTop: 14, padding: '8px 10px', borderRadius: 8, background: 'var(--bg-soft)', fontSize: 12 }}>
          <div style={{ fontWeight: 500 }}>Acme Industries</div>
          <div style={{ color: 'var(--fg-muted)', fontSize: 11 }}>247 seats · Riga, LV</div>
        </div>
      </div>
      <nav style={{ padding: 10, flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {items.map(([name, Ic, sel]) => (
          <a key={name} style={{
            padding: '8px 10px', borderRadius: 7, fontSize: 13,
            display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer',
            background: sel ? 'var(--accent-soft)' : 'transparent',
            color: sel ? 'var(--accent)' : 'var(--fg-muted)',
            fontWeight: sel ? 500 : 400, textDecoration: 'none',
          }}>
            <Ic size={14} /> {name}
          </a>
        ))}
      </nav>
      <div style={{ padding: 14, borderTop: '1px solid var(--border)', fontSize: 11.5, color: 'var(--fg-muted)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <StatusDot tone="ok" /> All agents healthy
        </div>
        <div>Models · v2026.04.28</div>
      </div>
    </aside>
  )
}

function Topbar() {
  return (
    <header style={{
      borderBottom: '1px solid var(--border)', padding: '14px 28px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      <div>
        <div className="h-eyebrow">Overview · last 7 days</div>
        <div style={{ fontSize: 22, fontWeight: 500, marginTop: 4, letterSpacing: '-0.01em' }}>Welcome back, Linda</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          height: 32, padding: '0 12px', borderRadius: 8, border: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', gap: 8, fontSize: 12.5, color: 'var(--fg-muted)',
          minWidth: 220,
        }}>
          <Icon.Search size={13} /> Search threats, employees, domains…
        </div>
        <button className="btn btn-ghost btn-sm">Last 7 days</button>
        <button className="btn btn-primary btn-sm">Export report</button>
      </div>
    </header>
  )
}

function KPIs() {
  const kpis = [
    { l: 'Threats neutralised', v: '1,247', d: '+12% vs prev', tone: 'ok' },
    { l: 'Phishing blocked',    v: '892',   d: '+8%',          tone: 'ok' },
    { l: 'AI-generated scams',  v: '143',   d: '+34%',         tone: 'warn' },
    { l: 'Median verdict time', v: '0.6s',  d: '−0.1s',        tone: 'ok' },
    { l: 'Agents online',       v: '247/247', d: '100%',       tone: 'ok' },
  ]
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
      {kpis.map(it => (
        <div key={it.l} className="card" style={{ padding: 18 }}>
          <div style={{ fontSize: 11.5, color: 'var(--fg-muted)' }}>{it.l}</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, marginTop: 8, lineHeight: 1, fontWeight: 500 }}>{it.v}</div>
          <div className={`chip chip-${it.tone === 'ok' ? 'accent' : 'warn'}`} style={{ marginTop: 10, fontSize: 11 }}>
            {it.d}
          </div>
        </div>
      ))}
    </div>
  )
}

function Timeline() {
  const bars = React.useMemo(() => Array.from({ length: 56 }, (_, i) => ({
    safe:   20 + Math.round(Math.sin(i / 4) * 8 + (i * 7 + 3) % 12),
    warn:   Math.round((i * 3 + 1) % 5),
    danger: Math.round(Math.abs(Math.sin(i / 6) * 4) + (i * 2) % 3),
  })), [])
  const max = Math.max(...bars.map(b => b.safe + b.warn + b.danger))

  return (
    <div className="card" style={{ padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
        <div>
          <div className="h-eyebrow">Activity</div>
          <div style={{ fontSize: 18, fontWeight: 500, marginTop: 4 }}>Events / hour</div>
        </div>
        <div style={{ display: 'flex', gap: 14, fontSize: 11.5, color: 'var(--fg-muted)' }}>
          {[['Safe', 'var(--accent)'], ['Suspicious', 'var(--warn)'], ['Threat', 'var(--danger)']].map(([l, c]) => (
            <span key={l} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 8, height: 8, background: c, borderRadius: 2 }} /> {l}
            </span>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 160 }}>
        {bars.map((b, i) => {
          const total = b.safe + b.warn + b.danger
          const h = (total / max) * 100
          return (
            <div key={i} style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
              <div style={{ height: `${h}%`, display: 'flex', flexDirection: 'column', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ flex: b.danger, background: 'var(--danger)' }} />
                <div style={{ flex: b.warn,   background: 'var(--warn)' }} />
                <div style={{ flex: b.safe,   background: 'var(--accent)', opacity: 0.85 }} />
              </div>
            </div>
          )
        })}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 10.5, color: 'var(--fg-faint)', fontFamily: 'var(--font-mono)' }}>
        <span>7d ago</span><span>5d</span><span>3d</span><span>1d</span><span>now</span>
      </div>
    </div>
  )
}

function ThreatTypes() {
  const types = [
    ['Phishing',           892, 'danger', 71],
    ['AI-gen scams',       143, 'danger', 11],
    ['Invoice fraud',       87, 'warn',    7],
    ['Social engineering',  64, 'warn',    5],
    ['Credential harvest',  41, 'danger',  3],
    ['Other',               20, 'warn',    2],
  ]
  return (
    <div className="card" style={{ padding: 20 }}>
      <div className="h-eyebrow">Breakdown</div>
      <div style={{ fontSize: 18, fontWeight: 500, marginTop: 4, marginBottom: 16 }}>By threat type</div>
      {types.map(([name, n, tone, pct]) => (
        <div key={name} style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 5 }}>
            <span>{name}</span>
            <span style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>{n}</span>
          </div>
          <div style={{ height: 5, background: 'var(--bg-soft)', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ width: `${pct}%`, height: '100%', background: `var(--${tone})`, borderRadius: 3 }} />
          </div>
        </div>
      ))}
    </div>
  )
}

function Feed() {
  const rows = [
    { sev: 'danger', who: 'm.berzins',  kind: 'Phishing',                  src: 'micros0ft-secure.com',    t: '2m ago',  score: 98 },
    { sev: 'danger', who: 'finance',    kind: 'AI voice scam',             src: '+371 ··· unknown',         t: '11m ago', score: 91 },
    { sev: 'warn',   who: 'k.ozols',    kind: 'Suspicious link',           src: 'bit.ly/3xZ',               t: '24m ago', score: 64 },
    { sev: 'danger', who: 'hr',         kind: 'Credential harvest',        src: 'docusign-portal.ru',       t: '38m ago', score: 88 },
    { sev: 'warn',   who: 'ceo-asst',   kind: 'CEO impersonation',         src: 'l.kalniņš@acmе.lv',       t: '1h ago',  score: 76 },
    { sev: 'ok',     who: 'a.liepa',    kind: 'False positive (resolved)', src: 'newsletter@stripe.com',    t: '2h ago',  score: 12 },
  ]
  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div className="h-eyebrow">Live feed</div>
          <div style={{ fontSize: 17, fontWeight: 500, marginTop: 4 }}>Recent events</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--fg-muted)' }}>
          <StatusDot tone="ok" /> Streaming
        </div>
      </div>
      {rows.map((r, i) => (
        <div key={i} style={{
          padding: '12px 18px',
          borderTop: i === 0 ? 'none' : '1px solid var(--border)',
          display: 'grid', gridTemplateColumns: '14px 1fr 80px 70px', gap: 14, alignItems: 'center',
        }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: `var(--${r.sev === 'ok' ? 'ok' : r.sev})` }} />
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 500 }}>{r.kind}</div>
            <div style={{ fontSize: 11.5, color: 'var(--fg-muted)', fontFamily: 'var(--font-mono)' }}>
              {r.who}@acme.lv ← {r.src}
            </div>
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--fg-muted)', textAlign: 'right' }}>{r.t}</span>
          <span className={`chip chip-${r.sev === 'ok' ? 'accent' : r.sev}`} style={{ fontSize: 11, justifyContent: 'center' }}>{r.score}</span>
        </div>
      ))}
    </div>
  )
}

function RiskPeople() {
  const people = [
    ['Maris Bērziņš', 'CTO',     'high', 4],
    ['Anita Kalniņa', 'CFO',     'high', 3],
    ['Kārlis Ozols',  'Eng',     'med',  2],
    ['Linda Liepa',   'IT lead', 'low',  1],
    ['Jānis Krūmiņš', 'Sales',   'med',  2],
  ]
  const tones = { high: 'danger', med: 'warn', low: 'accent' }
  return (
    <div className="card" style={{ padding: 20 }}>
      <div className="h-eyebrow">People</div>
      <div style={{ fontSize: 17, fontWeight: 500, marginTop: 4, marginBottom: 16 }}>Highest-risk teammates</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {people.map(([name, role, lvl, n]) => (
          <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%', background: 'var(--bg-soft)',
              display: 'grid', placeItems: 'center', fontSize: 11, fontWeight: 500, color: 'var(--fg-muted)',
              flexShrink: 0,
            }}>
              {name.split(' ').map(s => s[0]).join('')}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 500 }}>{name}</div>
              <div style={{ fontSize: 11, color: 'var(--fg-muted)' }}>{role} · {n} incidents this week</div>
            </div>
            <span className={`chip chip-${tones[lvl]}`} style={{ fontSize: 10.5 }}>{lvl}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
