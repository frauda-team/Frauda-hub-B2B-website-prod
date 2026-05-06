import React from 'react'
import { Icon, StatusDot } from './Brand'

const SCRIPT = [
  { t: 0,    label: 'Idle inbox' },
  { t: 1.2,  label: 'New email arrives' },
  { t: 2.6,  label: 'Fishpo scanning…' },
  { t: 4.2,  label: 'Tokens flagged' },
  { t: 5.4,  label: 'Verdict: Phishing' },
  { t: 7.0,  label: 'Email quarantined' },
]
const DURATION = 10

function currentLabel(t) {
  return SCRIPT.filter(s => t >= s.t).slice(-1)[0]?.label ?? ''
}

export default function FishpoDemo() {
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

  const arrived     = t > 1.2
  const flagged     = t > 4.2
  const verdict     = t > 5.4
  const quarantined = t > 7.0
  const pct = (t / DURATION) * 100

  function handleScrub(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    setT(ratio * DURATION)
    setPlaying(false)
  }

  return (
    <div style={{
      width: '100%', height: '100%', background: 'var(--bg-soft)',
      display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-sans)',
    }}>
      {/* browser chrome */}
      <div style={{
        padding: '10px 18px', display: 'flex', alignItems: 'center', gap: 14,
        borderBottom: '1px solid var(--border)', background: 'var(--bg-elev)', flexShrink: 0,
      }}>
        <div style={{ display: 'flex', gap: 7 }}>
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#ed6a5e' }} />
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#f4be4f' }} />
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#61c554' }} />
        </div>
        <div style={{
          flex: 1, height: 28, borderRadius: 7, background: 'var(--bg-soft)',
          display: 'flex', alignItems: 'center', padding: '0 12px',
          fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--fg-muted)', gap: 7,
        }}>
          <Icon.Lock size={11} /> outlook.office.com/mail/inbox
        </div>
        <div className="chip chip-accent" style={{ fontSize: 11 }}>
          <StatusDot tone="ok" /> Fishpo · active
        </div>
      </div>

      {/* Outlook layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '200px 300px 1fr', flex: 1, minHeight: 0, overflow: 'hidden' }}>
        <Sidebar />
        <MailList arrived={arrived} flagged={flagged} quarantined={quarantined} />
        <MailReader arrived={arrived} flagged={flagged} verdict={verdict} quarantined={quarantined} />
      </div>

      {/* Player bar */}
      <div style={{
        padding: '14px 18px',
        borderTop: '1px solid var(--border)',
        background: 'var(--bg-elev)',
        display: 'flex', flexDirection: 'column', gap: 8,
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={() => setPlaying(p => !p)}
            aria-label={playing ? 'Pause' : 'Play'}
            style={{
              width: 34, height: 34, borderRadius: '50%',
              background: 'var(--accent)', color: 'var(--accent-fg)',
              border: 'none', cursor: 'pointer', display: 'grid', placeItems: 'center',
              flexShrink: 0, transition: 'filter .12s',
            }}
            onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.15)'}
            onMouseLeave={e => e.currentTarget.style.filter = ''}
          >
            {playing ? <PauseIcon /> : <Icon.Play size={13} />}
          </button>

          <button
            onClick={() => { setT(0); setPlaying(true) }}
            aria-label="Restart"
            style={{
              width: 30, height: 30, borderRadius: '50%',
              background: 'transparent', color: 'var(--fg-muted)',
              border: '1px solid var(--border-strong)', cursor: 'pointer',
              display: 'grid', placeItems: 'center',
              flexShrink: 0, transition: 'color .12s, background .12s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-soft)'; e.currentTarget.style.color = 'var(--fg)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--fg-muted)' }}
          >
            <RestartIcon />
          </button>

          <div
            onClick={handleScrub}
            style={{
              flex: 1, height: 6, background: 'var(--bg-soft)', borderRadius: 3,
              cursor: 'pointer', position: 'relative',
            }}
          >
            <div style={{
              position: 'absolute', left: 0, top: 0, height: '100%',
              width: `${pct}%`, background: 'var(--accent)', borderRadius: 3,
            }} />
            <div style={{
              position: 'absolute', top: '50%', left: `${pct}%`,
              width: 13, height: 13, borderRadius: '50%',
              background: 'var(--accent)', transform: 'translate(-50%, -50%)',
              boxShadow: '0 0 0 3px var(--bg-elev)',
            }} />
          </div>

          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--fg-muted)',
            minWidth: 36, textAlign: 'right', flexShrink: 0,
          }}>
            {t.toFixed(1)}s
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 2 }}>
          {playing && (
            <span style={{
              width: 7, height: 7, borderRadius: '50%', background: 'var(--danger)',
              animation: 'fh-pulse 1.2s ease-in-out infinite', flexShrink: 0,
            }} />
          )}
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--fg-muted)', letterSpacing: '0.04em' }}>
            {playing ? 'LIVE · ' : ''}{currentLabel(t)}
          </span>
        </div>
      </div>
    </div>
  )
}

