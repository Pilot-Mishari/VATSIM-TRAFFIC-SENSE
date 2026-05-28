import { useState } from 'react'
import Dashboard from './pages/Dashboard.tsx'
import ControllerDashboard from './pages/ControllerDashboard.tsx'
import PilotDashboard from './pages/PilotDashboard.tsx'

export default function App() {
  const [page, setPage] = useState('home')

  if (page === 'controller') return <ControllerDashboard onBack={() => setPage('home')} />
  if (page === 'pilot') return <PilotDashboard onBack={() => setPage('home')} />
  return <Dashboard onNavigate={setPage} />
}