import { useEffect, useRef } from 'react'
import { SplineHero } from '@/components/ui/demo'
import { SpecialText } from '@/components/ui/special-text'
import { PrecisionMetrics } from '@/components/ui/precision-metrics'

// ─── SKILLS DATA ──────────────────────────────────────────
const SKILLS = [
  'Python', 'React.js', 'JavaScript (ES6+)', 'Java', 'Flask', 'PHP', 'Firebase', 'MySQL',
  'SQLite3', 'YOLOv5', 'CNN', 'OpenCV', 'Facial Recognition', 'Eye Gaze Tracking',
  'Emotion Analysis', 'Firestore', 'Context API', 'Stripe API', 'Git', 'GitHub',
  'RESTful APIs', 'Data Structures', 'Agile', 'Big Data',
]

function seeded(seed: number) {
  const x = Math.sin(seed + 1) * 43758.5453123
  return x - Math.floor(x)
}

interface SkillAnim {
  left: string; anchorTop: string;
  stringLen: number; swing: number;
  duration: number; delay: number;
}

const SKILL_ANIMS: SkillAnim[] = SKILLS.map((_, i) => {
  const r = (offset: number) => seeded(i * 17 + offset)
  const col = i % 5
  const row = Math.floor(i / 5)
  return {
    left: `${col * 19 + r(0) * 6 + 2}%`,
    anchorTop: `${row * 130 + r(1) * 20 + 10}px`,
    stringLen: Math.round(55 + r(2) * 75),
    swing: 4 + r(3) * 14,
    duration: 2.4 + r(4) * 3.1,
    delay: -(r(5) * 4),
  }
})

// ─── TICKER ───────────────────────────────────────────────
const TICKER_CONTENT = 'PYTHON · REACT.JS · FLASK · YOLOV5 · FIREBASE · CNN · OPENCV · SQL · JAVASCRIPT · AI/ML · '


// ─── PROJECTS ─────────────────────────────────────────────
const PROJECTS = [
  {
    num: '01', title: 'AI Exam Guardian',
    impact: '// 5 behavioural signals processed simultaneously  ·  YOLOv5 @ 90%+ accuracy  ·  70% less invigilation overhead',
    desc: 'Real-time proctoring platform processing eye gaze, head pose, mouth movement, emotion analysis, and facial recognition simultaneously. Built to catch what humans miss.',
    stack: ['Python', 'Flask', 'YOLOv5', 'CNN · OpenCV', 'SQLite3', 'JavaScript'],
  },
  {
    num: '02', title: 'Fullstack Market',
    impact: '// sub-2s load time  ·  real-time Firestore listeners  ·  Stripe checkout  ·  10+ React components',
    desc: 'Production-grade e-commerce with end-to-end purchase flow. Not a tutorial project — a scalable marketplace prototype with real payment infrastructure.',
    stack: ['React.js', 'Firebase', 'Firestore', 'Stripe API', 'Context API', 'Cloud Functions'],
  },
  {
    num: '03', title: 'Hostel OS',
    impact: '// 100+ beds managed  ·  60% faster admin workflows  ·  zero double-bookings  ·  full paper-to-digital',
    desc: 'Replaced an entire paper-based system. Dual-panel app for students and admins. The kind of software that actually gets used.',
    stack: ['HTML5 · CSS3', 'JavaScript', 'PHP', 'SQL Server'],
  },
]

// ─── TICKER STRIP ─────────────────────────────────────────
function Ticker() {
  const content = TICKER_CONTENT.repeat(6)
  return (
    <div style={{ width: '100%', height: 52, background: 'var(--signal)', overflow: 'hidden', display: 'flex', alignItems: 'center' }} aria-hidden>
      <div style={{ display: 'flex', whiteSpace: 'nowrap', animation: 'ticker 20s linear infinite' }}>
        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 16, fontWeight: 700, color: 'var(--void)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
          {content}{content}
        </span>
      </div>
    </div>
  )
}

