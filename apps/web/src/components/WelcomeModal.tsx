import { useState, useEffect } from 'react'

export default function WelcomeModal() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const seen = localStorage.getItem('sectorsense_welcome')
    if (!seen) setVisible(true)
  }, [])

  function dismiss() {
    localStorage.setItem('sectorsense_welcome', 'true')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(4px)',
    }}>
      <div style={{
        background: '#0d0f1a',
        border: '1px solid rgba(59,158,255,0.3)',
        borderRadius: 12,
        padding: '40px 48px',
        maxWidth: 560,
        width: '90%',
        boxShadow: '0 0 40px rgba(59,158,255,0.15)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <div style={{
            width: 36, height: 36,
            background: 'linear-gradient(135deg, #1a6fff, #0a3fa0)',
            borderRadius: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18,
            boxShadow: '0 0 12px rgba(59,158,255,0.4)',
          }}>✈</div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: 2 }}>WELCOME TO SECTORSENSE</div>
            <div style={{ fontSize: 10, color: '#4a7aaa', letterSpacing: 3 }}>VATSIM TRAFFIC ANALYTICS</div>
          </div>
        </div>

        <div style={{ fontSize: 12, color: '#a0b8d0', lineHeight: 2, marginBottom: 32 }}>
          <div style={{ marginBottom: 16, color: '#e0e6f0', letterSpacing: 1 }}>HOW TO USE SECTORSENSE</div>
          
          <div style={{ marginBottom: 12 }}>
            <span style={{ color: '#3b9eff' }}>MAIN DASHBOARD</span>
            <span style={{ color: '#4a7aaa' }}> — </span>
            View top airports by live traffic score. Search any ICAO code to find specific airports.
          </div>

          <div style={{ marginBottom: 12 }}>
            <span style={{ color: '#3b9eff' }}>CONTROLLER DASHBOARD</span>
            <span style={{ color: '#4a7aaa' }}> — </span>
            Enter an airport ICAO to see current traffic, workload level, staffing recommendations, and historical trends.
          </div>

          <div style={{ marginBottom: 12 }}>
            <span style={{ color: '#3b9eff' }}>PILOT DASHBOARD</span>
            <span style={{ color: '#4a7aaa' }}> — </span>
            View busiest airports, live events, ATC coverage, and search specific destinations for traffic insights.
          </div>

          <div style={{ marginBottom: 0, fontSize: 10, color: '#4a7aaa', marginTop: 16 }}>
            DATA IS COLLECTED FROM VATSIM EVERY 10 MINUTES. PREDICTIONS IMPROVE AS MORE HISTORICAL DATA IS COLLECTED.
          </div>
        </div>

        <button
          onClick={dismiss}
          style={{
            background: 'rgba(59,158,255,0.15)',
            border: '1px solid rgba(59,158,255,0.4)',
            borderRadius: 8,
            padding: '12px 32px',
            color: '#3b9eff',
            fontSize: 12,
            letterSpacing: 2,
            cursor: 'pointer',
            width: '100%',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(59,158,255,0.25)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(59,158,255,0.15)'}
        >
          GET STARTED
        </button>
      </div>
    </div>
  )
}