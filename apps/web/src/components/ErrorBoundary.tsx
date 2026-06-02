import React from 'react'

type State = {
  hasError: boolean
  error?: Error | null
}

export default class ErrorBoundary extends React.Component<{ children: React.ReactNode }, State> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: any) {
    console.error('Uncaught render error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0d0f1a', color: '#e0e6f0', fontFamily: "'DM Mono', 'Courier New', monospace" }}>
          <div style={{ maxWidth: 680, padding: 24, borderRadius: 8, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(59,158,255,0.15)' }}>
            <h2 style={{ margin: 0, marginBottom: 8 }}>Something went wrong</h2>
            <div style={{ color: '#a0b8d0', marginBottom: 12 }}>An unexpected error occurred while rendering the UI.</div>
            <div style={{ marginBottom: 12, fontSize: 12, color: '#d6e4ff', whiteSpace: 'pre-wrap' }}>{String(this.state.error || '')}</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => window.location.reload()} style={{ padding: '8px 12px', borderRadius: 6, cursor: 'pointer' }}>Reload</button>
              <button onClick={() => this.setState({ hasError: false, error: null })} style={{ padding: '8px 12px', borderRadius: 6, cursor: 'pointer' }}>Dismiss</button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
