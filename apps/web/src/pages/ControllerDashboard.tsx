import { useEffect, useState } from 'react'

const API = 'https://sectorsenseapi-production.up.railway.app'
const [liveControllers, setLiveControllers] = useState<any[]>([])

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

export default function ControllerDashboard({ onBack }: { onBack: () => void }) {
  const [icaoInput, setIcaoInput] = useState('')
  const [icao, setIcao] = useState('')
  const [airport, setAirport] = useState<Airport | null>(null)
  const [todaySnapshots, setTodaySnapshots] = useState<Snapshot[]>([])
  const [trendSnapshots, setTrendSnapshots] = useState<Snapshot[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function handleSearch() {
    if (icaoInput.length !== 4) return
    setIcao(icaoInput.toUpperCase())
  }

  useEffect(() => {
    if (!icao) return
    setLoading(true)
    setError('')

    Promise.all([
      fetch(`${API}/airport/${icao}`).then(r => r.json()),
      fetch(`${API}/analytics/today/${icao}`).then(r => r.json()),
      fetch(`${API}/analytics/trend/${icao}`).then(r => r.json()),
      fetch(`${API}/controllers/live/${icao}`).then(r => r.json()),
    ]).then(([a, today, trend, ctrl]) => {
      if (a.error) {
        setError('AIRPORT NOT FOUND')
        setAirport(null)
      } else {
        setAirport(a)
        setTodaySnapshots(Array.isArray(today) ? today : [])
        setTrendSnapshots(Array.isArray(trend) ? trend : [])
      }
      // Fetch live controllers
      setLiveControllers(Array.isArray(ctrl) ? ctrl : [])
      setLoading(false)
    }).catch(() => {
      setError('FAILED TO LOAD DATA')
      setLoading(false)
    })
  }, [icao])

  function trafficLevel(score: number) {
    if (score >= 150) return { label: 'VERY HIGH', color: '#ff4d4d' }
    if (score >= 80) return { label: 'HIGH', color: '#ff9500' }
    if (score >= 30) return { label: 'MEDIUM', color: '#3b9eff' }
    return { label: 'LOW', color: '#4dff91' }
  }

  function staffingRecommendation(score: number) {
    if (score >= 150) return 'DEL + GND + TWR + APP + CTR'
    if (score >= 80) return 'GND + TWR + APP'
    if (score >= 30) return 'TWR + APP'
    return 'TWR'
  }

  function predictNextHours(snapshots: Snapshot[]) {
    if (snapshots.length < 2) return null
    const recent = snapshots.slice(-4)
    const avg = recent.reduce((s, x) => s + x.trafficScore, 0) / recent.length
    const oldest = recent[0].trafficScore
    const newest = recent[recent.length - 1].trafficScore
    const trend = newest - oldest
    return {
      predicted: Math.max(0, Math.round(avg + trend)),
      direction: trend > 5 ? 'INCREASING' : trend < -5 ? 'DECREASING' : 'STABLE',
      color: trend > 5 ? '#ff9500' : trend < -5 ? '#4dff91' : '#3b9eff',
    }
  }

  function busiestHourToday(snapshots: Snapshot[]) {
    if (snapshots.length === 0) return null
    const best = snapshots.reduce((a, b) => a.trafficScore > b.trafficScore ? a : b)
    return {
      time: new Date(best.timestamp).toUTCString().slice(17, 22) + 'Z',
      score: best.trafficScore,
    }
  }

  function suggestedHighTrafficTime(snapshots: Snapshot[]) {
    if (snapshots.length < 3) return 'INSUFFICIENT DATA'
    const future = snapshots.slice(-6)
    const peak = future.reduce((a, b) => a.trafficScore > b.trafficScore ? a : b)
    const time = new Date(peak.timestamp)
    time.setHours(time.getHours() + 3)
    return time.toUTCString().slice(17, 22) + 'Z'
  }

  const currentSnap = airport?.TrafficSnapshot[0]
  const currentLevel = currentSnap ? trafficLevel(currentSnap.trafficScore) : null
  const prediction = predictNextHours(trendSnapshots)
  const busiest = busiestHourToday(todaySnapshots)
  const suggestedTime = suggestedHighTrafficTime(trendSnapshots)

  const styles = {
    page: {
      minHeight: '100vh',
      background: '#0d0f1a',
      color: '#e0e6f0',
      fontFamily: "'DM Mono', 'Courier New', monospace",
    } as React.CSSProperties,
    header: {
      borderBottom: '1px solid rgba(59,158,255,0.2)',
      padding: '16px 32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: 'rgba(13,15,26,0.95)',
      position: 'sticky' as const,
      top: 0,
      zIndex: 10,
    },
    card: {
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(59,158,255,0.2)',
      borderRadius: 10,
      padding: '20px 24px',
      boxShadow: '0 0 12px rgba(59,158,255,0.05)',
    },
    label: {
      fontSize: 10,
      color: '#4a7aaa',
      letterSpacing: 2,
      marginBottom: 8,
    } as React.CSSProperties,
    value: {
      fontSize: 24,
      fontWeight: 700,
      color: '#ffffff',
    } as React.CSSProperties,
  }

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
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
            <div style={{ fontSize: 10, color: '#4a7aaa', letterSpacing: 3 }}>CONTROLLER DASHBOARD</div>
          </div>
        </div>
        <button
  onClick={onBack}
  style={{
    fontSize: 11,
    color: '#4a7aaa',
    letterSpacing: 2,
    textDecoration: 'none',
    border: '1px solid rgba(59,158,255,0.2)',
    padding: '6px 14px',
    borderRadius: 6,
    background: 'transparent',
    cursor: 'pointer',
  }}
>← BACK</button>
      </div>

      {/* Search Prompt */}
      {!icao && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 'calc(100vh - 70px)',
          gap: 24,
        }}>
          <div style={{ fontSize: 13, letterSpacing: 3, color: '#4a7aaa' }}>ENTER AIRPORT ICAO CODE</div>
          <div style={{ display: 'flex', gap: 12 }}>
            <input
              placeholder="OERK"
              maxLength={4}
              value={icaoInput}
              onChange={e => setIcaoInput(e.target.value.toUpperCase())}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
              style={{
                background: 'rgba(59,158,255,0.05)',
                border: '1px solid rgba(59,158,255,0.3)',
                borderRadius: 8,
                padding: '14px 20px',
                color: '#ffffff',
                fontSize: 20,
                letterSpacing: 6,
                outline: 'none',
                width: 160,
                textAlign: 'center',
                boxShadow: '0 0 16px rgba(59,158,255,0.1)',
              }}
            />
            <button
              onClick={handleSearch}
              style={{
                background: 'rgba(59,158,255,0.15)',
                border: '1px solid rgba(59,158,255,0.4)',
                borderRadius: 8,
                padding: '14px 24px',
                color: '#3b9eff',
                fontSize: 12,
                letterSpacing: 2,
                cursor: 'pointer',
              }}
            >
              LOAD
            </button>
          </div>
        </div>
      )}

      {/* Data */}
      {icao && (
        <div style={{ padding: '32px', maxWidth: 1200, margin: '0 auto' }}>

          {/* Airport Title + Reset */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
            <div>
              <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: 4, color: '#ffffff' }}>{icao}</div>
              <div style={{ fontSize: 11, color: '#4a7aaa', letterSpacing: 2, marginTop: 4 }}>CONTROLLER OVERVIEW</div>
            </div>
            <button
              onClick={() => { setIcao(''); setIcaoInput(''); setAirport(null) }}
              style={{
                background: 'transparent',
                border: '1px solid rgba(59,158,255,0.2)',
                borderRadius: 6,
                padding: '8px 16px',
                color: '#4a7aaa',
                fontSize: 11,
                letterSpacing: 2,
                cursor: 'pointer',
              }}
            >
              CHANGE AIRPORT
            </button>
          </div>

          {loading && (
            <div style={{ textAlign: 'center', color: '#4a7aaa', letterSpacing: 2, fontSize: 12, padding: 40 }}>
              LOADING DATA...
            </div>
          )}

          {error && (
            <div style={{ textAlign: 'center', color: '#ff4d4d', letterSpacing: 2, fontSize: 12, padding: 40 }}>
              {error}
            </div>
          )}

          {!loading && !error && currentSnap && (
            <>
              {/* Top Row - Key Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 16 }}>

                {/* Current Traffic */}
                <div style={styles.card}>
                  <div style={styles.label}>CURRENT TRAFFIC</div>
                  <div style={{ fontSize: 36, fontWeight: 700, color: '#ffffff' }}>{currentSnap.totalAircraft}</div>
                  <div style={{ fontSize: 11, color: '#4a7aaa', marginTop: 4 }}>
                    ARR {currentSnap.arrivals} · DEP {currentSnap.departures}
                  </div>
                </div>

                {/* Traffic Score */}
                <div style={styles.card}>
                  <div style={styles.label}>TRAFFIC SCORE</div>
                  <div style={{ fontSize: 36, fontWeight: 700, color: '#3b9eff' }}>{currentSnap.trafficScore}</div>
                  <div style={{ fontSize: 11, color: '#4a7aaa', marginTop: 4 }}>WORKLOAD INDEX</div>
                </div>

                {/* Traffic Level */}
                <div style={{ ...styles.card, borderColor: `${currentLevel?.color}44` }}>
                  <div style={styles.label}>TRAFFIC LEVEL</div>
                  <div style={{ fontSize: 28, fontWeight: 700, color: currentLevel?.color }}>{currentLevel?.label}</div>
                  <div style={{ fontSize: 11, color: '#4a7aaa', marginTop: 4 }}>CURRENT STATUS</div>
                </div>

                {/* Recommended Staffing */}
                <div style={styles.card}>
                    <div style={styles.label}>RECOMMENDED STAFFING</div>
                    <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {staffingRecommendation(currentSnap.trafficScore).split(' + ').map((position: string) => {
                        const isOnline = liveControllers.some((c: any) => 
                          c.callsign.endsWith(`_${position}`)
                        )
                        return (
                          <div key={position} style={{
                            fontSize: 12,
                            fontWeight: 700,
                            color: isOnline ? '#4dff91' : '#ff9500',
                            letterSpacing: 1,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                          }}>
                            <span style={{
                              width: 8, height: 8,
                              borderRadius: '50%',
                              background: isOnline ? '#4dff91' : '#ff9500',
                              display: 'inline-block',
                              boxShadow: isOnline ? '0 0 6px #4dff91' : 'none',
                            }} />
                            {position} {isOnline ? '— ONLINE' : '— OFFLINE'}
                          </div>
                        )
                      })}
                    </div>
                </div>
              </div>

              {/* Second Row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 16 }}>

                {/* 3 Hour Prediction */}
                <div style={styles.card}>
                  <div style={styles.label}>TRAFFIC IN NEXT 3 HOURS</div>
                  {prediction ? (
                    <>
                      <div style={{ fontSize: 28, fontWeight: 700, color: prediction.color }}>{prediction.predicted}</div>
                      <div style={{ fontSize: 11, color: prediction.color, marginTop: 4, letterSpacing: 1 }}>
                        TREND: {prediction.direction}
                      </div>
                    </>
                  ) : (
                    <div style={{ fontSize: 12, color: '#4a7aaa', marginTop: 8 }}>INSUFFICIENT DATA</div>
                  )}
                </div>

                {/* Busiest Hour Today */}
                <div style={styles.card}>
                  <div style={styles.label}>BUSIEST PERIOD TODAY</div>
                  {busiest ? (
                    <>
                      <div style={{ fontSize: 28, fontWeight: 700, color: '#ffffff' }}>{busiest.time}</div>
                      <div style={{ fontSize: 11, color: '#4a7aaa', marginTop: 4 }}>SCORE: {busiest.score}</div>
                    </>
                  ) : (
                    <div style={{ fontSize: 12, color: '#4a7aaa', marginTop: 8 }}>NO DATA FOR TODAY</div>
                  )}
                </div>

                {/* Suggested High Traffic Time */}
                <div style={styles.card}>
                  <div style={styles.label}>SUGGESTED OPEN TIME</div>
                  <div style={{ fontSize: 28, fontWeight: 700, color: '#4dff91' }}>{suggestedTime}</div>
                  <div style={{ fontSize: 11, color: '#4a7aaa', marginTop: 4 }}>BASED ON RECENT TREND</div>
                </div>
              </div>

              {/* Historical Trend */}
              <div style={{ ...styles.card, marginBottom: 0 }}>
                <div style={styles.label}>HISTORICAL TREND — LAST 48 SNAPSHOTS</div>
                {trendSnapshots.length > 0 ? (
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 80, marginTop: 16 }}>
                    {trendSnapshots.map((s, i) => {
                      const max = Math.max(...trendSnapshots.map(x => x.trafficScore), 1)
                      const height = Math.max(4, (s.trafficScore / max) * 80)
                      const level = trafficLevel(s.trafficScore)
                      return (
                        <div
                          key={i}
                          title={`${new Date(s.timestamp).toUTCString().slice(17, 22)}Z — Score: ${s.trafficScore}`}
                          style={{
                            flex: 1,
                            height,
                            background: level.color,
                            borderRadius: 2,
                            opacity: 0.7,
                            cursor: 'default',
                            transition: 'opacity 0.1s',
                          }}
                          onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                          onMouseLeave={e => (e.currentTarget.style.opacity = '0.7')}
                        />
                      )
                    })}
                  </div>
                ) : (
                  <div style={{ fontSize: 12, color: '#4a7aaa', marginTop: 8 }}>INSUFFICIENT DATA</div>
                )}
              </div>
            </>
          )}

          {!loading && !error && !currentSnap && (
            <div style={{ textAlign: 'center', color: '#4a7aaa', letterSpacing: 2, fontSize: 12, padding: 40 }}>
              NO RECENT DATA FOR {icao}
            </div>
          )}
        </div>
      )}
    </div>
  )
}