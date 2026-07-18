import { useEffect, useState } from 'react'
import { SplineHero } from '@/components/ui/demo'
import { SpecialText } from '@/components/ui/special-text'
import { PrecisionMetrics } from '@/components/ui/precision-metrics'
import { ProjectShowcase } from '@/components/ui/project-showcase'
import { SolarSystem } from '@/components/ui/solar-system'
import { Mail, Phone, Download, Menu, X } from 'lucide-react'

// Brand icons (not available in lucide-react v1.16+)
const GithubIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
)
const LinkedinIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

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
    designation: 'Python · Flask · YOLOv5 · CNN · OpenCV · SQLite3',
    impact: '// 5 behavioural signals processed simultaneously  ·  YOLOv5 @ 90%+ accuracy  ·  70% less invigilation overhead',
    desc: 'Real-time proctoring platform processing eye gaze, head pose, mouth movement, emotion analysis, and facial recognition simultaneously. Built to catch what humans miss.',
    stack: ['Python', 'Flask', 'YOLOv5', 'CNN · OpenCV', 'SQLite3', 'JavaScript'],
    image: '/ai-exam-guardian.png',
    github: 'https://github.com/Manojkumars-dev/AI-Proctoring-System',
    live: null,
  },
  {
    num: '02', title: 'Fullstack Market',
    designation: 'React.js · Firebase · Firestore · Stripe API · Cloud Functions',
    impact: '// sub-2s load time  ·  real-time Firestore listeners  ·  Stripe checkout  ·  10+ React components',
    desc: 'Production-grade e-commerce with end-to-end purchase flow. Not a tutorial project — a scalable marketplace prototype with real payment infrastructure.',
    stack: ['React.js', 'Firebase', 'Firestore', 'Stripe API', 'Context API', 'Cloud Functions'],
    image: '/amazon-clone.png',
    github: 'https://github.com/Manojkumars-dev/Amazon-clone',
    live: null,
  },
  {
    num: '03', title: 'Hostel OS',
    designation: 'HTML5 · CSS3 · JavaScript · PHP · SQL Server',
    impact: '// 100+ beds managed  ·  60% faster admin workflows  ·  zero double-bookings  ·  full paper-to-digital',
    desc: 'Replaced an entire paper-based system. Dual-panel app for students and admins. The kind of software that actually gets used.',
    stack: ['HTML5 · CSS3', 'JavaScript', 'PHP', 'SQL Server'],
    image: '/hostel-os.png',
    github: 'https://github.com/Manojkumars-dev/hostel-management-system',
    live: 'https://hostel-management-system-r5i5.onrender.com',
  },
  {
    num: '04', title: 'Sakkat Oota',
    designation: 'React.js · Vite · HTML5 · CSS3 · Lucide React',
    impact: '// 24 authentic Bengaluru dishes  ·  real-time invoice cart  ·  OoruPay checkout  ·  bilingual Kannada UI',
    desc: 'A premium editorial broadsheet food registry bringing legendary Bengaluru flavors to your screen. Features a newspaper-ink aesthetic, interactive logo switcher, GST-aware invoice cart, and a mock payment gateway.',
    stack: ['React.js', 'Vite', 'HTML5', 'CSS3', 'Lucide React'],
    image: '/sakkat-oota.png',
    github: 'https://github.com/Manojkumars-dev/Food-delivery',
    live: 'https://food-delivery017.vercel.app',
  },
]

