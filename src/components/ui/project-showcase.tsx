import { useEffect, useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Types ────────────────────────────────────────────────
interface Project {
  num: string
  title: string
  designation: string
  desc: string
  stack: string[]
  image: string | null
  github: string | null
  live: string | null
}

interface ProjectShowcaseProps {
  projects: Project[]
}

// ─── Neon Outline Button ──────────────────────────────────
interface NeonBtnProps {
  label: string
  onClick?: () => void
  href?: string
  filled?: boolean
  icon?: React.ReactNode
  disabled?: boolean
}

function NeonBtn({ label, onClick, href, filled = false, icon, disabled }: NeonBtnProps) {
  const base: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 7,
    fontFamily: "'Outfit', sans-serif",
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: '0.07em',
    padding: '10px 20px',
    borderRadius: 4,
    border: '1.5px solid var(--signal)',
    cursor: disabled ? 'default' : 'pointer',
    textTransform: 'uppercase' as const,
    transition: 'background 300ms cubic-bezier(0.22,1,0.36,1), color 300ms ease, box-shadow 300ms ease, transform 300ms cubic-bezier(0.22,1,0.36,1)',
    whiteSpace: 'nowrap' as const,
    textDecoration: 'none',
    ...(filled
      ? { background: 'var(--signal)', color: 'var(--void)' }
      : { background: 'transparent', color: 'var(--signal)' }),
    ...(disabled ? { opacity: 0.3, pointerEvents: 'none' as const } : {}),
  }

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    if (disabled) return
    const el = e.currentTarget as HTMLElement
    if (filled) {
      el.style.background = 'transparent'
      el.style.color = 'var(--signal)'
      el.style.boxShadow = '0 0 18px 4px rgba(0,255,135,0.25)'
    } else {
      el.style.background = 'rgba(0,255,135,0.08)'
      el.style.boxShadow = '0 0 18px 4px rgba(0,255,135,0.2)'
    }
    el.style.transform = 'translateY(-2px)'
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget as HTMLElement
    el.style.background = filled ? 'var(--signal)' : 'transparent'
    el.style.color = filled ? 'var(--void)' : 'var(--signal)'
    el.style.boxShadow = 'none'
    el.style.transform = 'translateY(0)'
  }

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={base}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {icon}{label}
      </a>
    )
  }

  return (
    <button
      onClick={onClick}
      style={base}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {icon}{label}
    </button>
  )
}

// ─── Random seeded rotation ───────────────────────────────
function randomRotate(seed: number) {
  return ((seed * 9301 + 49297) % 233280) / 233280 * 14 - 7
}

// ─── Image card stack ─────────────────────────────────────
interface ImageCardProps {
  src: string | null
  alt: string
  index: number
  active: number
  total: number
}

