import { useEffect, useState } from 'react'
import { KineticTextLoader } from '@/components/ui/kinetic-text-loader'

export function SplashScreen({ onDone }: { onDone: () => void }) {
  const [fading, setFading] = useState(false)

  useEffect(() => {
    // Start fade-out at 4.5s, call onDone at 5s (after fade completes)
    const fadeTimer = setTimeout(() => setFading(true), 4500)
    const doneTimer = setTimeout(() => onDone(), 5000)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(doneTimer)
    }
  }, [onDone])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#0a0a0a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 500ms ease',
        opacity: fading ? 0 : 1,
        pointerEvents: fading ? 'none' : 'all',
      }}
    >
      <KineticTextLoader />
    </div>
  )
}
