import { useState } from 'react'
import { Analytics } from '@vercel/analytics/react'
import Dashboard from './pages/Dashboard.tsx'
import ControllerDashboard from './pages/ControllerDashboard.tsx'
import PilotDashboard from './pages/PilotDashboard.tsx'
import About from './pages/About.tsx'
import WelcomeModal from './components/WelcomeModal.tsx'

export default function App() {
  const [page, setPage] = useState('home')

  return (
    <>
      <WelcomeModal />
      {page === 'controller' && <ControllerDashboard onBack={() => setPage('home')} />}
      {page === 'pilot' && <PilotDashboard onBack={() => setPage('home')} />}
      {page === 'about' && <About onBack={() => setPage('home')} />}
      {page === 'home' && <Dashboard onNavigate={setPage} />}
      <Analytics />
    </>
  )
}