function PauseIcon() {
  return (
    <svg width="11" height="13" viewBox="0 0 11 13" fill="currentColor">
      <rect x="0" y="0" width="4" height="13" rx="1.2" />
      <rect x="7" y="0" width="4" height="13" rx="1.2" />
    </svg>
  )
}

function RestartIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  )
}

function Sidebar() {
  const items = [
    ['Inbox', 12, true], ['Drafts', 3], ['Sent', null],
    ['Junk', null], ['Archive', null],
  ]
  return (
    <aside style={{ borderRight: '1px solid var(--border)', padding: '16px 10px', background: 'var(--bg)', fontSize: 14 }}>
      <div style={{ padding: '8px 12px', fontWeight: 500, color: 'var(--fg-muted)', fontSize: 12, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
        m.berzins@acme.lv
      </div>
      <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {items.map(([n, c, sel]) => (
          <div key={n} style={{
            padding: '9px 12px', borderRadius: 7,
            background: sel ? 'var(--accent-soft)' : 'transparent',
            color: sel ? 'var(--accent)' : 'var(--fg-muted)',
            display: 'flex', justifyContent: 'space-between', fontWeight: sel ? 600 : 400,
          }}>
            <span>{n}</span>
            {c != null && <span style={{ fontSize: 12 }}>{c}</span>}
          </div>
        ))}
      </div>
    </aside>
  )
}

function MailList({ arrived, flagged, quarantined }) {
  const mails = [
    { from: 'Anita · Finance', subj: 'Q2 forecast — final', preview: 'Attaching the deck for tomorrow…', time: '09:14', read: false },
    { from: 'Slack', subj: 'You were mentioned in #general', preview: '@maris can you sync after standup?', time: '08:42', read: true },
    { from: 'GitHub', subj: '[acme/api] PR #482 ready', preview: 'k.ozols opened a pull request…', time: '08:21', read: true },
  ]
  return (
    <div style={{ borderRight: '1px solid var(--border)', overflow: 'hidden', background: 'var(--bg-elev)' }}>
      <div style={{
        padding: '14px 16px', borderBottom: '1px solid var(--border)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span style={{ fontSize: 15, fontWeight: 600 }}>Inbox</span>
        <span style={{ fontSize: 12, color: 'var(--fg-muted)' }}>{12 + (arrived ? 1 : 0)} unread</span>
      </div>

      {/* suspicious email */}
      <div style={{
        padding: '14px 16px', borderBottom: '1px solid var(--border)',
        background: quarantined
          ? 'repeating-linear-gradient(45deg, var(--bg-soft) 0 6px, transparent 6px 12px)'
          : flagged ? 'var(--danger-soft)' : 'var(--accent-soft)',
        opacity: arrived ? 1 : 0,
        transform: arrived ? 'translateX(0)' : 'translateX(-14px)',
        transition: 'opacity .4s, transform .4s, background .4s',
        position: 'relative',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
          <span style={{
            fontWeight: 600,
            color: quarantined ? 'var(--fg-muted)' : 'var(--fg)',
            textDecoration: quarantined ? 'line-through' : 'none',
          }}>Microsoft Billing</span>
          <span style={{ fontSize: 12, color: 'var(--fg-muted)' }}>09:23</span>
        </div>
        <div style={{ fontSize: 13.5, fontWeight: 500, marginTop: 5, color: quarantined ? 'var(--fg-muted)' : 'var(--fg)' }}>
          URGENT: Your Microsoft 365 license…
        </div>
        <div style={{ fontSize: 12, color: 'var(--fg-muted)', marginTop: 4 }}>
          Dear customer, we have detected unusual…
        </div>
        {flagged && !quarantined && (
          <span style={{
            position: 'absolute', top: 12, right: 12, fontSize: 10.5,
            padding: '2px 7px', borderRadius: 4, background: 'var(--danger)',
            color: 'white', fontFamily: 'var(--font-mono)',
            animation: 'fh-flag .4s ease-out',
          }}>PHISHING</span>
        )}
        {quarantined && (
          <span style={{
            position: 'absolute', top: 12, right: 12, fontSize: 10.5,
            padding: '2px 7px', borderRadius: 4, background: 'var(--fg-faint)',
            color: 'white', fontFamily: 'var(--font-mono)',
          }}>QUARANTINED</span>
        )}
      </div>

      {mails.map((m, i) => (
        <div key={i} style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)', opacity: m.read ? 0.65 : 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
            <span style={{ fontWeight: m.read ? 400 : 600 }}>{m.from}</span>
            <span style={{ fontSize: 12, color: 'var(--fg-muted)' }}>{m.time}</span>
          </div>
          <div style={{ fontSize: 13.5, fontWeight: m.read ? 400 : 500, marginTop: 4 }}>{m.subj}</div>
          <div style={{ fontSize: 12, color: 'var(--fg-muted)', marginTop: 3 }}>{m.preview}</div>
        </div>
      ))}
    </div>
  )
}

function Highlight({ children, tag, on }) {
  return (
    <span style={{
      background: on ? 'var(--danger-soft)' : 'transparent',
      color: on ? 'var(--danger)' : 'inherit',
      borderBottom: on ? '2px solid var(--danger)' : 'none',
      padding: on ? '2px 4px' : 0,
      borderRadius: 3,
      transition: 'background .3s, color .3s',
      position: 'relative', display: 'inline-block',
    }}>
      {children}
      {on && tag && (
        <span style={{
          position: 'absolute', top: '100%', left: 0, marginTop: 5,
          fontSize: 10, fontFamily: 'var(--font-mono)',
          color: 'var(--danger)', whiteSpace: 'nowrap', opacity: 0.85,
        }}>↳ {tag}</span>
      )}
    </span>
  )
}

function MailReader({ arrived, flagged, verdict, quarantined }) {
  return (
    <div style={{ position: 'relative', background: 'var(--bg-elev)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {!arrived && (
        <div style={{ flex: 1, display: 'grid', placeItems: 'center', color: 'var(--fg-faint)', fontSize: 14 }}>
          Select an email to read.
        </div>
      )}
      {arrived && (
        <div style={{ flex: 1, overflow: 'auto' }}>
          {/* email header */}
          <div style={{ padding: '24px 36px 20px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ fontSize: 22, fontWeight: 600, lineHeight: 1.3 }}>
              URGENT: Your Microsoft 365 license expires in 24 hours
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 16 }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%', background: 'var(--bg-soft)',
                display: 'grid', placeItems: 'center', fontSize: 13, color: 'var(--fg-muted)', flexShrink: 0,
              }}>MB</div>
              <div style={{ fontSize: 13.5 }}>
                <div>
                  <strong>Microsoft Billing</strong>{' '}
                  &lt;<Highlight tag="lookalike domain" on={flagged}>billing@micros0ft-secure.com</Highlight>&gt;
                </div>
                <div style={{ color: 'var(--fg-muted)', marginTop: 3 }}>to: m.berzins@acme.lv · Today 09:23</div>
              </div>
            </div>
          </div>

          {/* email body */}
          <div style={{ padding: '28px 36px', fontSize: 15, lineHeight: 1.8, color: 'var(--fg)', maxWidth: 680 }}>
            <p style={{ margin: 0 }}>Dear customer,</p>
            <p style={{ marginTop: 16 }}>
              We have detected{' '}
              <Highlight tag="urgency trigger" on={flagged}>unusual activity</Highlight>{' '}
              on your Microsoft 365 account. To avoid permanent suspension, please{' '}
              <Highlight tag="credential harvest" on={flagged}>verify your credentials</Highlight>{' '}
              by clicking the secure portal link below{' '}
              <Highlight tag="urgency trigger" on={flagged}>within 24 hours</Highlight>.
            </p>
            <p style={{ marginTop: 28 }}>
              <span style={{
                display: 'inline-block', padding: '11px 22px', borderRadius: 7,
                background: flagged ? 'var(--bg-soft)' : '#0a66c2',
                color: flagged ? 'var(--fg-faint)' : 'white',
                textDecoration: flagged ? 'line-through' : 'none',
                fontSize: 14, fontWeight: 600,
              }}>
                Verify my account →
              </span>
            </p>
            <p style={{ color: 'var(--fg-muted)', fontSize: 13, marginTop: 36 }}>
              Microsoft Corporation · One Microsoft Way · Redmond, WA
            </p>
          </div>
        </div>
      )}

      {/* verdict panel — top right overlay */}
      {verdict && (
        <div style={{ position: 'absolute', right: 20, top: 20, width: 280, animation: 'fh-flag .35s ease-out' }}>
          <div className="card" style={{ overflow: 'hidden', boxShadow: 'var(--shadow-pop)' }}>
            <div style={{
              padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              background: 'var(--danger-soft)', color: 'var(--danger)',
              fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.06em',
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Icon.Alert size={12} /> FISHPO · PHISHING
              </span>
              <span>0.6s</span>
            </div>
            <div style={{ padding: '16px 16px 20px' }}>
              <div style={{ fontSize: 26, fontWeight: 700 }}>Risk score 98 / 100</div>
              <div style={{ fontSize: 12.5, color: 'var(--fg-muted)', marginTop: 5 }}>
                Credential harvest · brand impersonation
              </div>
              <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 9, fontSize: 13 }}>
                {[
                  ['Sender',       'Lookalike of microsoft.com'],
                  ['Domain age',   'Registered 2 days ago'],
                  ['Urgency cues', '4 detected'],
                  ['Link target',  'micr0soft-login.ru'],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                    <span style={{ color: 'var(--fg-muted)' }}>{k}</span>
                    <span style={{ color: 'var(--fg)', textAlign: 'right' }}>{v}</span>
                  </div>
                ))}
              </div>
              {quarantined && (
                <div style={{
                  marginTop: 16, padding: '8px 12px', borderRadius: 8,
                  background: 'var(--accent-soft)', color: 'var(--accent)',
                  fontFamily: 'var(--font-mono)', fontSize: 11.5,
                  display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  <Icon.Check size={13} /> Email quarantined automatically
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
