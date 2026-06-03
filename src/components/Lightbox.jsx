import React from 'react'
import { createPortal } from 'react-dom'
import { Icon } from './Brand'

export default function Lightbox({ photos, initialIndex = 0, onClose }) {
  const [index, setIndex] = React.useState(initialIndex)
  const [loaded, setLoaded] = React.useState(false)
  const [imgError, setImgError] = React.useState(false)
  const touchStartX = React.useRef(null)

  const total = photos.length
  const src = photos[index]

  const prev = () => { setLoaded(false); setImgError(false); setIndex(i => (i - 1 + total) % total) }
  const next = () => { setLoaded(false); setImgError(false); setIndex(i => (i + 1) % total) }

  React.useEffect(() => {
    setLoaded(false)
    setImgError(false)
  }, [index])

  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft')  prev()
      if (e.key === 'ArrowRight') next()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, total])

  function onTouchStart(e) { touchStartX.current = e.touches[0].clientX }
  function onTouchEnd(e) {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (dx > 50) prev()
    else if (dx < -50) next()
    touchStartX.current = null
  }

  return createPortal(
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9500,
        background: 'rgba(0,0,0,0.88)',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        animation: 'fh-fadein .2s ease-out',
      }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Prev / Next click zones */}
      {total > 1 && (
        <>
          <button
            onClick={e => { e.stopPropagation(); prev() }}
            aria-label="Previous photo"
            style={{
              position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)',
              width: 48, height: 48, borderRadius: '50%',
              background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)',
              color: '#fff', cursor: 'pointer', display: 'grid', placeItems: 'center',
              transition: 'background .15s', zIndex: 1,
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.22)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
          >
            <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={e => { e.stopPropagation(); next() }}
            aria-label="Next photo"
            style={{
              position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)',
              width: 48, height: 48, borderRadius: '50%',
              background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)',
              color: '#fff', cursor: 'pointer', display: 'grid', placeItems: 'center',
              transition: 'background .15s', zIndex: 1,
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.22)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
          >
            <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </>
      )}

      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="Close lightbox"
        style={{
          position: 'absolute', top: 16, right: 16,
          width: 44, height: 44, borderRadius: '50%',
          background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)',
          color: '#fff', cursor: 'pointer', display: 'grid', placeItems: 'center',
          transition: 'background .15s', zIndex: 1,
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.22)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
      >
        <Icon.X size={16} />
      </button>

      {/* Counter */}
      {total > 1 && (
        <div style={{
          position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)',
          color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: 500,
          background: 'rgba(0,0,0,0.4)', padding: '6px 14px', borderRadius: 999,
          pointerEvents: 'none',
        }}>
          {index + 1} / {total}
        </div>
      )}

      {/* Image or placeholder */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: 'min(90vw, 1000px)',
          maxHeight: 'calc(100vh - 120px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative',
        }}
      >
        {imgError ? (
          <div style={{
            width: 480, maxWidth: '80vw', height: 320, maxHeight: '60vh',
            background: 'rgba(255,255,255,0.06)', borderRadius: 'var(--r-lg)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: 12, color: 'rgba(255,255,255,0.5)', fontSize: 14,
          }}>
            <svg viewBox="0 0 24 24" width={32} height={32} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <path d="M21 15l-5-5L5 21"/>
            </svg>
            Photo coming soon
          </div>
        ) : (
          <img
            src={`/photos/timeline/${src}`}
            alt=""
            onLoad={() => setLoaded(true)}
            onError={() => setImgError(true)}
            style={{
              maxWidth: '100%', maxHeight: 'calc(100vh - 120px)',
              objectFit: 'contain', borderRadius: 'var(--r-md)',
              opacity: loaded ? 1 : 0,
              transition: 'opacity 0.25s ease',
              display: 'block',
            }}
          />
        )}
      </div>
    </div>,
    document.body
  )
}
