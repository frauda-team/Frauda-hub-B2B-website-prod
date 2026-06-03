import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import HubPage from './pages/HubPage'
import FishpoPage from './pages/FishpoPage'
import DatcoPage from './pages/DatcoPage'
import AboutPage from './pages/AboutPage'

export default function App() {
  const [theme, setTheme] = React.useState('light')

  React.useEffect(() => { document.body.dataset.theme = theme }, [theme])

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')
  const props = { theme, onToggleTheme: toggleTheme }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"       element={<Navigate to="/hub" replace />} />
        <Route path="/hub"    element={<HubPage    {...props} />} />
        <Route path="/fishpo" element={<FishpoPage {...props} />} />
        <Route path="/datco"  element={<DatcoPage  {...props} />} />
        <Route path="/about"  element={<AboutPage  {...props} />} />
      </Routes>
    </BrowserRouter>
  )
}
