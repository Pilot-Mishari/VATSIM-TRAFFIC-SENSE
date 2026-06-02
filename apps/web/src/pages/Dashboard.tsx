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
  latestTimestamp: string
}

interface Changelog {
  title: string
  body: string
  url?: string
  state?: string
  updatedAt?: string
}

interface Controller {
  callsign: string
  frequency?: string
  position?: string
}

export default function Dashboard({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [summary, setSummary] = useState<Summary | null>(null)
  const [changelog, setChangelog] = useState<Changelog | null>(null)
  const [topAirports, setTopAirports] = useState<Airport[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [searchResult, setSearchResult] = useState<Airport | null>(null)
  const [searchLoading, setSearchLoading] = useState(false)
  const [searchError, setSearchError] = useState('')
  const [selectedAirport, setSelectedAirport] = useState<Airport | null>(null)
  const [selectedControllers, setSelectedControllers] = useState<Controller[]>([])
  const [selectedLoading, setSelectedLoading] = useState(false)
  const [selectedError, setSelectedError] = useState('')

  useEffect(() => {
    // Fetch summary and changelog first so the page can render quickly.
    Promise.all([
      fetch(`${API}/analytics/summary`).then(r => r.json()),
      fetch(`${API}/analytics/changelog`).then(r => r.json()),
    ]).then(([s, c]) => {
      setSummary(s)
      setChangelog(c)
      setLoading(false)
    }).catch(err => {
      console.error('Failed to fetch summary/changelog', err)
      setLoading(false)
    });

    // Load top airports lazily to avoid blocking initial render.
    (async () => {
      try {
        const resp = await fetch(`${API}/analytics/top-airports`)
        if (!resp.ok) throw new Error('Top airports fetch failed')
        const t = await resp.json()
        setTopAirports(t)
      } catch (err) {
        console.error('Failed to fetch top airports (lazy)', err)
      }
    })()
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

  async function selectAirport(icao: string) {
    setSelectedLoading(true)
    setSelectedError('')
    setSelectedAirport(null)
    try {
      const airportResponse = await fetch(`${API}/airport/${icao}`)
      const airportData = await airportResponse.json()
      if (airportData.error) {
        throw new Error(airportData.error)
      }

      const controllerResponse = await fetch(`${API}/controllers/live/${icao}`)
      const controllerData = await controllerResponse.json()
      if (controllerData.error) {
        throw new Error(controllerData.error)
      }

      setSelectedAirport(airportData)
      setSelectedControllers(Array.isArray(controllerData) ? controllerData : [])
    } catch (error: any) {
      setSelectedError(error?.message || 'Failed to load airport details')
    } finally {
      setSelectedLoading(false)
    }
  }

  const filtered = search.length > 0
    ? topAirports.filter(a => a.icao.toLowerCase().includes(search.toLowerCase()))
    : topAirports

  function trafficLevel(score: number) {
    if (score >= 150) return { label: 'VERY HIGH', color: '#ff4d4d' }
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
        background: 'rgba(13,15,26,0.95)',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
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
              <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: 2 }}>VATSENSE</div>
              <div style={{ fontSize: 10, color: '#4a7aaa', letterSpacing: 3 }}>VATSIM TRAFFIC ANALYTICS</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <a href="#" onClick={e => { e.preventDefault(); onNavigate('about') }}
              style={{ fontSize: 12, letterSpacing: 2, color: '#ffffff', textDecoration: 'none' }}>
              ABOUT
            </a>
            <a href="https://github.com/Pilot-Mishari/VATSIM-TRAFFIC-SENSE" target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 12, letterSpacing: 2, color: '#4dff91', textDecoration: 'none' }}>
              GITHUB
            </a>
            <a href="#" onClick={e => e.preventDefault()}
              style={{ fontSize: 12, letterSpacing: 2, color: '#ff9500', textDecoration: 'none' }}
              onMouseEnter={e => { e.currentTarget.style.textDecoration = 'line-through' }}
              onMouseLeave={e => { e.currentTarget.style.textDecoration = 'none' }}>
              DISCORD
            </a>
          </div>
        </div>

        <div style={{ marginTop: 12, fontSize: 11, color: '#4a7aaa', letterSpacing: 1 }}>
          {summary?.latestTimestamp
            ? `LAST UPDATE: ${new Date(summary.latestTimestamp).toUTCString().toUpperCase()}`
            : 'LOADING...'}
        </div>
      </div>

      <div style={{ padding: '32px', maxWidth: 1400, margin: '0 auto' }}>

        {/* Summary + Buttons */}
        {summary && (
          <>
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
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
              <div style={{ fontSize: 10, color: '#4a7aaa', letterSpacing: 2, marginBottom: 8 }}>CHANGELOG</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#3b9eff', marginBottom: 12 }}>
                {changelog?.title ?? 'Loading latest PR...'}
              </div>
              <div style={{ fontSize: 12, lineHeight: 1.5, color: '#d6e4ff', maxHeight: 96, overflowY: 'auto', paddingRight: 8, whiteSpace: 'pre-wrap' }}>
                {changelog?.body ? changelog.body : 'No open pull requests available.'}
              </div>
              {changelog?.url ? (
                <a href={changelog.url} target="_blank" rel="noreferrer" style={{ marginTop: 12, fontSize: 11, color: '#4dff91', textDecoration: 'none' }}>
                  View PR
                </a>
              ) : null}
            </div>

            {[
              { label: 'CONTROLLER DASHBOARD', color: '#4dff91', size: 22 },
              { label: 'PILOT DASHBOARD', color: '#ff9500', size: 22 },
            ].map(btn => (
              <button key={btn.label}
                onClick={() => onNavigate(btn.label === 'CONTROLLER DASHBOARD' ? 'controller' : 'pilot')}
                style={{
                  background: 'rgba(59,158,255,0.06)',
                  border: `1px solid ${btn.color}30`,
                  borderRadius: 10,
                  padding: '20px 24px',
                  color: btn.color,
                  fontSize: btn.size,
                  letterSpacing: 1.5,
                  fontWeight: 800,
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(59,158,255,0.16)'
                  e.currentTarget.style.boxShadow = `0 0 14px ${btn.color}30`
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(59,158,255,0.06)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                {btn.label}
              </button>
            ))}
          </div>
          </>
        )}

        {selectedAirport && Array.isArray(selectedAirport.TrafficSnapshot) && selectedAirport.TrafficSnapshot[0] && (
          <div style={{
            background: 'rgba(13,15,26,0.95)',
            border: '1px solid rgba(59,158,255,0.25)',
            borderRadius: 14,
            padding: '28px 30px',
            marginBottom: 32,
            boxShadow: '0 0 24px rgba(59,158,255,0.1)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: 2, color: '#ffffff' }}>{selectedAirport.icao} SUMMARY</div>
                <div style={{ fontSize: 11, color: '#4a7aaa', letterSpacing: 2, marginTop: 4 }}>CLICKED AIRPORT DETAILS</div>
              </div>
              <button
                onClick={() => {
                  setSelectedAirport(null)
                  setSelectedControllers([])
                  setSelectedError('')
                }}
                style={{
                  background: 'rgba(59,158,255,0.1)',
                  border: '1px solid rgba(59,158,255,0.25)',
                  borderRadius: 8,
                  color: '#4dff91',
                  fontSize: 12,
                  letterSpacing: 1.5,
                  padding: '10px 18px',
                  cursor: 'pointer',
                }}>
                CLEAR
              </button>
            </div>

            {selectedLoading ? (
              <div style={{ color: '#4a7aaa', fontSize: 12, letterSpacing: 1.5 }}>LOADING AIRPORT INFORMATION...</div>
            ) : selectedError ? (
              <div style={{ color: '#ff6f6f', fontSize: 12, letterSpacing: 1.5 }}>{selectedError}</div>
            ) : (
              (() => {
                const snap = selectedAirport.TrafficSnapshot[0]
                const level = trafficLevel(snap.trafficScore)
                const controllerCount = selectedControllers.length
                const activePositions = Array.from(new Set(selectedControllers
                  .map(c => c.position || c.callsign.split(/[_\s-]+/).pop())
                  .filter(Boolean)
                ))

                return (
                  <div style={{ display: 'grid', gap: 16 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                      <div style={{ padding: 18, background: 'rgba(255,255,255,0.03)', borderRadius: 12, border: '1px solid rgba(59,158,255,0.15)' }}>
                        <div style={{ fontSize: 10, color: '#4a7aaa', letterSpacing: 2, marginBottom: 8 }}>CURRENT TRAFFIC</div>
                        <div style={{ fontSize: 22, fontWeight: 700, color: '#3b9eff' }}>{snap.totalAircraft.toLocaleString()} AIRCRAFT</div>
                        <div style={{ marginTop: 10, fontSize: 12, color: '#a0b8d0' }}>Arrivals: {snap.arrivals} · Departures: {snap.departures}</div>
                      </div>
                      <div style={{ padding: 18, background: 'rgba(255,255,255,0.03)', borderRadius: 12, border: '1px solid rgba(59,158,255,0.15)' }}>
                        <div style={{ fontSize: 10, color: '#4a7aaa', letterSpacing: 2, marginBottom: 8 }}>TRAFFIC LEVEL</div>
                        <div style={{ fontSize: 22, fontWeight: 700, color: level.color }}>{level.label}</div>
                        <div style={{ marginTop: 10, fontSize: 12, color: '#a0b8d0' }}>Traffic score: {snap.trafficScore}</div>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                      <div style={{ padding: 18, background: 'rgba(255,255,255,0.03)', borderRadius: 12, border: '1px solid rgba(59,158,255,0.15)' }}>
                        <div style={{ fontSize: 10, color: '#4a7aaa', letterSpacing: 2, marginBottom: 8 }}>CURRENT CONTROLLERS</div>
                        <div style={{ fontSize: 22, fontWeight: 700, color: '#4dff91' }}>{controllerCount}</div>
                        <div style={{ marginTop: 10, fontSize: 12, color: '#a0b8d0' }}>{activePositions.join(' · ') || 'NO LIVE POSITIONS'}</div>
                      </div>
                      <div style={{ padding: 18, background: 'rgba(255,255,255,0.03)', borderRadius: 12, border: '1px solid rgba(59,158,255,0.15)' }}>
                        <div style={{ fontSize: 10, color: '#4a7aaa', letterSpacing: 2, marginBottom: 8 }}>ADDITIONAL INSIGHTS</div>
                        <div style={{ fontSize: 12, lineHeight: 1.8, color: '#e0e6f0' }}>
                          <div>{snap.arrivals + snap.departures > 60 ? 'Heavy runway demand expected.' : 'Traffic remains manageable.'}</div>
                          <div>{controllerCount === 0 ? 'No controllers detected. Expect limited ATC coverage.' : 'Live ATC coverage detected.'}</div>
                          <div>{snap.totalAircraft > 80 ? 'Peak traffic in progress.' : 'Traffic is stable for now.'}</div>
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                      <div style={{ padding: 18, background: 'rgba(255,255,255,0.03)', borderRadius: 12, border: '1px solid rgba(59,158,255,0.15)' }}>
                        <div style={{ fontSize: 10, color: '#4a7aaa', letterSpacing: 2, marginBottom: 8 }}>LAST UPDATE</div>
                        <div style={{ fontSize: 12, color: '#e0e6f0' }}>{new Date(snap.timestamp).toUTCString()}</div>
                      </div>
                      <div style={{ padding: 18, background: 'rgba(255,255,255,0.03)', borderRadius: 12, border: '1px solid rgba(59,158,255,0.15)' }}>
                        <div style={{ fontSize: 10, color: '#4a7aaa', letterSpacing: 2, marginBottom: 8 }}>ACTIVE RUNWAYS</div>
                        <div style={{ fontSize: 12, color: '#e0e6f0' }}>Estimated usage based on traffic volume.</div>
                      </div>
                      <div style={{ padding: 18, background: 'rgba(255,255,255,0.03)', borderRadius: 12, border: '1px solid rgba(59,158,255,0.15)' }}>
                        <div style={{ fontSize: 10, color: '#4a7aaa', letterSpacing: 2, marginBottom: 8 }}>RECOMMENDED FOCUS</div>
                        <div style={{ fontSize: 12, color: '#e0e6f0' }}>{level.label === 'VERY HIGH' ? 'Monitor flow and staffing closely.' : 'Traffic looks stable.'}</div>
                      </div>
                    </div>
                  </div>
                )
              })()
            )}
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
            <span>TRAFFIC LEVEL</span>
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

              {searchResult && Array.isArray(searchResult.TrafficSnapshot) && searchResult.TrafficSnapshot[0] && (() => {
                const snap = searchResult.TrafficSnapshot[0]
                const level = trafficLevel(snap.trafficScore)
                const selected = selectedAirport?.icao === searchResult.icao
                return (
                  <div
                    onClick={() => selectAirport(searchResult.icao)}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '60px 1fr 100px 100px 100px 120px 100px',
                      padding: '14px 24px',
                      borderBottom: '1px solid rgba(59,158,255,0.15)',
                      fontSize: 13,
                      background: selected ? 'rgba(77,255,145,0.08)' : 'rgba(59,158,255,0.08)',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = selected ? 'rgba(77,255,145,0.12)' : 'rgba(59,158,255,0.12)')}
                    onMouseLeave={e => (e.currentTarget.style.background = selected ? 'rgba(77,255,145,0.08)' : 'rgba(59,158,255,0.08)')}
                  >
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
                const snap = Array.isArray(airport.TrafficSnapshot) ? airport.TrafficSnapshot[0] : null
                if (!snap) return null
                const level = trafficLevel(snap.trafficScore)
                const selected = selectedAirport?.icao === airport.icao
                return (
                  <div key={airport.id}
                    onClick={() => selectAirport(airport.icao)}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '60px 1fr 100px 100px 100px 120px 100px',
                      padding: '14px 24px',
                      borderBottom: '1px solid rgba(59,158,255,0.07)',
                      fontSize: 13,
                      transition: 'background 0.15s',
                      cursor: 'pointer',
                      background: selected ? 'rgba(77,255,145,0.08)' : 'transparent',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = selected ? 'rgba(77,255,145,0.12)' : 'rgba(59,158,255,0.05)')}
                    onMouseLeave={e => (e.currentTarget.style.background = selected ? 'rgba(77,255,145,0.08)' : 'transparent')}
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