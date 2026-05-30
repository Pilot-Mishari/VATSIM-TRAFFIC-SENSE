import React from 'react'

export default function About({ onBack }: { onBack: () => void }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0d0f1a',
      color: '#e0e6f0',
      fontFamily: "'DM Mono', 'Courier New', monospace",
      padding: '32px',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        marginBottom: 40,
      }}>
        <div>
          <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: 3 }}>ABOUT VATSENSE</div>
          <div style={{ marginTop: 8, fontSize: 12, color: '#4a7aaa', letterSpacing: 2 }}>
            A lightweight VATSIM traffic analytics interface for controllers and pilots.
          </div>
        </div>
        <button
          onClick={onBack}
          style={{
            background: 'transparent',
            border: '1px solid rgba(77,255,145,0.35)',
            borderRadius: 8,
            padding: '10px 18px',
            color: '#4dff91',
            fontSize: 11,
            letterSpacing: 2,
            cursor: 'pointer',
          }}
        >
          BACK TO DASHBOARD
        </button>
      </div>

      <div style={{
        maxWidth: 920,
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(59,158,255,0.2)',
        borderRadius: 14,
        padding: '32px',
        boxShadow: '0 0 24px rgba(59,158,255,0.08)',
      }}>
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 14, color: '#4a7aaa', letterSpacing: 2, marginBottom: 16 }}>INTRODUCTION</div>
          <div style={{ fontSize: 15, lineHeight: 1.9, color: '#d7e2f0' }}>
            Vatsense gives you a fast way to explore live VATSIM traffic trends, controller staffing, and pilot activity.
            Use the Dashboard to jump into the Controller and Pilot views, and track airport performance with real-time metrics.
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 14, color: '#4a7aaa', letterSpacing: 2, marginBottom: 16 }}>HOW IT WORKS</div>
          <div style={{ fontSize: 15, lineHeight: 1.9, color: '#d7e2f0' }}>
            The app pulls VATSIM analytics data, airport snapshots, and live controller status from the backend.
            The Controller Dashboard shows staffing recommendations and workload levels, while the Pilot Dashboard highlights live ATC and busiest airports.
          </div>
        </div>

        <div>
          <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: 2, color: '#ffffff', marginBottom: 14 }}>FAQ</div>

          <div style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#4dff91', marginBottom: 6 }}>Q: How do I navigate between pages?</div>
            <div style={{ fontSize: 15, lineHeight: 1.8, color: '#d7e2f0' }}>
              Use the Dashboard buttons to open the Controller or Pilot views. The top links include an About page and blank placeholders for GitHub / Discord.
            </div>
          </div>

          <div style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#4dff91', marginBottom: 6 }}>Q: What does the arrow on the Dashboard mean?</div>
            <div style={{ fontSize: 15, lineHeight: 1.8, color: '#d7e2f0' }}>
              The arrow indicates the page continues downward. Add a GIF file at <code style={{ color: '#a0b8d0' }}>/arrow.gif</code> to make it animate.
            </div>
          </div>

          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#4dff91', marginBottom: 6 }}>Q: How do I close this page?</div>
            <div style={{ fontSize: 15, lineHeight: 1.8, color: '#d7e2f0' }}>
              Click the BACK TO DASHBOARD button at the top to return to the main dashboard.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
