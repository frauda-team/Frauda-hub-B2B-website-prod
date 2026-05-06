import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import HubPage from './pages/HubPage'
import FishpoPage from './pages/FishpoPage'
import DatcoPage from './pages/DatcoPage'

export default function App() {
  const [theme, setTheme] = React.useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark' : 'light'
  )

  React.useEffect(() => { document.body.dataset.theme = theme }, [theme])

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')
  const props = { theme, onToggleTheme: toggleTheme }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"       element={<HubPage    {...props} />} />
        <Route path="/hub"    element={<Navigate to="/" replace />} />
        <Route path="/fishpo" element={<FishpoPage {...props} />} />
        <Route path="/datco"  element={<DatcoPage  {...props} />} />
      </Routes>
    </BrowserRouter>
  )
}