function ImageCard({ src, alt, index, active, total }: ImageCardProps) {
  const isActive = index === active
  const rot = randomRotate(index * 37)

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, scale: 0.92, rotate: rot }}
      animate={{
        opacity: isActive ? 1 : 0.55,
        scale: isActive ? 1 : 0.94,
        rotate: isActive ? 0 : rot,
        zIndex: isActive ? 999 : total + 2 - index,
        y: isActive ? [0, -60, 0] : 0,
      }}
      exit={{ opacity: 0, scale: 0.9, rotate: rot }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'absolute',
        inset: 0,
        transformOrigin: 'bottom center',
      }}
    >
      <div
        style={{
          position: 'relative',
          height: '100%',
          width: '100%',
          borderRadius: 18,
          padding: 1.5,
          background: isActive
            ? 'linear-gradient(135deg, var(--signal) 0%, rgba(0,255,135,0.3) 100%)'
            : 'rgba(232,228,220,0.12)',
          boxShadow: isActive ? '0 0 40px rgba(0,255,135,0.2)' : 'none',
          transition: 'background 0.4s ease, box-shadow 0.4s ease',
        }}
      >
        <div style={{ height: '100%', width: '100%', borderRadius: 17, overflow: 'hidden', background: '#111' }}>
          {src ? (
            <img
              src={src}
              alt={alt}
              draggable={false}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
            />
          ) : (
            // Placeholder when no image provided
            <div style={{
              width: '100%', height: '100%',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              background: 'linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 100%)',
              gap: 16,
            }}>
              <div style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 18, fontWeight: 700,
                color: 'rgba(232,228,220,0.3)',
                letterSpacing: '0.05em',
                textAlign: 'center',
                padding: '0 32px',
              }}>
                {alt}
              </div>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12, color: 'rgba(0,255,135,0.4)',
                letterSpacing: '0.1em',
              }}>
                // SCREENSHOT COMING SOON
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// ─── Main ProjectShowcase ─────────────────────────────────
export function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  const [active, setActive] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleNext = useCallback(() => setActive(p => (p + 1) % projects.length), [projects.length])
  const handlePrev = useCallback(() => setActive(p => (p - 1 + projects.length) % projects.length), [projects.length])

  useEffect(() => {
    const obs = new ResizeObserver(entries => {
      for (const entry of entries) {
        setIsMobile(entry.contentRect.width < 900)
      }
    })
    if (containerRef.current) obs.observe(containerRef.current)
    return () => obs.disconnect()
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext()
      if (e.key === 'ArrowLeft') handlePrev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [handleNext, handlePrev])

  const p = projects[active]

  const openUrl = p.live || p.github || ''
  const codeUrl = p.github || ''

  return (
    <div ref={containerRef} style={{ width: '100%' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '52% 48%',
          gap: isMobile ? 32 : 56,
          alignItems: 'center',
        }}
      >
        {/* ── IMAGE STACK ── */}
        <div style={{ width: '100%' }}>
          <div style={{ position: 'relative', paddingTop: '66%' /* 3:2 aspect */ }}>
            <AnimatePresence>
              {projects.map((proj, i) => (
                <ImageCard
                  key={i}
                  src={proj.image}
                  alt={proj.title}
                  index={i}
                  active={active}
                  total={projects.length}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Dot indicators */}
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 20 }}>
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Go to project ${i + 1}`}
                style={{
                  width: i === active ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  border: 'none',
                  background: i === active ? 'var(--signal)' : 'rgba(232,228,220,0.2)',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'all 350ms cubic-bezier(0.22,1,0.36,1)',
                  boxShadow: i === active ? '0 0 10px rgba(0,255,135,0.5)' : 'none',
                }}
              />
            ))}
          </div>
        </div>

        {/* ── TEXT PANEL ── */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 28, paddingTop: isMobile ? 0 : 8 }}>
          <motion.div
            key={active}
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -24, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Counter */}
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13, letterSpacing: '0.15em',
              color: 'var(--signal)', marginBottom: 14,
              opacity: 0.8,
            }}>
              // PROJECT {String(active + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
            </div>

            {/* Title */}
            <h3 style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 'clamp(32px, 4vw, 52px)',
              fontWeight: 800,
              color: 'var(--paper)',
              lineHeight: 1.1,
              marginBottom: 12,
              letterSpacing: '-0.01em',
            }}>
              {p.title}
            </h3>

            {/* Designation / stack label */}
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13, color: 'rgba(0,255,135,0.8)',
              marginBottom: 20, letterSpacing: '0.05em',
            }}>
              {p.designation}
            </div>

            {/* Description — word-by-word blur in */}
            <motion.p
              key={`desc-${active}`}
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 16,
                color: 'rgba(232,228,220,0.65)',
                lineHeight: 1.8,
                marginBottom: 20,
              }}
            >
              {p.desc.split(' ').map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ filter: 'blur(8px)', opacity: 0, y: 4 }}
                  animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, ease: 'easeOut', delay: 0.015 * i }}
                  style={{ display: 'inline-block', marginRight: 4 }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>

            {/* Tech stack pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 4 }}>
              {p.stack.map(t => (
                <span key={t} style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12, fontWeight: 600,
                  background: 'rgba(0,255,135,0.07)',
                  color: 'rgba(0,255,135,0.85)',
                  border: '1px solid rgba(0,255,135,0.2)',
                  borderRadius: 4,
                  padding: '4px 12px',
                  whiteSpace: 'nowrap',
                }}>
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          {/* ── BUTTONS ── */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 10,
            paddingTop: 4,
          }}>
            {/* PREV */}
            <NeonBtn
              label="← PREV"
              onClick={handlePrev}
              disabled={projects.length <= 1}
            />
            {/* NEXT */}
            <NeonBtn
              label="NEXT →"
              onClick={handleNext}
              disabled={projects.length <= 1}
            />
            {/* VIEW CODE */}
            {codeUrl && (
              <NeonBtn
                label="VIEW CODE"
                href={codeUrl}
                icon={
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                }
              />
            )}
            {/* LIVE / OPEN PROJECT */}
            {p.live && (
              <NeonBtn
                label="LIVE ↗"
                href={p.live}
                filled
                icon={
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="2" y1="12" x2="22" y2="12"/>
                    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
                  </svg>
                }
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
