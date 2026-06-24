import { useState } from 'react'

export function PrecisionMetrics() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const S = { fontFamily: "'JetBrains Mono', monospace" }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28, width: '100%' }}>
      {/* Dynamic Keyframes & Custom Blueprint Styling */}
      <style>{`
        @keyframes gear-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes gear-spin-reverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @keyframes sonar-sweep {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulse-soft {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.9; }
        }
        .metric-card {
          background: rgba(232, 228, 220, 0.03);
          border: 1px solid rgba(232, 228, 220, 0.12);
          padding: 26px 30px;
          border-radius: 4px;
          position: relative;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          cursor: pointer;
        }
        /* Engineering blueprint corner marks */
        .metric-card::before, .metric-card::after {
          content: '';
          position: absolute;
          width: 10px;
          height: 10px;
          border-color: rgba(232, 228, 220, 0.25);
          border-style: solid;
          transition: border-color 0.3s, box-shadow 0.3s;
          pointer-events: none;
        }
        /* Top-Left Corner */
        .metric-card::before {
          top: 0; left: 0;
          border-width: 2px 0 0 2px;
        }
        /* Bottom-Right Corner */
        .metric-card::after {
          bottom: 0; right: 0;
          border-width: 0 2px 2px 0;
        }
        .metric-card:hover {
          background: rgba(232, 228, 220, 0.06);
          border-color: var(--signal);
          box-shadow: 0 10px 35px rgba(0, 0, 0, 0.5), inset 0 0 15px rgba(0, 255, 135, 0.05);
          transform: translateY(-2px);
        }
        .metric-card:hover::before, .metric-card:hover::after {
          border-color: var(--signal);
          filter: drop-shadow(0 0 4px var(--signal));
        }
      `}</style>

      {/* CARD 1: SHIPPED PROJECTS */}
      <div
        className="metric-card"
        onMouseEnter={() => setHoveredCard(1)}
        onMouseLeave={() => setHoveredCard(null)}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
          <div>
            <div style={{ ...S, fontSize: 13, fontWeight: 'bold', color: hoveredCard === 1 ? 'var(--signal)' : 'rgba(232, 228, 220, 0.8)', letterSpacing: '0.15em', transition: 'color 0.2s' }}>
              [COMPONENT_01 // RUNTIME_OUTPUT]
            </div>
            <div style={{ ...S, fontSize: 22, color: 'var(--paper)', fontWeight: 700, marginTop: 6, letterSpacing: '-0.01em' }}>
              SHIPPED PROJECTS
            </div>
          </div>
          <div style={{
            ...S,
            fontSize: 42,
            fontWeight: 800,
            color: hoveredCard === 1 ? 'var(--signal)' : 'var(--paper)',
            lineHeight: 1,
            transition: 'color 0.3s',
            textShadow: hoveredCard === 1 ? '0 0 15px rgba(0, 255, 135, 0.3)' : 'none'
          }}>
            03
          </div>
        </div>

        {/* Interactive Telemetry Visual */}
        <div style={{ display: 'flex', gap: 26, alignItems: 'center', minHeight: 95 }}>
          <div style={{ position: 'relative', width: 80, height: 80, flexShrink: 0 }}>
            {/* Outer dial */}
            <svg width="80" height="80" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(232, 228, 220, 0.25)" strokeWidth="1.5" />
              <circle cx="50" cy="50" r="45" fill="none" stroke="var(--signal)" strokeWidth="2.5" strokeDasharray="50 160"
                style={{
                  transformOrigin: '50px 50px',
                  animation: hoveredCard === 1 ? 'sonar-sweep 2s linear infinite' : 'sonar-sweep 6s linear infinite'
                }}
              />
              <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(232, 228, 220, 0.2)" strokeWidth="1" strokeDasharray="6 6" />
              <circle cx="50" cy="50" r="15" fill="none" stroke="rgba(232, 228, 220, 0.25)" strokeWidth="1.5" />
              {/* Telemetry crosshair */}
              <line x1="50" y1="5" x2="50" y2="95" stroke="rgba(232, 228, 220, 0.18)" strokeWidth="1" />
              <line x1="5" y1="50" x2="95" y2="50" stroke="rgba(232, 228, 220, 0.18)" strokeWidth="1" />
              {/* Highlighted dots */}
              <circle cx="30" cy="40" r="4" fill="var(--signal)" style={{ opacity: hoveredCard === 1 ? 1 : 0.6 }} />
              <circle cx="70" cy="65" r="4" fill="var(--signal)" style={{ opacity: hoveredCard === 1 ? 1 : 0.6 }} />
              <circle cx="50" cy="20" r="4" fill="var(--signal)" style={{ opacity: hoveredCard === 1 ? 1 : 0.6 }} />
            </svg>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
            {[
              { id: 'PROJ_01', name: 'AI EXAM GUARDIAN', type: 'ML' },
              { id: 'PROJ_02', name: 'FULLSTACK MARKET', type: 'WEB' },
              { id: 'PROJ_03', name: 'HOSTEL OS', type: 'SYS' }
            ].map((p) => (
              <div key={p.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                ...S,
                fontSize: 14,
                fontWeight: 600,
                color: hoveredCard === 1 ? 'var(--paper)' : 'rgba(232, 228, 220, 0.95)',
                transition: 'all 0.2s',
                padding: '4px 10px',
                background: hoveredCard === 1 ? 'rgba(0, 255, 135, 0.08)' : 'rgba(232, 228, 220, 0.04)',
                borderLeft: hoveredCard === 1 ? '3px solid var(--signal)' : '3px solid transparent',
                borderRadius: '0 4px 4px 0'
              }}>
                <span style={{ color: hoveredCard === 1 ? 'var(--signal)' : 'rgba(232, 228, 220, 0.85)' }}>
                  {p.id} &gt; {p.name}
                </span>
                <span style={{ color: hoveredCard === 1 ? 'var(--paper)' : 'var(--signal)', fontWeight: 'bold' }}>{p.type}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CARD 2: MECHANICAL PRECISION (CGPA) */}
      <div
        className="metric-card"
        onMouseEnter={() => setHoveredCard(2)}
        onMouseLeave={() => setHoveredCard(null)}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
          <div>
            <div style={{ ...S, fontSize: 13, fontWeight: 'bold', color: hoveredCard === 2 ? 'var(--signal)' : 'rgba(232, 228, 220, 0.8)', letterSpacing: '0.15em', transition: 'color 0.2s' }}>
              [COMPONENT_02 // SYSTEM_PRECISION]
            </div>
            <div style={{ ...S, fontSize: 22, color: 'var(--paper)', fontWeight: 700, marginTop: 6, letterSpacing: '-0.01em' }}>
              DIPLOMA CGPA (MECH)
            </div>
          </div>
          <div style={{
            ...S,
            fontSize: 42,
            fontWeight: 800,
            color: hoveredCard === 2 ? 'var(--signal)' : 'var(--paper)',
            lineHeight: 1,
            transition: 'color 0.3s',
            textShadow: hoveredCard === 2 ? '0 0 15px rgba(0, 255, 135, 0.3)' : 'none'
          }}>
            9.39<span style={{ fontSize: 18, fontWeight: 400, opacity: 0.6, marginLeft: 2 }}>/10</span>
          </div>
        </div>

        {/* Vernier Caliper / Slide Rule SVG */}
        <div style={{ minHeight: 100, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ position: 'relative', width: '100%', padding: '14px 0 6px' }}>
            <svg width="100%" height="60" viewBox="0 0 320 60" style={{ overflow: 'visible' }}>
              {/* Ruler Track */}
              <rect x="0" y="18" width="300" height="20" fill="rgba(232, 228, 220, 0.08)" stroke="rgba(232, 228, 220, 0.3)" strokeWidth="1.5" rx="2" />
              
              {/* Major and Minor Ticks (from 0 to 10) */}
              {Array.from({ length: 51 }).map((_, idx) => {
                const isMajor = idx % 5 === 0;
                const isTen = idx % 25 === 0;
                const x = 15 + (idx * 5.4); // maps to range [15, 285]
                return (
                  <line
                    key={idx}
                    x1={x}
                    y1="18"
                    x2={x}
                    y2={isTen ? 36 : isMajor ? 30 : 25}
                    stroke={isTen ? 'rgba(232, 228, 220, 0.85)' : 'rgba(232, 228, 220, 0.45)'}
                    strokeWidth={isMajor ? 2 : 1}
                  />
                );
              })}

              {/* Major Numbers along the scale */}
              <text x="15" y="12" textAnchor="middle" style={{ ...S, fontSize: 11, fill: 'rgba(232, 228, 220, 0.7)', fontWeight: 'bold' }}>0</text>
              <text x="150" y="12" textAnchor="middle" style={{ ...S, fontSize: 11, fill: 'rgba(232, 228, 220, 0.7)', fontWeight: 'bold' }}>5</text>
              <text x="285" y="12" textAnchor="middle" style={{ ...S, fontSize: 11, fill: 'rgba(232, 228, 220, 0.7)', fontWeight: 'bold' }}>10</text>

              {/* Vernier Slide Jaws (Moves on hover) */}
              <g style={{
                transform: hoveredCard === 2 ? 'translateX(237.5px)' : 'translateX(0px)', // 237.5px corresponds to 9.39/10
                transition: 'transform 1.2s cubic-bezier(0.19, 1, 0.22, 1)',
              }}>
                {/* Vernier Frame */}
                <rect x="-20" y="10" width="40" height="36" fill="rgba(10, 10, 10, 0.98)" stroke="var(--signal)" strokeWidth="1.5" rx="2" />
                <line x1="0" y1="10" x2="0" y2="46" stroke="var(--signal)" strokeWidth="1.25" strokeDasharray="2 2" />
                {/* Calibration digital display window */}
                <rect x="-24" y="-14" width="48" height="18" fill="var(--void)" stroke="rgba(0, 255, 135, 0.7)" strokeWidth="1" rx="2" />
                <text x="0" y="-1" textAnchor="middle" style={{ ...S, fontSize: 12, fill: 'var(--signal)', fontWeight: 'bold', letterSpacing: '0.05em' }}>
                  {hoveredCard === 2 ? '9.39' : '0.00'}
                </text>
                {/* Caliper Jaw Extension */}
                <path d="M 0 26 L 0 54 L 6 54" stroke="var(--signal)" strokeWidth="2" fill="none" />
              </g>
              {/* Origin Stopper Jaw */}
              <path d="M 15 18 L 15 54 L 9 54" stroke="rgba(232, 228, 220, 0.55)" strokeWidth="2" fill="none" />
            </svg>
          </div>
          <div style={{ ...S, fontSize: 13, color: 'rgba(232, 228, 220, 0.85)', display: 'flex', justifyContent: 'space-between', padding: '0 4px', marginTop: 8 }}>
            <span>MIN: 0.00</span>
            <span style={{ color: hoveredCard === 2 ? 'var(--signal)' : 'var(--paper)', fontWeight: 700, transition: 'color 0.3s' }}>
              STATUS: HIGH PRECISION FOUNDATION
            </span>
            <span>MAX: 10.00</span>
          </div>
        </div>
      </div>

      {/* CARD 3: INDUSTRY EXPERIENCE */}
      <div
        className="metric-card"
        onMouseEnter={() => setHoveredCard(3)}
        onMouseLeave={() => setHoveredCard(null)}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
          <div>
            <div style={{ ...S, fontSize: 13, fontWeight: 'bold', color: hoveredCard === 3 ? 'var(--signal)' : 'rgba(232, 228, 220, 0.8)', letterSpacing: '0.15em', transition: 'color 0.2s' }}>
              [COMPONENT_03 // INDUSTRY_INTEGRATION]
            </div>
            <div style={{ ...S, fontSize: 22, color: 'var(--paper)', fontWeight: 700, marginTop: 6, letterSpacing: '-0.01em' }}>
              INDUSTRY RUNTIME
            </div>
          </div>
          <div style={{
            ...S,
            fontSize: 42,
            fontWeight: 800,
            color: hoveredCard === 3 ? 'var(--signal)' : 'var(--paper)',
            lineHeight: 1,
            transition: 'color 0.3s',
            textShadow: hoveredCard === 3 ? '0 0 15px rgba(0, 255, 135, 0.3)' : 'none'
          }}>
            4 MOS<span style={{ fontSize: 14, fontWeight: 600, opacity: 0.7, marginLeft: 4 }}>DONE</span>
          </div>
        </div>

        {/* Meshing Gear Mechanisms Visual */}
        <div style={{ display: 'flex', gap: 26, alignItems: 'center', minHeight: 95 }}>
          <div style={{ position: 'relative', width: 90, height: 75, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <svg width="95" height="70" viewBox="0 0 100 80" style={{ overflow: 'visible' }}>
              {/* Gear 1 (Main) */}
              <g style={{
                transformOrigin: '35px 40px',
                animation: hoveredCard === 3 ? 'gear-spin 4s linear infinite' : 'gear-spin 12s linear infinite',
              }}>
                <circle cx="35" cy="40" r="18" fill="none" stroke="rgba(232, 228, 220, 0.45)" strokeWidth="2.5" />
                <circle cx="35" cy="40" r="6" fill="none" stroke="rgba(232, 228, 220, 0.35)" strokeWidth="1" />
                {/* Teeth */}
                {Array.from({ length: 8 }).map((_, i) => (
                  <rect
                    key={i}
                    x="32"
                    y="18"
                    width="6"
                    height="8"
                    fill="rgba(232, 228, 220, 0.55)"
                    rx="0.5"
                    style={{
                      transformOrigin: '35px 40px',
                      transform: `rotate(${i * 45}deg)`
                    }}
                  />
                ))}
              </g>

              {/* Gear 2 (Secondary Meshing) */}
              <g style={{
                transformOrigin: '68px 40px',
                animation: hoveredCard === 3 ? 'gear-spin-reverse 2.67s linear infinite' : 'gear-spin-reverse 8s linear infinite',
              }}>
                <circle cx="68" cy="40" r="12" fill="none" stroke="var(--signal)" strokeWidth="2" style={{ opacity: hoveredCard === 3 ? 1 : 0.75 }} />
                <circle cx="68" cy="40" r="4" fill="none" stroke="var(--signal)" strokeWidth="0.75" style={{ opacity: hoveredCard === 3 ? 0.8 : 0.6 }} />
                {/* Teeth */}
                {Array.from({ length: 6 }).map((_, i) => (
                  <rect
                    key={i}
                    x="66"
                    y="25"
                    width="4"
                    height="6"
                    fill="var(--signal)"
                    rx="0.5"
                    style={{
                      transformOrigin: '68px 40px',
                      transform: `rotate(${i * 60 + 15}deg)`,
                      opacity: hoveredCard === 3 ? 1 : 0.7
                    }}
                  />
                ))}
              </g>
            </svg>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 6, flexGrow: 1 }}>
            <div style={{ ...S, fontSize: 15, fontWeight: 'bold', color: hoveredCard === 3 ? 'var(--signal)' : 'var(--paper)', transition: 'color 0.2s', letterSpacing: '0.02em' }}>
              &gt; GRADUATE ENGINEER TRAINEE
            </div>
            <div style={{ ...S, fontSize: 13, color: 'rgba(232, 228, 220, 0.85)', lineHeight: 1.5 }}>
              SYSTEMS DIAGNOSTICS &amp; DEPLOYMENT<br />
              <span style={{ color: hoveredCard === 3 ? 'var(--signal)' : 'rgba(232, 228, 220, 0.7)' }}>
                INTERNSHIP STATUS: COMPLETED <span style={{
                  display: 'inline-block',
                  fontSize: 12,
                  marginLeft: 6,
                }}>✓</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
