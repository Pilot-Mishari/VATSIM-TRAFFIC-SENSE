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

interface VatsimEvent {
  id: number
  name: string
  link: string
  organisers: { region: string; division: string; subdivision: string; organised_by_vatsim: boolean }[]
  airports: { icao: string }[]
  start_time: string
  end_time: string
  short_description: string
  type: string
}

export default function PilotDashboard({ onBack }: { onBack: () => void }) {
  const [liveControllers, setLiveControllers] = useState<any[]>([])
  const [topAirports, setTopAirports] = useState<Airport[]>([])
  const [events, setEvents] = useState<VatsimEvent[]>([])
  const [searchIcao, setSearchIcao] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [searchAirport, setSearchAirport] = useState<Airport | null>(null)
  const [searchTrend, setSearchTrend] = useState<Snapshot[]>([])
  const [searchToday, setSearchToday] = useState<Snapshot[]>([])
  const [searchLoading, setSearchLoading] = useState(false)
  const [searchError, setSearchError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch(`${API}/analytics/top-airports`).then(r => r.json()),
      fetch(`${API}/analytics/events`).then(r => r.json()),
    ]).then(([airports, evts]) => {
      setTopAirports(Array.isArray(airports) ? airports : [])
      setEvents(Array.isArray(evts) ? evts : [])
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (!searchIcao) return
    setSearchLoading(true)
    setSearchError('')

    Promise.all([
      fetch(`${API}/airport/${searchIcao}`).then(r => r.json()),
      fetch(`${API}/analytics/trend/${searchIcao}`).then(r => r.json()),
      fetch(`${API}/analytics/today/${searchIcao}`).then(r => r.json()),
      fetch(`${API}/controllers/live/${searchIcao}`).then(r => r.json()),
    ]).then(([a, trend, today, ctrl]) => {
      if (a.error) {
        setSearchError('AIRPORT NOT FOUND')
        setSearchAirport(null)
      } else {
        setSearchAirport(a)
        setSearchTrend(Array.isArray(trend) ? trend : [])
        setSearchToday(Array.isArray(today) ? today : [])
      }
      // Fetch live controllers
      setLiveControllers(Array.isArray(ctrl) ? ctrl : [])
      setSearchLoading(false)
    }).catch(() => {
      setSearchError('FAILED TO LOAD')
      setSearchLoading(false)
    })
    
  }, [searchIcao])

  function trafficLevel(score: number) {
    if (score >= 150) return { label: 'VERY HIGH', color: '#ff4d4d' }
    if (score >= 80) return { label: 'HIGH', color: '#ff9500' }
    if (score >= 30) return { label: 'MEDIUM', color: '#3b9eff' }
    return { label: 'LOW', color: '#4dff91' }
  }

  function predictedBusiest() {
    return [...topAirports]
      .filter(a => a.TrafficSnapshot[0])
      .sort((a, b) => {
        const aScore = a.TrafficSnapshot[0].arrivals * 3 + a.TrafficSnapshot[0].departures * 2
        const bScore = b.TrafficSnapshot[0].arrivals * 3 + b.TrafficSnapshot[0].departures * 2
        return bScore - aScore
      })
      .slice(0, 5)
  }

  function quietestTimeToday(snapshots: Snapshot[]) {
    if (!snapshots.length) return 'NO DATA'
    const best = [...snapshots].sort((a, b) => a.trafficScore - b.trafficScore)[0]
    return new Date(best.timestamp).toUTCString().slice(17, 22) + 'Z'
  }

  function peakTimeToday(snapshots: Snapshot[]) {
    if (!snapshots.length) return 'NO DATA'
    const peak = snapshots.reduce((a, b) => a.trafficScore > b.trafficScore ? a : b)
    return new Date(peak.timestamp).toUTCString().slice(17, 22) + 'Z'
  }

  function predictTrend(snapshots: Snapshot[]) {
    if (snapshots.length < 2) return null
    const recent = snapshots.slice(-4)
    const trend = recent[recent.length - 1].trafficScore - recent[0].trafficScore
    return {
      direction: trend > 5 ? 'INCREASING' : trend < -5 ? 'DECREASING' : 'STABLE',
      color: trend > 5 ? '#ff4d4d' : trend < -5 ? '#4dff91' : '#3b9eff',
    }
  }

  const now = new Date()
  const liveEvents = events.filter(e => new Date(e.start_time) <= now && new Date(e.end_time) >= now)
  const upcomingEvents = events.filter(e => new Date(e.start_time) > now).slice(0, 5)
  const predicted = predictedBusiest()
  const searchSnap = searchAirport?.TrafficSnapshot[0]
  const searchLevel = searchSnap ? trafficLevel(searchSnap.trafficScore) : null
  const searchTrendData = predictTrend(searchTrend)

  const card = {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(59,158,255,0.2)',
    borderRadius: 10,
    padding: '20px 24px',
    boxShadow: '0 0 12px rgba(59,158,255,0.05)',
  }

  const label = {
    fontSize: 10,
    color: '#4a7aaa',
    letterSpacing: 2,
    marginBottom: 12,
  } as React.CSSProperties

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
            <div style={{ fontSize: 10, color: '#4a7aaa', letterSpacing: 3 }}>PILOT DASHBOARD</div>
          </div>
        </div>
        <button onClick={onBack} style={{
          fontSize: 11, color: '#4a7aaa', letterSpacing: 2,
          border: '1px solid rgba(59,158,255,0.2)', padding: '6px 14px',
          borderRadius: 6, background: 'transparent', cursor: 'pointer',
        }}>← BACK</button>
      </div>

      <div style={{ padding: '32px', maxWidth: 1400, margin: '0 auto' }}>
        {loading ? (
          <div style={{ textAlign: 'center', color: '#4a7aaa', letterSpacing: 2, fontSize: 12, padding: 80 }}>
            LOADING DATA...
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24 }}>

            {/* Left Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

              {/* Top Busy Airports */}
              <div style={card}>
                <div style={label}>BUSIEST AIRPORTS RIGHT NOW</div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '40px 1fr 80px 80px 80px 100px',
                  fontSize: 10, letterSpacing: 2, color: '#4a7aaa',
                  paddingBottom: 10, borderBottom: '1px solid rgba(59,158,255,0.1)',
                  marginBottom: 8,
                }}>
                  <span>#</span><span>ICAO</span><span>ARR</span><span>DEP</span><span>SCORE</span><span>LEVEL</span>
                </div>
                {topAirports.slice(0, 10).map((a, i) => {
                  const snap = a.TrafficSnapshot[0]
                  if (!snap) return null
                  const level = trafficLevel(snap.trafficScore)
                  return (
                    <div key={a.id} style={{
                      display: 'grid',
                      gridTemplateColumns: '40px 1fr 80px 80px 80px 100px',
                      padding: '10px 0',
                      borderBottom: '1px solid rgba(59,158,255,0.06)',
                      fontSize: 13,
                      cursor: 'pointer',
                    }}
                      onClick={() => { setSearchInput(a.icao); setSearchIcao(a.icao) }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(59,158,255,0.05)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <span style={{ color: '#4a7aaa', fontSize: 11 }}>{i + 1}</span>
                      <span style={{ fontWeight: 700, letterSpacing: 2 }}>{a.icao}</span>
                      <span style={{ color: '#4dff91' }}>{snap.arrivals}</span>
                      <span style={{ color: '#ff9500' }}>{snap.departures}</span>
                      <span style={{ color: '#3b9eff' }}>{snap.trafficScore}</span>
                      <span style={{ color: level.color, fontSize: 10, fontWeight: 700 }}>{level.label}</span>
                    </div>
                  )
                })}
              </div>

              {/* Predicted Busiest */}
              <div style={card}>
                <div style={label}>PREDICTED BUSIEST AIRPORTS</div>
                <div style={{ fontSize: 10, color: '#4a7aaa', marginBottom: 12, letterSpacing: 1 }}>
                  BASED ON CURRENT ARRIVAL/DEPARTURE WEIGHTING
                </div>
                {predicted.map((a, i) => {
                  const snap = a.TrafficSnapshot[0]
                  if (!snap) return null
                  const level = trafficLevel(snap.trafficScore)
                  return (
                    <div key={a.id} style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '10px 0', borderBottom: '1px solid rgba(59,158,255,0.06)',
                      cursor: 'pointer',
                    }}
                      onClick={() => { setSearchInput(a.icao); setSearchIcao(a.icao) }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(59,158,255,0.05)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                        <span style={{ color: '#4a7aaa', fontSize: 11 }}>{i + 1}</span>
                        <span style={{ fontWeight: 700, letterSpacing: 2 }}>{a.icao}</span>
                      </div>
                      <span style={{ color: level.color, fontSize: 10, fontWeight: 700 }}>{level.label}</span>
                    </div>
                  )
                })}
              </div>

              {/* Live Events */}
              <div style={card}>
                <div style={label}>LIVE EVENTS</div>
                {liveEvents.length === 0 ? (
                  <div style={{ fontSize: 12, color: '#4a7aaa' }}>NO EVENTS CURRENTLY ACTIVE</div>
                ) : (
                  liveEvents.map(e => (
                    <div key={e.id} style={{
                      padding: '12px 0',
                      borderBottom: '1px solid rgba(59,158,255,0.06)',
                    }}>
                      <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{e.name}</div>
                      <div style={{ fontSize: 10, color: '#4a7aaa', letterSpacing: 1, marginBottom: 4 }}>
                        {e.airports.map(a => a.icao).join(' · ')}
                      </div>
                      <div style={{ fontSize: 10, color: '#3b9eff' }}>
                        ENDS: {new Date(e.end_time).toUTCString().slice(0, 25).toUpperCase()}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Upcoming Events */}
              <div style={card}>
                <div style={label}>UPCOMING EVENTS</div>
                {upcomingEvents.length === 0 ? (
                  <div style={{ fontSize: 12, color: '#4a7aaa' }}>NO UPCOMING EVENTS</div>
                ) : (
                  upcomingEvents.map(e => (
                    <div key={e.id} style={{
                      padding: '12px 0',
                      borderBottom: '1px solid rgba(59,158,255,0.06)',
                    }}>
                      <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{e.name}</div>
                      <div style={{ fontSize: 10, color: '#4a7aaa', letterSpacing: 1, marginBottom: 4 }}>
                        {e.airports.map(a => a.icao).join(' · ')}
                      </div>
                      <div style={{ fontSize: 10, color: '#4dff91' }}>
                        STARTS: {new Date(e.start_time).toUTCString().slice(0, 25).toUpperCase()}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Right Column - Airport Search */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={card}>
                <div style={label}>AIRPORT LOOKUP</div>
                <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                  <input
                    placeholder="ICAO"
                    maxLength={4}
                    value={searchInput}
                    onChange={e => setSearchInput(e.target.value.toUpperCase())}
                    onKeyDown={e => e.key === 'Enter' && setSearchIcao(searchInput)}
                    style={{
                      background: 'rgba(59,158,255,0.05)',
                      border: '1px solid rgba(59,158,255,0.3)',
                      borderRadius: 6,
                      padding: '10px 14px',
                      color: '#ffffff',
                      fontSize: 14,
                      letterSpacing: 4,
                      outline: 'none',
                      flex: 1,
                      textAlign: 'center',
                    }}
                  />
                  <button
                    onClick={() => setSearchIcao(searchInput)}
                    style={{
                      background: 'rgba(59,158,255,0.15)',
                      border: '1px solid rgba(59,158,255,0.4)',
                      borderRadius: 6,
                      padding: '10px 14px',
                      color: '#3b9eff',
                      fontSize: 11,
                      letterSpacing: 1,
                      cursor: 'pointer',
                    }}
                  >GO</button>
                </div>

                {searchLoading && (
                  <div style={{ fontSize: 11, color: '#4a7aaa', letterSpacing: 2 }}>LOADING...</div>
                )}

                {searchError && (
                  <div style={{ fontSize: 11, color: '#ff4d4d', letterSpacing: 2 }}>{searchError}</div>
                )}

                {searchSnap && !searchLoading && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: 4, color: '#ffffff' }}>
                      {searchAirport?.icao}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                      <div style={{ background: 'rgba(59,158,255,0.05)', borderRadius: 8, padding: 12 }}>
                        <div style={{ fontSize: 9, color: '#4a7aaa', letterSpacing: 2, marginBottom: 4 }}>AIRCRAFT</div>
                        <div style={{ fontSize: 20, fontWeight: 700 }}>{searchSnap.totalAircraft}</div>
                      </div>
                      <div style={{ background: 'rgba(59,158,255,0.05)', borderRadius: 8, padding: 12, borderColor: `${searchLevel?.color}44` }}>
                        <div style={{ fontSize: 9, color: '#4a7aaa', letterSpacing: 2, marginBottom: 4 }}>LEVEL</div>
                        <div style={{ fontSize: 16, fontWeight: 700, color: searchLevel?.color }}>{searchLevel?.label}</div>
                      </div>
                      <div style={{ background: 'rgba(59,158,255,0.05)', borderRadius: 8, padding: 12 }}>
                        <div style={{ fontSize: 9, color: '#4a7aaa', letterSpacing: 2, marginBottom: 4 }}>ARRIVALS</div>
                        <div style={{ fontSize: 20, fontWeight: 700, color: '#4dff91' }}>{searchSnap.arrivals}</div>
                      </div>
                      <div style={{ background: 'rgba(59,158,255,0.05)', borderRadius: 8, padding: 12 }}>
                        <div style={{ fontSize: 9, color: '#4a7aaa', letterSpacing: 2, marginBottom: 4 }}>DEPARTURES</div>
                        <div style={{ fontSize: 20, fontWeight: 700, color: '#ff9500' }}>{searchSnap.departures}</div>
                      </div>
                    </div>

                    {/* Live ATC */}
                    {searchSnap && !searchLoading && (
                      <div style={card}>
                        <div style={label}>LIVE ATC ONLINE</div>
                        {liveControllers.length === 0 ? (
                          <div style={{ fontSize: 11, color: '#4a7aaa' }}>NO ATC ONLINE</div>
                        ) : (
                          liveControllers.map((c: any, i: number) => (
                            <div key={i} style={{
                              display: 'flex', justifyContent: 'space-between',
                              padding: '8px 0',
                              borderBottom: '1px solid rgba(59,158,255,0.06)',
                              fontSize: 12,
                            }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                <span style={{ fontWeight: 700, letterSpacing: 1, color: '#4dff91' }}>{c.callsign}</span>
                                <span style={{ fontSize: 10, fontWeight: 700, color: '#4dff91' }}>ONLINE</span>
                              </div>
                              <span style={{ color: '#4a7aaa', fontSize: 10 }}>{c.frequency}</span>
                            </div>
                          ))
                        )}
                      </div>
                    )}

                    {searchTrendData && (
                      <div style={{ background: 'rgba(59,158,255,0.05)', borderRadius: 8, padding: 12 }}>
                        <div style={{ fontSize: 9, color: '#4a7aaa', letterSpacing: 2, marginBottom: 4 }}>TREND</div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: searchTrendData.color }}>{searchTrendData.direction}</div>
                      </div>
                    )}

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                      <div style={{ background: 'rgba(59,158,255,0.05)', borderRadius: 8, padding: 12 }}>
                        <div style={{ fontSize: 9, color: '#4a7aaa', letterSpacing: 2, marginBottom: 4 }}>QUIETEST TODAY</div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: '#4dff91' }}>{quietestTimeToday(searchToday)}</div>
                      </div>
                      <div style={{ background: 'rgba(59,158,255,0.05)', borderRadius: 8, padding: 12 }}>
                        <div style={{ fontSize: 9, color: '#4a7aaa', letterSpacing: 2, marginBottom: 4 }}>PEAK TODAY</div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: '#ff4d4d' }}>{peakTimeToday(searchToday)}</div>
                      </div>
                    </div>

                    {/* Mini trend chart */}
                    {searchTrend.length > 0 && (
                      <div>
                        <div style={{ fontSize: 9, color: '#4a7aaa', letterSpacing: 2, marginBottom: 8 }}>RECENT HISTORY</div>
                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 50 }}>
                          {searchTrend.map((s, i) => {
                            const max = Math.max(...searchTrend.map(x => x.trafficScore), 1)
                            const h = Math.max(3, (s.trafficScore / max) * 50)
                            const lv = trafficLevel(s.trafficScore)
                            return (
                              <div key={i} style={{
                                flex: 1, height: h,
                                background: lv.color,
                                borderRadius: 1,
                                opacity: 0.7,
                              }} />
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}