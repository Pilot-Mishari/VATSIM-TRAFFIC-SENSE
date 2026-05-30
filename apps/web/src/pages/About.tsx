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
            <div style={{ fontSize: 13, fontWeight: 700, color: '#4dff91', marginBottom: 6 }}> What is SectorSense and who is it for?</div>
            <div style={{ fontSize: 15, lineHeight: 1.8, color: '#d7e2f0' }}>
              SectorSense is a VATSIM traffic analytics platform that helps controllers, pilots, event coordinators, and vACC staff make better operational decisions. It monitors live VATSIM traffic, analyzes historical patterns, and predicts future workload levels based on real data collected from the VATSIM network. Whether you're deciding when to open a sector, planning a flight to a busy airport, or organizing an event, SectorSense gives you the data to make informed decisions instead of guessing.
            </div>
          </div>

          <div style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#4dff91', marginBottom: 6 }}> How accurate are the predictions?</div>
            <div style={{ fontSize: 15, lineHeight: 1.8, color: '#d7e2f0' }}>
              Prediction accuracy improves over time as more historical data is collected. SectorSense launched data collection recently and currently has tens of thousands of snapshots. Predictions for major high-traffic airports like EGLL, EDDF, and OMDB are already showing meaningful patterns. Smaller or less active airports will have lower confidence predictions until enough data is collected. Every prediction displays a confidence level — LOW, MEDIUM, or HIGH — so you always know how reliable the estimate is. As a general rule, predictions become significantly more accurate after 2-3 months of consistent data collection.
            </div>
          </div>

          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#4dff91', marginBottom: 6 }}>How often is the data updated?  </div>
            <div style={{ fontSize: 15, lineHeight: 1.8, color: '#d7e2f0' }}>
              SectorSense collects a snapshot of all active VATSIM traffic every 10 minutes, 24 hours a day. This means the traffic scores, aircraft counts, and airport activity levels you see are never more than 10 minutes old. The live ATC section pulls directly from the VATSIM data feed in real time when you load a dashboard. Historical data is retained permanently and used to build trend analysis and predictions over time.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
