'use client'

import { SplineScene } from '@/components/ui/splite'
import { Card } from '@/components/ui/card'
import { Spotlight } from '@/components/ui/spotlight'
import { SpecialText } from '@/components/ui/special-text'

export function SplineHero() {
  return (
    <Card className="w-full h-full bg-black/[0.96] relative overflow-hidden rounded-none border-0">
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />

      <div className="flex h-full">
        {/* Left — text content: three zones pinned top/mid/bottom */}
        <div style={{ width: '45%', padding: '52px 48px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', zIndex: 10 }}>

          {/* TOP — spacer */}
          <div />

          {/* MIDDLE — headline + descriptor */}
          <div>
            <h1 style={{
              fontFamily: "'DM Serif Display',serif",
              fontStyle: 'italic',
              lineHeight: 0.92,
              fontSize: 'clamp(40px,6vw,96px)',
              color: 'var(--paper)',
              marginBottom: 28,
              margin: '0 0 28px',
            }}>
              I BUILD
              <br />
              <span>THINGS </span>
              <span style={{ background: 'var(--signal)', color: 'var(--void)', padding: '0 12px', display: 'inline' }}>
                THAT
              </span>
              <br />
              THINK.
            </h1>

            <p style={{
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: 16,
              color: 'rgba(232,228,220,0.65)',
              lineHeight: 1.85,
              maxWidth: 480,
              margin: 0,
            }}>
              Real-time AI proctoring. Full-stack marketplaces. Systems that replace paper.
              <br />
              From Bengaluru — shipping since day one.
            </p>
          </div>

          {/* BOTTOM — name + eyebrow + CTA */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 22, color: 'var(--paper)', letterSpacing: '0.05em' }}>
              <SpecialText speed={16} className="text-[22px] tracking-[0.05em]">MANOJ KUMAR S</SpecialText><span style={{ animation: 'blink 1s step-end infinite', color: 'var(--signal)' }}>_</span>
            </div>
            <p style={{
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: 16, letterSpacing: '0.2em',
              color: 'rgba(232,228,220,0.45)',
              textTransform: 'uppercase',
              margin: 0,
            }}>
              // full-stack · AI/ML · builder
            </p>
            <a
              href="https://mail.google.com/mail/?view=cm&to=smanojkumar8310@gmail.com&su=Hiring%20Inquiry%20%E2%80%94%20Manoj%20Kumar%20S"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta"
              style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '0.05em',
                padding: '14px 28px',
                display: 'inline-block',
                width: 'fit-content',
              }}
            >
              &gt; HIRE MANOJ
            </a>
          </div>
        </div>

        {/* Right — 3D Spline scene */}
        <div style={{ flex: 1, position: 'relative' }} className="hidden md:block">
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>
    </Card>
  )
}

