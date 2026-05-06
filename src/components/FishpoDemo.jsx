import React from 'react'
import { Icon, StatusDot } from './Brand'

const SCRIPT = [
  { t: 0,    label: 'Idle inbox' },
  { t: 1.2,  label: 'New email arrives' },
  { t: 2.6,  label: 'Fishpo scanning…' },
  { t: 4.2,  label: 'Tokens flagged' },
  { t: 5.4,  label: 'Verdict: Phishing' },
  { t: 6.6,  label: 'User alerted' },
  { t: 8.0,  label: 'Email quarantined' },
]
const DURATION = 9.5

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

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [playing])

  const arrived     = t > 1.2
  const scanning    = t > 2.6 && t < 5.4
  const flagged     = t > 4.2
  const verdict     = t > 5.4
  const alerted     = t > 6.6
  const quarantined = t > 8.0

  const pct = (t / DURATION) * 100

  function handleScrub(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    setT(ratio * DURATION)
    setPlaying(false)
  }

  function restart() {
    setT(0)
    setPlaying(true)
  }

  return (
    <div style={{
      width: '100%', height: '100%', background: 'var(--bg-soft)',
      display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-sans)',
    }}>
      {/* browser chrome bar */}
      <div style={{
        padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 14,
        borderBottom: '1px solid var(--border)', background: 'var(--bg-elev)', flexShrink: 0,
      }}>
        <div style={{ display: 'flex', gap: 6 }}>
          <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#ed6a5e' }} />
          <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#f4be4f' }} />
          <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#61c554' }} />
        </div>
        <div style={{
          flex: 1, height: 26, borderRadius: 6, background: 'var(--bg-soft)',
          display: 'flex', alignItems: 'center', padding: '0 10px',
          fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-muted)', gap: 6,
        }}>
          <Icon.Lock size={11} /> outlook.office.com/mail/inbox
        </div>
        <div className="chip chip-accent" style={{ fontSize: 10.5 }}>
          <StatusDot tone="ok" /> Fishpo · active
        </div>
      </div>

      {/* Outlook layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '180px 280px 1fr', flex: 1, minHeight: 0, overflow: 'hidden' }}>
        <Sidebar />
        <MailList arrived={arrived} flagged={flagged} quarantined={quarantined} />
        <MailReader
          arrived={arrived} scanning={scanning} flagged={flagged}
          verdict={verdict} alerted={alerted} quarantined={quarantined}
        />
      </div>

      {/* ── Player bar ─────────────────────────────────────── */}
      <div style={{
        padding: '12px 16px',
        borderTop: '1px solid var(--border)',
        background: 'var(--bg-elev)',
        display: 'flex', flexDirection: 'column', gap: 8,
        flexShrink: 0,
      }}>
        {/* top row: controls + time */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* play / pause */}
          <button
            onClick={() => setPlaying(p => !p)}
            aria-label={playing ? 'Pause' : 'Play'}
            style={{
              width: 32, height: 32, borderRadius: '50%',
              background: 'var(--accent)', color: 'var(--accent-fg)',
              border: 'none', cursor: 'pointer',
              display: 'grid', placeItems: 'center',
              flexShrink: 0,
              transition: 'filter .12s',
            }}
            onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.15)'}
            onMouseLeave={e => e.currentTarget.style.filter = ''}
          >
            {playing ? <PauseIcon /> : <Icon.Play size={12} />}
          </button>

          {/* restart */}
          <button
            onClick={restart}
            aria-label="Restart"
            style={{
              width: 28, height: 28, borderRadius: '50%',
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

          {/* progress bar — clickable */}
          <div
            role="slider"
            aria-valuenow={Math.round(pct)}
            aria-valuemin={0}
            aria-valuemax={100}
            tabIndex={0}
            onClick={handleScrub}
            style={{
              flex: 1, height: 6, background: 'var(--bg-soft)', borderRadius: 3,
              cursor: 'pointer', position: 'relative',
            }}
          >
            <div style={{
              position: 'absolute', left: 0, top: 0, height: '100%',
              width: `${pct}%`,
              background: 'var(--accent)', borderRadius: 3,
              transition: playing ? 'none' : 'width .08s',
            }} />
            {/* thumb */}
            <div style={{
              position: 'absolute', top: '50%', left: `${pct}%`,
              width: 12, height: 12, borderRadius: '50%',
              background: 'var(--accent)',
              transform: 'translate(-50%, -50%)',
              boxShadow: '0 0 0 3px var(--bg-elev)',
              transition: playing ? 'none' : 'left .08s',
            }} />
          </div>

          {/* time */}
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-muted)',
            minWidth: 36, textAlign: 'right', flexShrink: 0,
          }}>
            {t.toFixed(1)}s
          </span>
        </div>

        {/* current phase label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 2 }}>
          {playing && (
            <span style={{
              width: 6, height: 6, borderRadius: '50%', background: 'var(--danger)',
              animation: 'fh-pulse 1.2s ease-in-out infinite', flexShrink: 0,
            }} />
          )}
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-muted)',
            letterSpacing: '0.04em',
          }}>
            {playing ? 'LIVE · ' : ''}{currentLabel(t)}
          </span>
        </div>
      </div>
    </div>
  )
}

/* ── sub-components ─────────────────────────────────────── */

function PauseIcon() {
  return (
    <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor">
      <rect x="0" y="0" width="3.5" height="12" rx="1" />
      <rect x="6.5" y="0" width="3.5" height="12" rx="1" />
    </svg>
  )
}

function RestartIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  )
}

