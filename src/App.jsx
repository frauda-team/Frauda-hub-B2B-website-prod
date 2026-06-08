import React from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'

function ScrollToTop() {
  const { pathname } = useLocation()
  React.useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}
import HubPage from './pages/HubPage'
import FishpoPage from './pages/FishpoPage'
import DatcoPage from './pages/DatcoPage'

export default function App() {
  const [theme, setTheme] = React.useState('light')

  React.useEffect(() => { document.body.dataset.theme = theme }, [theme])

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')
  const props = { theme, onToggleTheme: toggleTheme }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/"       element={<Navigate to="/hub" replace />} />
        <Route path="/hub"    element={<HubPage    {...props} />} />
        <Route path="/fishpo" element={<FishpoPage {...props} />} />
        <Route path="/datco"  element={<DatcoPage  {...props} />} />
      </Routes>
    </BrowserRouter>
  )
}