// ─── TICKER STRIP ─────────────────────────────────────────
function Ticker() {
  const content = TICKER_CONTENT.repeat(6)
  return (
    <div className="ticker-strip" style={{ width: '100%', height: 52, background: 'var(--signal)', overflow: 'hidden', display: 'flex', alignItems: 'center' }} aria-hidden>
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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

      {/* NAV */}
      <nav style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: 52, background: 'var(--void)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 clamp(20px, 4vw, 48px)', zIndex: 100, borderBottom: '1px solid rgba(232,228,220,0.08)' }}>
        <div style={{ ...S, fontSize: 'clamp(14px, 3vw, 19px)', color: 'var(--paper)', letterSpacing: '0.05em' }}>
          <SpecialText speed={18} className="text-[19px] tracking-[0.05em]">MANOJ KUMAR S</SpecialText><span style={{ animation: 'blink 1s step-end infinite', color: 'var(--signal)', fontFamily: "'JetBrains Mono',monospace" }}>_</span>
        </div>
        <div className="desktop-nav-links" style={{ display: 'flex', gap: 32 }}>
          {['work', 'skills', 'about', 'contact'].map(l => (
            <a key={l} href={`#${l}`} className="nav-link" style={{ ...S, fontSize: 14, letterSpacing: '0.1em' }}>{l}</a>
          ))}
        </div>
        <button className="hamburger-btn" onClick={() => setMobileMenuOpen(true)} aria-label="Open menu">
          <Menu size={24} />
        </button>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`}>
        <button className="mobile-close-btn" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
          <X size={28} />
        </button>
        {['work', 'skills', 'about', 'contact'].map(l => (
          <a key={l} href={`#${l}`} onClick={() => setMobileMenuOpen(false)}>{l}</a>
        ))}
      </div>

      {/* HERO — SPLINE 3D */}
      <section id="hero" style={{ height: '100vh', paddingTop: 52 }}>
        <SplineHero />
      </section>

      <Ticker />
      <section id="work" className="bg-projects noise-overlay" style={{ padding: 'clamp(60px, 8vw, 100px) clamp(24px, 5vw, 80px)' }}>
        <div className="glow-accent" style={{ top: '-100px', left: '-100px' }} />
        <div className="glow-accent" style={{ bottom: '-80px', right: '-60px', animationDelay: '-4s' }} />
        <p className="reveal" style={{ ...S, fontSize: 14, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(232,228,220,0.5)', marginBottom: 52 }}>
          // HANDS ON EXPERIENCE
        </p>
        <div className="reveal">
          <ProjectShowcase projects={PROJECTS} />
        </div>
      </section>

      <Ticker />

      {/* SKILLS */}
      <section id="skills" className="bg-skills noise-overlay" style={{ minHeight: 600, padding: '60px clamp(20px, 4vw, 48px) 80px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="reveal" style={{ ...S, fontSize: 14, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(232,228,220,0.5)', alignSelf: 'flex-start', marginBottom: 40 }}>
          // THINGS I KNOW
        </div>
        <div className="reveal" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <SolarSystem />
        </div>
        <div className="reveal skills-quote" style={{ fontFamily: "'DM Serif Display',serif", fontStyle: 'italic', fontSize: 'clamp(28px,4vw,52px)', color: 'var(--paper)', lineHeight: 1.1, marginTop: 48, alignSelf: 'flex-start' }}>
          "I learn fast.<br /> The rest is just syntax."
        </div>
      </section>

      <Ticker />


      {/* ABOUT */}
      <section id="about" className="bg-about noise-overlay" style={{ padding: 'clamp(60px, 8vw, 100px) clamp(20px, 4vw, 48px)' }}>
        <div className="glow-warm" />
        <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '55% 45%', gap: 60, alignItems: 'start' }}>
          <div className="reveal">
            <div style={{ fontFamily: "'DM Serif Display',serif", fontStyle: 'italic', fontSize: 'clamp(36px,4vw,58px)', color: 'var(--paper)', lineHeight: 1.15, marginBottom: 28 }}>
              "From mechanical drawings to machine learning — I changed tracks because I found something more interesting."
            </div>
            <div style={{ ...S, fontSize: 15, color: 'rgba(232,228,220,0.65)', lineHeight: 1.9 }}>
              B.E. Information Science &amp; Engineering — RNS Institute of Technology, Bengaluru (VTU). CGPA 7.8.<br /><br />
              Started with a Diploma in Mechanical Engineering (CGPA 9.39) — which is why I think about systems, not just software.<br /><br />
              Deloitte Data Analytics Job Simulation · NPTEL Big Data Computing.
            </div>

            {/* EXPERIENCE */}
            <div style={{ marginTop: 40, borderLeft: '3px solid var(--signal)', paddingLeft: 24 }}>
              <div style={{ ...S, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--signal)', marginBottom: 12 }}>
                // EXPERIENCE
              </div>
              <div style={{ fontFamily: "'DM Serif Display',serif", fontStyle: 'italic', fontSize: 'clamp(22px,3vw,32px)', color: 'var(--paper)', lineHeight: 1.2, marginBottom: 8 }}>
                Data Science Intern
              </div>
              <div style={{ ...S, fontSize: 14, color: 'rgba(232,228,220,0.5)', marginBottom: 16 }}>
                Take It Smart (OPC) Pvt. Ltd. · Bengaluru, Karnataka · Jan 2026 – May 2026
              </div>
              <ul style={{ ...S, fontSize: 14, color: 'rgba(232,228,220,0.6)', lineHeight: 1.9, listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <li style={{ paddingLeft: 16, position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--signal)' }}>→</span>
                  Hands-on experience in Data Science through structured learning modules and continuous technical mentorship from industry professionals.
                </li>
                <li style={{ paddingLeft: 16, position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--signal)' }}>→</span>
                  Applied Python-based data analysis, machine learning concepts, and data visualization techniques on real-world datasets.
                </li>
                <li style={{ paddingLeft: 16, position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--signal)' }}>→</span>
                  Developed practical expertise in data preprocessing, model building, and deriving actionable insights across a 4-month industry-integrated program.
                </li>
              </ul>
            </div>
          </div>
          <div className="reveal about-metrics" style={{ borderLeft: '1px solid rgba(232,228,220,0.1)', paddingLeft: 48 }}>
            <PrecisionMetrics />
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="reveal contact-mesh noise-overlay contact-section" style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '100px 48px', textAlign: 'center' }}>
        <div className="contact-title" style={{ fontFamily: "'DM Serif Display',serif", fontStyle: 'italic', fontSize: 'clamp(40px,6vw,88px)', color: 'var(--paper)', lineHeight: 1, marginBottom: 28 }}>
          Let's build something.
        </div>
        <p className="contact-desc" style={{ ...S, fontSize: 16, color: 'rgba(232,228,220,0.6)', marginBottom: 48, maxWidth: 580, lineHeight: 1.8 }}>
          I'm looking for a Graduate Engineer Trainee role where I can ship from day one.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center', width: '100%', maxWidth: 500 }}>
          <a href="https://mail.google.com/mail/?view=cm&to=smanojkumar8310@gmail.com&su=Hiring%20Inquiry%20%E2%80%94%20Manoj%20Kumar%20S" target="_blank" rel="noopener noreferrer" className="contact-link-row contact-link">
            <Mail size={20} /> <span>smanojkumar8310@gmail.com</span>
          </a>
          <a href="https://www.linkedin.com/in/manojkumars-dev" target="_blank" rel="noopener noreferrer" className="contact-link-row contact-link">
            <LinkedinIcon size={20} /> <span>linkedin.com/in/manojkumars-dev</span>
          </a>
          <a href="https://github.com/manojkumars-dev" target="_blank" rel="noopener noreferrer" className="contact-link-row contact-link">
            <GithubIcon size={20} /> <span>github.com/manojkumars-dev</span>
          </a>
          <a href="tel:+918310339811" className="contact-link-row contact-link">
            <Phone size={20} /> <span>+91-8310339811</span>
          </a>
        </div>
        <a href="/ManuJavaResume.pdf" download="Manoj_Kumar_S_Resume.pdf" className="resume-btn" style={{ marginTop: 36 }}>
          <Download size={18} /> DOWNLOAD RESUME
        </a>
      </section>

      {/* FOOTER */}
      <footer className="bg-footer" style={{ background: 'var(--void)', textAlign: 'center', padding: '32px clamp(20px, 4vw, 48px)', ...S, fontSize: 13, color: 'rgba(232,228,220,0.4)', letterSpacing: '0.1em' }}>
        Manoj Kumar S · Bengaluru, Karnataka · Built without a template.
        <div className="social-icons">
          <a href="https://github.com/manojkumars-dev" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="GitHub"><GithubIcon size={16} /></a>
          <a href="https://www.linkedin.com/in/manojkumars-dev" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="LinkedIn"><LinkedinIcon size={16} /></a>
          <a href="https://mail.google.com/mail/?view=cm&to=smanojkumar8310@gmail.com" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="Email"><Mail size={16} /></a>
          <a href="tel:+918310339811" className="social-icon-link" aria-label="Phone"><Phone size={16} /></a>
        </div>
      </footer>
    </>
  )
}
