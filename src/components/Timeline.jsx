import React from 'react'
import Lightbox from './Lightbox'

function CameraIcon() {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
      <circle cx="12" cy="13" r="4"/>
    </svg>
  )
}

function ExternalLinkIcon() {
  return (
    <svg viewBox="0 0 24 24" width={12} height={12} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 4 }}>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
    </svg>
  )
}

function TimelinePhoto({ filename, onClick }) {
  const [error, setError] = React.useState(false)

  if (error) {
    return (
      <div
        onClick={onClick}
        style={{
          width: 100, height: 72, borderRadius: 8,
          background: 'var(--bg-soft)', border: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--fg-faint)', cursor: onClick ? 'pointer' : 'default', flexShrink: 0,
        }}
      >
        <CameraIcon />
      </div>
    )
  }

  return (
    <img
      src={`/photos/timeline/${filename}`}
      alt=""
      onError={() => setError(true)}
      onClick={onClick}
      style={{
        width: 100, height: 72, objectFit: 'cover',
        borderRadius: 8, border: '1px solid var(--border)',
        cursor: onClick ? 'pointer' : 'default', flexShrink: 0,
        transition: 'opacity 0.15s',
        display: 'block',
      }}
      onMouseEnter={e => { if (onClick) e.currentTarget.style.opacity = '0.8' }}
      onMouseLeave={e => e.currentTarget.style.opacity = '1'}
    />
  )
}

function Popover({ event, onPhotoClick }) {
  return (
    <div style={{
      background: 'var(--bg-elev)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--r-md)',
      padding: '14px 16px',
      boxShadow: 'var(--shadow-pop)',
      width: 280,
      animation: 'fh-fadein 0.15s ease-out',
      pointerEvents: 'auto',
    }}>
      <p style={{ fontSize: 13, color: 'var(--fg-muted)', lineHeight: 1.55, margin: '0 0 12px' }}>
        {event.description}
      </p>
      {event.photos.length > 0 && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {event.photos.map((photo, i) => (
            <TimelinePhoto key={photo} filename={photo} onClick={() => onPhotoClick(i)} />
          ))}
        </div>
      )}
    </div>
  )
}

function TimelineEvent({ event, isMobile }) {
  const [expanded, setExpanded] = React.useState(false)
  const [hovered, setHovered] = React.useState(false)
  const [lightboxIndex, setLightboxIndex] = React.useState(null)

  const showDetail = isMobile ? expanded : hovered

  function formatDate(dateStr) {
    const d = new Date(dateStr + 'T00:00:00')
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  return (
    <>
      <div
        style={{ display: 'flex', gap: 20, position: 'relative', cursor: isMobile ? 'pointer' : 'default' }}
        onClick={isMobile ? () => setExpanded(o => !o) : undefined}
        onMouseEnter={!isMobile ? () => setHovered(true) : undefined}
        onMouseLeave={!isMobile ? () => setHovered(false) : undefined}
      >
        {/* Dot */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, width: 20 }}>
          <div style={{
            width: 14, height: 14, borderRadius: '50%', marginTop: 4,
            background: showDetail ? 'var(--accent)' : 'var(--border-strong)',
            border: `2px solid ${showDetail ? 'var(--accent)' : 'var(--border-strong)'}`,
            boxShadow: showDetail ? '0 0 0 4px var(--accent-soft)' : 'none',
            transition: 'background 0.15s, box-shadow 0.15s',
            flexShrink: 0,
          }} />
        </div>

        <div style={{ flex: 1, paddingBottom: 36, position: 'relative' }}>
          <div style={{ fontSize: 11, color: 'var(--fg-faint)', fontWeight: 600, letterSpacing: '0.06em', marginBottom: 4, textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
            {formatDate(event.date)}
          </div>
          <div style={{
            fontSize: 16, fontWeight: 600, color: showDetail ? 'var(--accent)' : 'var(--fg)',
            fontFamily: 'var(--font-display)', letterSpacing: '-0.01em', lineHeight: 1.3,
            transition: 'color 0.15s',
            display: 'inline',
          }}>
            {event.title}
          </div>
          {event.link && (
            <a href={event.link} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{ color: 'var(--fg-faint)' }}>
              <ExternalLinkIcon />
            </a>
          )}
          {isMobile && (
            <div style={{
              marginTop: 4, fontSize: 12, color: 'var(--fg-faint)',
              fontWeight: 500, transition: 'transform 0.15s',
              transform: expanded ? 'rotate(180deg)' : 'none',
              display: 'inline-block', marginLeft: 8,
            }}>▾</div>
          )}

          {/* Desktop popover — appears to the right */}
          {!isMobile && hovered && (
            <div style={{ position: 'absolute', left: 0, top: 0, zIndex: 100, pointerEvents: 'none' }}>
              <div style={{ position: 'absolute', left: 'calc(100% + 16px)', top: -8, pointerEvents: 'auto' }}>
                <Popover event={event} onPhotoClick={i => setLightboxIndex(i)} />
              </div>
            </div>
          )}

          {/* Mobile accordion */}
          {isMobile && expanded && (
            <div style={{ marginTop: 12 }}>
              <p style={{ fontSize: 14, color: 'var(--fg-muted)', lineHeight: 1.55, margin: '0 0 12px' }}>
                {event.description}
              </p>
              {event.photos.length > 0 && (
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {event.photos.map((photo, i) => (
                    <TimelinePhoto key={photo} filename={photo} onClick={() => setLightboxIndex(i)} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          photos={event.photos}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  )
}

export default function Timeline({ events }) {
  const [isMobile, setIsMobile] = React.useState(() => window.innerWidth <= 680)

  React.useEffect(() => {
    const mq = window.matchMedia('(max-width: 680px)')
    const handler = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return (
    <div style={{ position: 'relative', paddingLeft: 24 }}>
      {/* Vertical line */}
      <div style={{
        position: 'absolute', left: 29, top: 6, bottom: 6,
        width: 2, background: 'var(--border)',
        borderRadius: 2,
      }} />
      {events.map(event => (
        <TimelineEvent key={event.date + event.title} event={event} isMobile={isMobile} />
      ))}
    </div>
  )
}