function Sidebar() {
  const items = [
    ['Inbox', 12, true], ['Drafts', 3], ['Sent', null],
    ['Junk', null], ['Archive', null], ['Notes', null],
  ]
  return (
    <aside style={{ borderRight: '1px solid var(--border)', padding: '14px 8px', background: 'var(--bg)', fontSize: 13 }}>
      <div style={{ padding: '6px 10px', fontWeight: 500, color: 'var(--fg)', fontSize: 12, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
        m.berzins@acme.lv
      </div>
      <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {items.map(([n, c, sel]) => (
          <div key={n} style={{
            padding: '7px 10px', borderRadius: 6,
            background: sel ? 'var(--accent-soft)' : 'transparent',
            color: sel ? 'var(--accent)' : 'var(--fg-muted)',
            display: 'flex', justifyContent: 'space-between', fontWeight: sel ? 500 : 400,
          }}>
            <span>{n}</span>
            {c != null && <span style={{ fontSize: 11 }}>{c}</span>}
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
    { from: 'Zoom', subj: 'Recording: Customer call', preview: 'Your cloud recording is ready…', time: 'Yest.', read: true },
  ]
  return (
    <div style={{ borderRight: '1px solid var(--border)', overflow: 'hidden', background: 'var(--bg-elev)' }}>
      <div style={{
        padding: '12px 14px', borderBottom: '1px solid var(--border)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span style={{ fontSize: 14, fontWeight: 500 }}>Inbox</span>
        <span style={{ fontSize: 11, color: 'var(--fg-muted)' }}>{12 + (arrived ? 1 : 0)} unread</span>
      </div>

      <div style={{
        padding: '12px 14px', borderBottom: '1px solid var(--border)',
        background: quarantined
          ? 'repeating-linear-gradient(45deg, var(--bg-soft) 0 6px, transparent 6px 12px)'
          : flagged ? 'var(--danger-soft)' : 'var(--accent-soft)',
        opacity: arrived ? 1 : 0,
        transform: arrived ? 'translateX(0)' : 'translateX(-12px)',
        transition: 'opacity .4s, transform .4s, background .4s',
        position: 'relative',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5 }}>
          <span style={{
            fontWeight: 500,
            color: quarantined ? 'var(--fg-muted)' : 'var(--fg)',
            textDecoration: quarantined ? 'line-through' : 'none',
          }}>Microsoft Billing</span>
          <span style={{ fontSize: 11, color: 'var(--fg-muted)' }}>09:23</span>
        </div>
        <div style={{ fontSize: 13, fontWeight: 500, marginTop: 4, color: quarantined ? 'var(--fg-muted)' : 'var(--fg)' }}>
          URGENT: Your Microsoft 365 license…
        </div>
        <div style={{ fontSize: 11.5, color: 'var(--fg-muted)', marginTop: 3 }}>
          Dear customer, we have detected unusual…
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
        <div key={i} style={{ padding: '12px 14px', borderBottom: '1px solid var(--border)', opacity: m.read ? 0.7 : 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5 }}>
            <span style={{ fontWeight: m.read ? 400 : 500 }}>{m.from}</span>
            <span style={{ fontSize: 11, color: 'var(--fg-muted)' }}>{m.time}</span>
          </div>
          <div style={{ fontSize: 13, fontWeight: m.read ? 400 : 500, marginTop: 4 }}>{m.subj}</div>
          <div style={{ fontSize: 11.5, color: 'var(--fg-muted)', marginTop: 3 }}>{m.preview}</div>
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
      borderBottom: on ? '1.5px solid var(--danger)' : 'none',
      padding: on ? '1px 3px' : 0,
      borderRadius: 3,
      transition: 'background .3s, color .3s',
      position: 'relative', display: 'inline-block',
    }}>
      {children}
      {on && tag && (
        <span style={{
          position: 'absolute', top: '100%', left: 0, marginTop: 4,
          fontSize: 9.5, fontFamily: 'var(--font-mono)',
          color: 'var(--danger)', whiteSpace: 'nowrap', opacity: 0.85,
        }}>↳ {tag}</span>
      )}
    </span>
  )
}

function MailReader({ arrived, scanning, flagged, verdict, alerted, quarantined }) {
  return (
    <div style={{ position: 'relative', background: 'var(--bg-elev)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {!arrived && (
        <div style={{ flex: 1, display: 'grid', placeItems: 'center', color: 'var(--fg-faint)', fontSize: 13 }}>
          Select an email to read.
        </div>
      )}
      {arrived && (
        <div style={{ position: 'relative', flex: 1, overflow: 'hidden' }}>
          <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ fontSize: 19, fontWeight: 500 }}>
              URGENT: Your Microsoft 365 license expires in 24 hours
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 12 }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%', background: 'var(--bg-soft)',
                display: 'grid', placeItems: 'center', fontSize: 12, color: 'var(--fg-muted)',
              }}>MB</div>
              <div style={{ fontSize: 12.5 }}>
                <div>
                  <strong>Microsoft Billing</strong>{' '}
                  &lt;<Highlight tag="lookalike domain" on={flagged}>billing@micros0ft-secure.com</Highlight>&gt;
                </div>
                <div style={{ color: 'var(--fg-muted)' }}>to: m.berzins@acme.lv · 09:23</div>
              </div>
            </div>
          </div>
          <div style={{ padding: '24px 28px', fontSize: 14, lineHeight: 1.65, color: 'var(--fg)', maxWidth: 640 }}>
            <p style={{ margin: 0 }}>Dear customer,</p>
            <p>
              We have detected{' '}
              <Highlight tag="urgency" on={flagged}>unusual activity</Highlight>{' '}
              on your Microsoft 365 account. To avoid permanent suspension, please{' '}
              <Highlight tag="credential harvest" on={flagged}>verify your credentials</Highlight>{' '}
              by clicking the secure portal link below{' '}
              <Highlight tag="urgency" on={flagged}>within 24 hours</Highlight>.
            </p>
            <p style={{ marginTop: 22 }}>
              <span style={{
                display: 'inline-block', padding: '10px 18px', borderRadius: 6,
                background: flagged ? 'var(--bg-soft)' : '#0a66c2',
                color: flagged ? 'var(--fg-faint)' : 'white',
                textDecoration: flagged ? 'line-through' : 'none',
                fontSize: 13, fontWeight: 500,
              }}>
                Verify my account →
              </span>
            </p>
            <p style={{ color: 'var(--fg-muted)', fontSize: 12.5, marginTop: 28 }}>
              Microsoft Corporation · One Microsoft Way · Redmond, WA
            </p>
          </div>

          {scanning && (
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              background: 'linear-gradient(180deg, transparent 0%, color-mix(in srgb, var(--accent) 12%, transparent) 50%, transparent 100%)',
              backgroundSize: '100% 200px', backgroundRepeat: 'no-repeat',
              animation: 'fh-scan 1.6s ease-in-out infinite',
            }} />
          )}
        </div>
      )}

      {verdict && (
        <div style={{ position: 'absolute', right: 24, top: 24, width: 300, animation: 'fh-flag .35s ease-out' }}>
          <div className="card" style={{ overflow: 'hidden', boxShadow: 'var(--shadow-pop)' }}>
            <div style={{
              padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              background: 'var(--danger-soft)', color: 'var(--danger)',
              fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.06em',
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Icon.Alert size={12} /> FISHPO · PHISHING DETECTED
              </span>
              <span>0.6s</span>
            </div>
            <div style={{ padding: 16 }}>
              <div style={{ fontSize: 24, fontWeight: 600 }}>Risk score 98</div>
              <div style={{ fontSize: 12.5, color: 'var(--fg-muted)', marginTop: 4 }}>
                Credential harvest · brand impersonation
              </div>
              <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 7, fontSize: 12 }}>
                {[
                  ['Sender',       'Lookalike of microsoft.com'],
                  ['Domain age',   'Registered 2 days ago'],
                  ['Urgency cues', '4 detected'],
                  ['Link target',  'micr0soft-login.ru'],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--fg-muted)' }}>
                    <span>{k}</span>
                    <span style={{ color: 'var(--fg)' }}>{v}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                <button className="btn btn-primary btn-sm" style={{ flex: 1 }}>Quarantine</button>
                <button className="btn btn-ghost btn-sm">Report</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {alerted && !quarantined && (
        <div style={{
          position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)',
          background: 'var(--fg)', color: 'var(--bg)',
          padding: '10px 18px', borderRadius: 999, fontSize: 12.5,
          boxShadow: 'var(--shadow-pop)', display: 'flex', alignItems: 'center', gap: 8,
          animation: 'fh-flag .3s ease-out', whiteSpace: 'nowrap',
        }}>
          <StatusDot tone="warn" /> Maris was warned · IT was notified
        </div>
      )}
      {quarantined && (
        <div style={{
          position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)',
          background: 'var(--accent)', color: 'var(--accent-fg)',
          padding: '10px 18px', borderRadius: 999, fontSize: 12.5,
          boxShadow: 'var(--shadow-pop)', display: 'flex', alignItems: 'center', gap: 8,
          whiteSpace: 'nowrap',
        }}>
          <Icon.Check size={14} /> Email quarantined · 0 clicks · 0 keystrokes leaked
        </div>
      )}
    </div>
  )
}
