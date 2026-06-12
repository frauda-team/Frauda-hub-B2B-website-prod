import React from 'react'
import { Icon, StatusDot } from './Brand'

function useScreenSize() {
  function getSize() {
    const w = window.innerWidth
    if (w < 600) return 'small'
    if (w < 900) return 'medium'
    return 'large'
  }
  const [size, setSize] = React.useState(getSize)
  React.useEffect(() => {
    const fn = () => setSize(getSize())
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])
  return size
}

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
  const size = useScreenSize()
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

  // large:  15% sidebar | 20% inbox | 40% email | 25% fishpo  (exact user spec)
  // medium: 20% inbox | 55% email | 25% fishpo  (sidebar hidden)
  // small:  60% email | 40% fishpo  (sidebar + inbox hidden)
  const gridCols = {
    large:  '15fr 20fr 40fr 25fr',
    medium: '20fr 55fr 25fr',
    small:  '60fr 40fr',
  }[size]

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

      {/* Outlook 4-column layout */}
      <div style={{ display: 'grid', gridTemplateColumns: gridCols, flex: 1, minHeight: 0, overflow: 'hidden' }}>
        {size === 'large' && <Sidebar />}
        {size !== 'small' && <MailList arrived={arrived} flagged={flagged} quarantined={quarantined} />}
        <MailReader arrived={arrived} flagged={flagged} quarantined={quarantined} />
        <FishpoPanel arrived={arrived} verdict={verdict} quarantined={quarantined} t={t} />
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
    <aside style={{ borderRight: '1px solid var(--border)', padding: '16px 10px', background: 'var(--bg)', fontSize: 13, minWidth: 0, overflow: 'hidden' }}>
      <div style={{ padding: '8px 10px', fontWeight: 500, color: 'var(--fg-muted)', fontSize: 11, letterSpacing: '0.04em', textTransform: 'uppercase', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        m.berzins@acme.lv
      </div>
      <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 1 }}>
        {items.map(([n, c, sel]) => (
          <div key={n} style={{
            padding: '8px 10px', borderRadius: 6,
            background: sel ? 'var(--accent-soft)' : 'transparent',
            color: sel ? 'var(--accent)' : 'var(--fg-muted)',
            display: 'flex', justifyContent: 'space-between', fontWeight: sel ? 600 : 400,
            whiteSpace: 'nowrap',
          }}>
            <span>{n}</span>
            {c != null && <span style={{ fontSize: 11 }}>{c}</span>}
          </div>
        ))}
      </div>
      {/* filter groups */}
      <div style={{ marginTop: 18, padding: '0 10px' }}>
        <div style={{ fontSize: 10.5, fontWeight: 600, color: 'var(--fg-faint)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Filters</div>
        {['Newsletters', 'Receipts', 'Alerts'].map(f => (
          <div key={f} style={{ padding: '6px 0', fontSize: 12, color: 'var(--fg-muted)', display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap' }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--border-strong)', flexShrink: 0 }} />
            {f}
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
    <div style={{ borderRight: '1px solid var(--border)', overflow: 'hidden', background: 'var(--bg-elev)', minWidth: 0 }}>
      <div style={{
        padding: '12px 14px', borderBottom: '1px solid var(--border)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexShrink: 0,
      }}>
        <span style={{ fontSize: 14, fontWeight: 600 }}>Inbox</span>
        <span style={{ fontSize: 11.5, color: 'var(--fg-muted)' }}>{12 + (arrived ? 1 : 0)}</span>
      </div>

      {/* suspicious email */}
      <div style={{
        padding: '12px 14px', borderBottom: '1px solid var(--border)',
        background: quarantined
          ? 'repeating-linear-gradient(45deg, var(--bg-soft) 0 6px, transparent 6px 12px)'
          : flagged ? 'var(--danger-soft)' : 'var(--accent-soft)',
        opacity: arrived ? 1 : 0,
        transform: arrived ? 'translateX(0)' : 'translateX(-14px)',
        transition: 'opacity .4s, transform .4s, background .4s',
        position: 'relative',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, gap: 4 }}>
          <span style={{
            fontWeight: 600,
            color: quarantined ? 'var(--fg-muted)' : 'var(--fg)',
            textDecoration: quarantined ? 'line-through' : 'none',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>Microsoft Billing</span>
          <span style={{ fontSize: 11, color: 'var(--fg-muted)', flexShrink: 0 }}>09:23</span>
        </div>
        <div style={{ fontSize: 12.5, fontWeight: 500, marginTop: 4, color: quarantined ? 'var(--fg-muted)' : 'var(--fg)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          URGENT: Your Microsoft 365…
        </div>
        <div style={{ fontSize: 11.5, color: 'var(--fg-muted)', marginTop: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          Dear customer, we have detected…
        </div>
        {flagged && !quarantined && (
          <span style={{
            position: 'absolute', top: 10, right: 10, fontSize: 10,
            padding: '2px 6px', borderRadius: 4, background: 'var(--danger)',
            color: 'white', fontFamily: 'var(--font-mono)',
            animation: 'fh-flag .4s ease-out',
          }}>PHISHING</span>
        )}
        {quarantined && (
          <span style={{
            position: 'absolute', top: 10, right: 10, fontSize: 10,
            padding: '2px 6px', borderRadius: 4, background: 'var(--fg-faint)',
            color: 'white', fontFamily: 'var(--font-mono)',
          }}>QUARANTINED</span>
        )}
      </div>

      {mails.map((m, i) => (
        <div key={i} style={{ padding: '12px 14px', borderBottom: '1px solid var(--border)', opacity: m.read ? 0.65 : 1, minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, gap: 4 }}>
            <span style={{ fontWeight: m.read ? 400 : 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.from}</span>
            <span style={{ fontSize: 11, color: 'var(--fg-muted)', flexShrink: 0 }}>{m.time}</span>
          </div>
          <div style={{ fontSize: 12.5, fontWeight: m.read ? 400 : 500, marginTop: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.subj}</div>
          <div style={{ fontSize: 11.5, color: 'var(--fg-muted)', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.preview}</div>
        </div>
      ))}
    </div>
  )
}

function Highlight({ children, on }) {
  return (
    <span style={{
      background: on ? 'var(--danger-soft)' : 'transparent',
      color: on ? 'var(--danger)' : 'inherit',
      borderBottom: on ? '2px solid var(--danger)' : 'none',
      padding: on ? '2px 4px' : 0,
      borderRadius: 3,
      transition: 'background .3s, color .3s',
    }}>
      {children}
    </span>
  )
}

function MailReader({ arrived, flagged, quarantined }) {
  return (
    <div style={{
      borderRight: '1px solid var(--border)',
      background: 'var(--bg-elev)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      minWidth: 0,
    }}>
      {!arrived && (
        <div style={{ flex: 1, display: 'grid', placeItems: 'center', color: 'var(--fg-faint)', fontSize: 13 }}>
          Select an email to read.
        </div>
      )}
      {arrived && (
        <div style={{ flex: 1, overflow: 'auto' }}>
          <div style={{ padding: '20px 24px 16px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ fontSize: 17, fontWeight: 600, lineHeight: 1.35 }}>
              URGENT: Your Microsoft 365 license expires in 24 hours
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 14 }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%', background: 'var(--bg-soft)',
                display: 'grid', placeItems: 'center', fontSize: 12, color: 'var(--fg-muted)', flexShrink: 0,
              }}>MB</div>
              <div style={{ fontSize: 13, minWidth: 0 }}>
                <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  <strong>Microsoft Billing</strong>{' '}
                  &lt;<Highlight on={flagged}>billing@micros0ft-secure.com</Highlight>&gt;
                </div>
                <div style={{ color: 'var(--fg-muted)', marginTop: 2, fontSize: 12 }}>to: m.berzins@acme.lv · Today 09:23</div>
              </div>
            </div>
          </div>

          <div style={{ padding: '20px 24px', fontSize: 14, lineHeight: 1.8, color: 'var(--fg)' }}>
            <p style={{ margin: 0 }}>Dear customer,</p>
            <p style={{ marginTop: 14 }}>
              We have detected{' '}
              <Highlight on={flagged}>unusual activity</Highlight>{' '}
              on your Microsoft 365 account. To avoid permanent suspension, please{' '}
              <Highlight on={flagged}>verify your credentials</Highlight>{' '}
              by clicking the secure portal link below{' '}
              <Highlight on={flagged}>within 24 hours</Highlight>.
            </p>
            <p style={{ marginTop: 22 }}>
              <span style={{
                display: 'inline-block', padding: '10px 18px', borderRadius: 7,
                background: flagged ? 'var(--bg-soft)' : '#0a66c2',
                color: flagged ? 'var(--fg-faint)' : 'white',
                textDecoration: flagged ? 'line-through' : 'none',
                fontSize: 13.5, fontWeight: 600,
              }}>
                Verify my account →
              </span>
            </p>
            <p style={{ color: 'var(--fg-muted)', fontSize: 12, marginTop: 28 }}>
              Microsoft Corporation · One Microsoft Way · Redmond, WA
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

function FishpoPanel({ arrived, verdict, quarantined, t }) {
  const scanning = arrived && !verdict
  const scanPct = scanning
    ? Math.min(100, ((t - 1.2) / (5.4 - 1.2)) * 100)
    : verdict ? 100 : 0

  const checks = [
    { at: 2.0, label: 'Sender domain lookup',      warn: false },
    { at: 2.8, label: 'Token pattern analysis',    warn: false },
    { at: 3.5, label: 'Threat DB cross-reference', warn: false },
    { at: 4.2, label: 'Urgency cues: 4 detected',  warn: true  },
    { at: 4.8, label: 'Link target flagged',        warn: true  },
  ]
  const visibleChecks = checks.filter(c => t > c.at)

  const headerTone = verdict ? 'danger' : arrived ? 'warn' : 'ok'
  const headerLabel = verdict ? '· phishing' : arrived ? '· scanning' : '· monitoring'

  return (
    <div style={{
      background: 'var(--bg)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      minWidth: 0,
      borderLeft: '2px solid var(--border)',
    }}>
      {/* panel header */}
      <div style={{
        padding: '10px 12px',
        borderBottom: '1px solid var(--border)',
        background: 'var(--bg-elev)',
        display: 'flex',
        alignItems: 'center',
        gap: 7,
        flexShrink: 0,
      }}>
        <StatusDot tone={headerTone} />
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.07em',
          color: verdict ? 'var(--danger)' : 'var(--fg)',
          whiteSpace: 'nowrap',
        }}>FISHPO</span>
        <span style={{ fontSize: 10.5, color: 'var(--fg-muted)', whiteSpace: 'nowrap' }}>{headerLabel}</span>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '12px 12px' }}>
        {!arrived && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '9px 10px', borderRadius: 7,
              background: 'var(--bg-elev)',
            }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--ok)', animation: 'fh-pulse 2s ease-in-out infinite', flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: 'var(--fg-muted)' }}>Monitoring inbox</span>
            </div>
            <div style={{ fontSize: 11.5, color: 'var(--fg-faint)', lineHeight: 1.6, padding: '0 2px' }}>
              Watching for phishing, BEC, and credential harvesting.
            </div>
            <div style={{ marginTop: 6, display: 'flex', flexDirection: 'column', gap: 5 }}>
              {['Real-time scanning', 'Token analysis', 'Domain reputation'].map(f => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11.5, color: 'var(--fg-muted)' }}>
                  <Icon.Check size={11} /> {f}
                </div>
              ))}
            </div>
          </div>
        )}

        {scanning && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--fg)' }}>Analyzing email…</div>
            <div style={{ height: 4, borderRadius: 3, background: 'var(--bg-soft)', overflow: 'hidden' }}>
              <div style={{
                height: '100%', borderRadius: 3, background: 'var(--accent)',
                width: `${scanPct}%`, transition: 'width .3s linear',
              }} />
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--fg-faint)' }}>
              {Math.round(scanPct)}%
            </div>
            <div style={{ marginTop: 2, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {visibleChecks.map((c, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'flex-start', gap: 6,
                  fontSize: 11.5,
                  color: c.warn ? 'var(--danger)' : 'var(--fg)',
                  animation: 'fh-flag .3s ease-out',
                }}>
                  <span style={{ flexShrink: 0, marginTop: 1 }}>
                    {c.warn ? <Icon.Alert size={11} /> : <Icon.Check size={11} />}
                  </span>
                  {c.label}
                </div>
              ))}
            </div>
          </div>
        )}

        {verdict && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, animation: 'fh-flag .35s ease-out' }}>
            <div style={{
              padding: '7px 10px', borderRadius: 6,
              background: 'var(--danger-soft)',
              display: 'flex', alignItems: 'center', gap: 6,
              color: 'var(--danger)',
              fontFamily: 'var(--font-mono)', fontSize: 10.5,
              letterSpacing: '0.06em',
            }}>
              <Icon.Alert size={11} /> PHISHING DETECTED
            </div>
            <div>
              <div style={{ fontSize: 26, fontWeight: 700, color: 'var(--fg)', lineHeight: 1 }}>98<span style={{ fontSize: 14, fontWeight: 400, color: 'var(--fg-muted)' }}> / 100</span></div>
              <div style={{ fontSize: 11.5, color: 'var(--fg-muted)', marginTop: 4 }}>Credential harvest · brand impersonation</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginTop: 2 }}>
              {[
                ['Sender',       'Lookalike domain'],
                ['Domain age',   '2 days old'],
                ['Urgency cues', '4 detected'],
                ['Link target',  'micr0soft-login.ru'],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', gap: 6, fontSize: 12 }}>
                  <span style={{ color: 'var(--fg-muted)', flexShrink: 0 }}>{k}</span>
                  <span style={{ color: 'var(--fg)', textAlign: 'right', fontSize: 11.5 }}>{v}</span>
                </div>
              ))}
            </div>
            {quarantined && (
              <div style={{
                padding: '7px 10px', borderRadius: 6,
                background: 'var(--accent-soft)', color: 'var(--accent)',
                fontFamily: 'var(--font-mono)', fontSize: 11,
                display: 'flex', alignItems: 'center', gap: 6,
                animation: 'fh-flag .35s ease-out',
              }}>
                <Icon.Check size={12} /> Quarantined automatically
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
