import React from 'react'
import Landing from './components/Landing'
import FishpoDemo from './components/FishpoDemo'
import Dashboard from './components/Dashboard'
import { Icon } from './components/Brand'

export default function App() {
  const [theme, setTheme] = React.useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
    return 'light'
  })
  const [modal, setModal] = React.useState(null) // 'demo' | 'dashboard' | null

  React.useEffect(() => {
    document.body.dataset.theme = theme
  }, [theme])

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

  return (
    <>
      <Landing
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenDemo={() => setModal('demo')}
        onOpenDashboard={() => setModal('dashboard')}
      />
      {modal && (
        <Modal
          title={modal === 'demo' ? 'Fishpo — email scam detection demo' : 'Fishpo admin console'}
          onClose={() => setModal(null)}
        >
          {modal === 'demo'      && <FishpoDemo />}
          {modal === 'dashboard' && <Dashboard />}
        </Modal>
      )}
    </>
  )
}

function Modal({ title, children, onClose }) {
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(7,16,31,0.72)',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: 24,
        animation: 'fh-fadein .2s ease-out',
      }}
    >
      {/* header bar */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: 1100, display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', marginBottom: 12,
          color: 'rgba(255,255,255,0.85)', fontFamily: 'var(--font-sans)',
        }}
      >
        <span style={{ fontSize: 13, fontWeight: 500, letterSpacing: '0.01em' }}>{title}</span>
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            width: 32, height: 32, borderRadius: 8, border: 'none',
            background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.8)',
            display: 'grid', placeItems: 'center', cursor: 'pointer',
            transition: 'background .12s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.16)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
        >
          <Icon.X size={14} />
        </button>
      </div>

      {/* content */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: 1100,
          height: 'min(680px, calc(100vh - 120px))',
          borderRadius: 12, overflow: 'hidden',
          boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
        }}
      >
        {children}
      </div>

      <div style={{ marginTop: 12, fontSize: 12, color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-sans)' }}>
        Press <kbd style={{ fontFamily: 'var(--font-mono)', background: 'rgba(255,255,255,0.08)', padding: '1px 5px', borderRadius: 4 }}>Esc</kbd> to close
      </div>
    </div>
  )
}