// ─── APP ──────────────────────────────────────────────────
export default function App() {
  // Cursor logic
  const lineRef = useRef<HTMLDivElement>(null)
  const blockRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = e.clientX, y = e.clientY
      if (lineRef.current) lineRef.current.style.transform = `translate(${x}px,${y}px)`
      if (blockRef.current) blockRef.current.style.transform = `translate(${x}px,${y}px)`
      if (dotRef.current) dotRef.current.style.transform = `translate(${x - 1.5}px,${y - 1.5}px)`
    }
    window.addEventListener('mousemove', onMove)
    const enterHover = () => document.body.classList.add('hovering')
    const leaveHover = () => document.body.classList.remove('hovering')
    document.querySelectorAll('a,button,.project-strip').forEach(el => {
      el.addEventListener('mouseenter', enterHover)
      el.addEventListener('mouseleave', leaveHover)
    })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  // Scroll reveal
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
    }, { threshold: 0.1 })
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const S: React.CSSProperties = { fontFamily: "'JetBrains Mono',monospace" }

  return (
    <>
      {/* CURSORS */}
      <div ref={lineRef} id="cursor-line" />
      <div ref={blockRef} id="cursor-block" />
      <div ref={dotRef} id="cursor-dot" />

      {/* NAV */}
      <nav style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: 52, background: 'var(--void)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 48px', zIndex: 100, borderBottom: '1px solid rgba(232,228,220,0.08)' }}>
        <div style={{ ...S, fontSize: 19, color: 'var(--paper)', letterSpacing: '0.05em' }}>
          <SpecialText speed={18} className="text-[19px] tracking-[0.05em]">MANOJ KUMAR S</SpecialText><span style={{ animation: 'blink 1s step-end infinite', color: 'var(--signal)', fontFamily: "'JetBrains Mono',monospace" }}>_</span>
        </div>
        <div style={{ display: 'flex', gap: 32 }}>
          {['work', 'skills', 'about', 'contact'].map(l => (
            <a key={l} href={`#${l}`} className="nav-link" style={{ ...S, fontSize: 14, letterSpacing: '0.1em' }}>{l}</a>
          ))}
        </div>
      </nav>

      {/* HERO — SPLINE 3D */}
      <section id="hero" style={{ height: '100vh', paddingTop: 52 }}>
        <SplineHero />
      </section>

      <Ticker />

      {/* PROJECTS */}
      <section id="work" style={{ background: 'var(--void)', padding: '80px 0' }}>
        <p className="reveal" style={{ ...S, fontSize: 14, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(232,228,220,0.5)', padding: '0 48px', marginBottom: 48 }}>
          // SELECTED WORK
        </p>

        {PROJECTS.map((p, i) => (
          <div key={i} className="project-strip reveal" style={{
            display: 'grid', gridTemplateColumns: '20% 60% 20%', alignItems: 'center', minHeight: 290,
            borderBottom: '1px solid rgba(232,228,220,0.1)',
            ...(i === 0 ? { borderTop: '1px solid rgba(232,228,220,0.1)' } : {}),
          }}>
            <div style={{ ...S, fontSize: 120, color: 'var(--signal)', opacity: 0.15, fontWeight: 700, paddingLeft: 48, lineHeight: 1, userSelect: 'none' }}>
              {p.num}
            </div>
            <div style={{ padding: '0 32px' }}>
              <div style={{ fontFamily: "'DM Serif Display',serif", fontStyle: 'italic', fontSize: 'clamp(40px,5vw,64px)', color: 'var(--paper)', lineHeight: 1.05, marginBottom: 12 }}>
                {p.title}
              </div>
              <div style={{ ...S, fontSize: 14, color: 'var(--signal)', letterSpacing: '0.05em' }}>{p.impact}</div>
              <div className="proj-desc" style={{ ...S, fontSize: 15, color: 'rgba(232,228,220,0.7)', lineHeight: 1.8, marginTop: 12 }}>{p.desc}</div>
            </div>
            <div style={{ padding: '0 32px 0 0', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center', gap: 8, height: '100%' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, flex: 1, justifyContent: 'center' }}>
                {p.stack.map(t => (
                  <span key={t} style={{ ...S, background: 'var(--paper)', color: 'var(--void)', fontSize: 13, borderRadius: 20, padding: '5px 14px', whiteSpace: 'nowrap' }}>{t}</span>
                ))}
              </div>
              <div style={{ ...S, fontSize: 14, color: 'var(--signal)', letterSpacing: '0.05em', marginTop: 'auto', paddingBottom: 8, fontWeight: 600 }}>VIEW CODE →</div>
            </div>
          </div>
        ))}
      </section>

      <Ticker />

      {/* SKILLS */}
      <section id="skills" style={{ background: 'var(--paper)', minHeight: 600, position: 'relative', overflow: 'hidden', padding: '60px 48px 80px' }}>

        <style>{SKILL_ANIMS.map((a, i) => `
          @keyframes pendulum-${i} {
            from { transform: rotate(-${a.swing.toFixed(2)}deg); }
            to   { transform: rotate(${a.swing.toFixed(2)}deg); }
          }
          @keyframes pin-glow-${i} {
            0%,100% { box-shadow: 0 0 6px 2px rgba(246,214,70,0.55); }
            50%      { box-shadow: 0 0 14px 5px rgba(246,214,70,0.25); }
          }
        `).join('')}</style>

        <div className="reveal" style={{ ...S, fontSize: 14, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(10,10,10,0.5)' }}>
          // THINGS I KNOW
        </div>

        <div className="reveal" style={{ position: 'relative', height: (Math.ceil(SKILLS.length / 5) * 130 + 180) + 'px', margin: '40px 0 0' }}>
          {SKILLS.map((skill, i) => {
            const a = SKILL_ANIMS[i]
            return (
              <div key={skill} style={{ position: 'absolute', left: a.left, top: a.anchorTop, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{
                  width: 10, height: 10, borderRadius: '50%',
                  background: 'var(--signal)',
                  animation: `pin-glow-${i} ${(a.duration * 1.3).toFixed(2)}s ${a.delay.toFixed(2)}s ease-in-out infinite`,
                  flexShrink: 0, zIndex: 2,
                }} />
                <div style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  transformOrigin: 'top center',
                  animation: `pendulum-${i} ${a.duration.toFixed(2)}s ${a.delay.toFixed(2)}s ease-in-out infinite alternate`,
                  willChange: 'transform',
                }}>
                  <div style={{
                    width: 1, height: a.stringLen,
                    background: 'linear-gradient(to bottom, rgba(10,10,10,0.55), rgba(10,10,10,0.15))',
                  }} />
                  <div
                    style={{
                      background: 'var(--void)', color: 'var(--paper)',
                      ...S, fontSize: 14, borderRadius: 6, padding: '9px 20px',
                      whiteSpace: 'nowrap', cursor: 'default',
                      boxShadow: '0 4px 18px rgba(0,0,0,0.18)',
                      transition: 'background 0.2s, color 0.2s, box-shadow 0.2s',
                      border: '1px solid rgba(232,228,220,0.08)',
                    }}
                    onMouseEnter={e => {
                      const swing = e.currentTarget.parentElement as HTMLDivElement
                      swing.style.animationPlayState = 'paused'
                      const tag = e.currentTarget as HTMLDivElement
                      tag.style.background = 'var(--signal)'
                      tag.style.color = 'var(--void)'
                      tag.style.boxShadow = '0 0 24px 6px rgba(246,214,70,0.5)'
                    }}
                    onMouseLeave={e => {
                      const swing = e.currentTarget.parentElement as HTMLDivElement
                      swing.style.animationPlayState = 'running'
                      const tag = e.currentTarget as HTMLDivElement
                      tag.style.background = 'var(--void)'
                      tag.style.color = 'var(--paper)'
                      tag.style.boxShadow = '0 4px 18px rgba(0,0,0,0.18)'
                    }}
                  >
                    {skill}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="reveal" style={{ fontFamily: "'DM Serif Display',serif", fontStyle: 'italic', fontSize: 52, color: 'var(--void)', lineHeight: 1.1, marginTop: 24 }}>
          "I learn fast.<br />The rest is just syntax."
        </div>
      </section>

      <Ticker />


      {/* ABOUT */}
      <section id="about" style={{ background: 'var(--void)', padding: '100px 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '55% 45%', gap: 60, alignItems: 'start' }}>
          <div className="reveal">
            <div style={{ fontFamily: "'DM Serif Display',serif", fontStyle: 'italic', fontSize: 'clamp(36px,4vw,58px)', color: 'var(--paper)', lineHeight: 1.15, marginBottom: 28 }}>
              "From mechanical drawings to machine learning — I changed tracks because I found something more interesting."
            </div>
            <div style={{ ...S, fontSize: 15, color: 'rgba(232,228,220,0.65)', lineHeight: 1.9 }}>
              B.E. Information Science &amp; Engineering — RNS Institute of Technology, Bengaluru (VTU). CGPA 7.8.<br /><br />
              Started with a Diploma in Mechanical Engineering (CGPA 9.39) — which is why I think about systems, not just software.<br /><br />
              Deloitte Data Analytics Job Simulation · NPTEL Big Data Computing.
            </div>
          </div>
          <div className="reveal" style={{ borderLeft: '1px solid rgba(232,228,220,0.1)', paddingLeft: 48 }}>
            <PrecisionMetrics />
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="reveal" style={{ background: 'var(--signal)', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 48px', textAlign: 'center' }}>
        <div style={{ fontFamily: "'DM Serif Display',serif", fontStyle: 'italic', fontSize: 'clamp(40px,6vw,88px)', color: 'var(--void)', lineHeight: 1, marginBottom: 24 }}>
          Let's build something.
        </div>
        <p style={{ ...S, fontSize: 16, color: 'rgba(10,10,10,0.75)', marginBottom: 40, maxWidth: 580, lineHeight: 1.8 }}>
          I'm looking for a Graduate Engineer Trainee role where I can ship from day one.
        </p>
        {[
          { href: 'https://mail.google.com/mail/?view=cm&to=smanojkumar8310@gmail.com&su=Hiring%20Inquiry%20%E2%80%94%20Manoj%20Kumar%20S', label: 'smanojkumar8310@gmail.com' },
          { href: 'https://www.linkedin.com/in/manojkumars-dev', label: 'linkedin.com/in/manojkumars-dev' },
          { href: 'tel:+918310339811', label: '+91-8310339811' },
        ].map(l => (
          <a key={l.href} href={l.href} style={{ ...S, display: 'block', fontSize: 18, color: 'var(--void)', margin: '12px 0', letterSpacing: '0.02em' }}
            onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
            onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}>
            {l.label}
          </a>
        ))}
      </section>

      {/* FOOTER */}
      <footer style={{ background: 'var(--void)', textAlign: 'center', padding: 32, ...S, fontSize: 13, color: 'rgba(232,228,220,0.4)', letterSpacing: '0.1em' }}>
        Manoj Kumar S · Bengaluru, Karnataka · Built without a template.
      </footer>
    </>
  )
}
