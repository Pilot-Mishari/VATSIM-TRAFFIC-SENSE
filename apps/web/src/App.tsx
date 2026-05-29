import { useState } from 'react'
import Dashboard from './pages/Dashboard.tsx'
import ControllerDashboard from './pages/ControllerDashboard.tsx'
import PilotDashboard from './pages/PilotDashboard.tsx'

export default function App() {
  const [page, setPage] = useState('home')

  return (
    <>
      {page === 'controller' && <ControllerDashboard onBack={() => setPage('home')} />}
      {page === 'pilot' && <PilotDashboard onBack={() => setPage('home')} />}
      {page === 'home' && <Dashboard onNavigate={setPage} />}
    </>
  )
}