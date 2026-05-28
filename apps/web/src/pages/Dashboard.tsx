import { useEffect, useState } from 'react'

const API = 'https://sectorsenseapi-production.up.railway.app'

interface Snapshot {
  id: number
  arrivals: number
  departures: number
  totalAircraft: number
  trafficScore: number
  timestamp: string
}

interface Airport {
  id: number
  icao: string
  TrafficSnapshot: Snapshot[]
}

interface Summary {
  totalSnapshots: number
  latestTimestamp: string
}

export default function Dashboard({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [summary, setSummary] = useState<Summary | null>(null)
  const [topAirports, setTopAirports] = useState<Airport[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [searchResult, setSearchResult] = useState<Airport | null>(null)
  const [searchLoading, setSearchLoading] = useState(false)
  const [searchError, setSearchError] = useState('')

  useEffect(() => {
    Promise.all([
      fetch(`${API}/analytics/summary`).then(r => r.json()),
      fetch(`${API}/analytics/top-airports`).then(r => r.json()),
    ]).then(([s, t]) => {
      setSummary(s)
      setTopAirports(t)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    if (search.length < 4) {
      setSearchResult(null)
      setSearchError('')
      return
    }

    const inTop = topAirports.some(a => a.icao === search)
    if (inTop) {
      setSearchResult(null)
      return
    }

    setSearchLoading(true)
    setSearchError('')

    fetch(`${API}/airport/${search}`)
      .then(r => r.json())
      .then(data => {
        if (data.error) {
          setSearchError('AIRPORT NOT FOUND')
          setSearchResult(null)
        } else {
          setSearchResult(data)
        }
        setSearchLoading(false)
      })
      .catch(() => {
        setSearchError('AIRPORT NOT FOUND')
        setSearchLoading(false)
      })
  }, [search, topAirports])

  const filtered = search.length > 0
    ? topAirports.filter(a => a.icao.toLowerCase().includes(search.toLowerCase()))
    : topAirports

  function trafficLevel(score: number) {
    if (score >= 150) return { label: 'EXTREME', color: '#ff4d4d' }
    if (score >= 80) return { label: 'HIGH', color: '#ff9500' }
    if (score >= 30) return { label: 'MEDIUM', color: '#3b9eff' }
    return { label: 'LOW', color: '#4dff91' }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0d0f1a',
      color: '#e0e6f0',
      fontFamily: "'DM Mono', 'Courier New', monospace",
    }}>
      {/* Header */}
      <div style={{
        borderBottom: '1px solid rgba(59,158,255,0.2)',
        padding: '16px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(13,15,26,0.95)',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 36, height: 36,
            background: 'linear-gradient(135deg, #1a6fff, #0a3fa0)',
            borderRadius: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18,
            boxShadow: '0 0 12px rgba(59,158,255,0.4)',
          }}>✈</div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: 2 }}>SECTORSENSE</div>
            <div style={{ fontSize: 10, color: '#4a7aaa', letterSpacing: 3 }}>VATSIM TRAFFIC ANALYTICS</div>
          </div>
        </div>
        <div style={{ fontSize: 11, color: '#4a7aaa', letterSpacing: 1 }}>
          {summary?.latestTimestamp
            ? `LAST UPDATE: ${new Date(summary.latestTimestamp).toUTCString().toUpperCase()}`
            : 'LOADING...'}
        </div>
      </div>

      <div style={{ padding: '32px', maxWidth: 1400, margin: '0 auto' }}>

        {/* Summary + Buttons */}
        {summary && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: 16,
            marginBottom: 32,
          }}>
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(59,158,255,0.2)',
              borderRadius: 10,
              padding: '20px 24px',
              boxShadow: '0 0 12px rgba(59,158,255,0.05)',
            }}>
              <div style={{ fontSize: 10, color: '#4a7aaa', letterSpacing: 2, marginBottom: 8 }}>SNAPSHOTS COLLECTED</div>
              <div style={{ fontSize: 28, fontWeight: 700, color: '#3b9eff' }}>{summary.totalSnapshots.toLocaleString()}</div>
            </div>

            {[
              { label: 'CONTROLLER DASHBOARD'},
              { label: 'PILOT DASHBOARD' },
            ].map(btn => (
              <button key={btn.label} 
                onClick={() => onNavigate(btn.label === 'CONTROLLER DASHBOARD' ? 'controller' : 'pilot')}
                style={{
                background: 'rgba(59,158,255,0.08)',
                border: '1px solid rgba(59,158,255,0.3)',
                borderRadius: 10,
                padding: '20px 24px',
                color: '#3b9eff',
                fontSize: 12,
                letterSpacing: 2,
                cursor: 'pointer',
                transition: 'all 0.2s',
                textAlign: 'left',
                width: '100%',
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(59,158,255,0.18)'
                  e.currentTarget.style.boxShadow = '0 0 12px rgba(59,158,255,0.3)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(59,158,255,0.08)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                {btn.label}
              </button>
            ))}
          </div>
        )}

        {/* Top Airports Table */}
        <div style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(59,158,255,0.2)',
          borderRadius: 12,
          overflow: 'hidden',
          boxShadow: '0 0 24px rgba(59,158,255,0.05)',
        }}>
          <div style={{
            padding: '20px 24px',
            borderBottom: '1px solid rgba(59,158,255,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12,
          }}>
            <div style={{ fontSize: 12, letterSpacing: 3, color: '#a0b8d0' }}>TOP AIRPORTS BY TRAFFIC</div>
            <input
              placeholder="SEARCH ICAO..."
              value={search}
              onChange={e => setSearch(e.target.value.toUpperCase())}
              style={{
                background: 'rgba(59,158,255,0.05)',
                border: '1px solid rgba(59,158,255,0.25)',
                borderRadius: 6,
                padding: '8px 14px',
                color: '#e0e6f0',
                fontSize: 12,
                letterSpacing: 2,
                outline: 'none',
                width: 180,
              }}
            />
          </div>

          {/* Table Header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '60px 1fr 100px 100px 100px 120px 100px',
            padding: '10px 24px',
            fontSize: 10,
            letterSpacing: 2,
            color: '#4a7aaa',
            borderBottom: '1px solid rgba(59,158,255,0.1)',
          }}>
            <span>#</span>
            <span>ICAO</span>
            <span>ARRIVALS</span>
            <span>DEPARTURES</span>
            <span>AIRCRAFT</span>
            <span>SCORE</span>
            <span>LEVEL</span>
          </div>

          {/* Table Rows */}
          {loading ? (
            <div style={{ padding: 40, textAlign: 'center', color: '#4a7aaa', letterSpacing: 2, fontSize: 12 }}>
              LOADING DATA...
            </div>
          ) : (
            <>
              {searchLoading && (
                <div style={{ padding: '14px 24px', fontSize: 12, color: '#4a7aaa', letterSpacing: 2 }}>
                  SEARCHING...
                </div>
              )}

              {searchError && (
                <div style={{ padding: '14px 24px', fontSize: 12, color: '#4a7aaa', letterSpacing: 2 }}>
                  {searchError}
                </div>
              )}

              {searchResult && searchResult.TrafficSnapshot[0] && (() => {
                const snap = searchResult.TrafficSnapshot[0]
                const level = trafficLevel(snap.trafficScore)
                return (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '60px 1fr 100px 100px 100px 120px 100px',
                    padding: '14px 24px',
                    borderBottom: '1px solid rgba(59,158,255,0.15)',
                    fontSize: 13,
                    background: 'rgba(59,158,255,0.08)',
                  }}>
                    <span style={{ color: '#4a7aaa', fontSize: 11 }}>—</span>
                    <span style={{ fontWeight: 700, letterSpacing: 2, color: '#ffffff' }}>{searchResult.icao}</span>
                    <span style={{ color: '#4dff91' }}>{snap.arrivals}</span>
                    <span style={{ color: '#ff9500' }}>{snap.departures}</span>
                    <span>{snap.totalAircraft}</span>
                    <span style={{ color: '#3b9eff', fontWeight: 700 }}>{snap.trafficScore}</span>
                    <span style={{ color: level.color, fontSize: 10, letterSpacing: 1, fontWeight: 700 }}>{level.label}</span>
                  </div>
                )
              })()}

              {filtered.map((airport, i) => {
                const snap = airport.TrafficSnapshot[0]
                if (!snap) return null
                const level = trafficLevel(snap.trafficScore)
                return (
                  <div key={airport.id} style={{
                    display: 'grid',
                    gridTemplateColumns: '60px 1fr 100px 100px 100px 120px 100px',
                    padding: '14px 24px',
                    borderBottom: '1px solid rgba(59,158,255,0.07)',
                    fontSize: 13,
                    transition: 'background 0.15s',
                    cursor: 'default',
                  }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(59,158,255,0.05)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <span style={{ color: '#4a7aaa', fontSize: 11 }}>{i + 1}</span>
                    <span style={{ fontWeight: 700, letterSpacing: 2, color: '#ffffff' }}>{airport.icao}</span>
                    <span style={{ color: '#4dff91' }}>{snap.arrivals}</span>
                    <span style={{ color: '#ff9500' }}>{snap.departures}</span>
                    <span>{snap.totalAircraft}</span>
                    <span style={{ color: '#3b9eff', fontWeight: 700 }}>{snap.trafficScore}</span>
                    <span style={{ color: level.color, fontSize: 10, letterSpacing: 1, fontWeight: 700 }}>{level.label}</span>
                  </div>
                )
              })}
            </>
          )}
        </div>
      </div>
    </div>
  )
}   