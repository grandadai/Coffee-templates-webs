import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useBreakpoint } from '@/hooks/useMediaQuery'

type SmokeLayerProps = {
  color: string
  enabled?: boolean
  cinematic?: boolean
}

export function SmokeLayer({
  color,
  enabled = true,
  cinematic = false,
}: SmokeLayerProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const { isMobile } = useBreakpoint()

  useEffect(() => {
    if (!enabled || isMobile || !rootRef.current) return

    const puffs = rootRef.current.querySelectorAll<HTMLElement>('.smoke-puff')
    const tweens = Array.from(puffs).map((puff, index) =>
      gsap.to(puff, {
        y: cinematic ? -160 - index * 24 : -120 - index * 20,
        x: (index % 2 === 0 ? 28 : -22) + index * 4,
        scale: 1.4 + index * 0.1,
        opacity: 0,
        duration: 7.5 + index * 1.3,
        delay: index * 0.9,
        repeat: -1,
        ease: 'sine.out',
      }),
    )

    return () => {
      tweens.forEach((tween) => tween.kill())
    }
  }, [cinematic, enabled, isMobile])

  if (!enabled || isMobile) return null

  return (
    <div
      ref={rootRef}
      className="pointer-events-none absolute inset-0 z-[45] overflow-hidden mix-blend-screen"
      aria-hidden
    >
      {Array.from({ length: cinematic ? 7 : 5 }).map((_, index) => (
        <div
          key={index}
          className="smoke-puff absolute left-1/2 h-44 w-44 -translate-x-1/2 rounded-full blur-3xl will-change-transform"
          style={{
            top: cinematic ? '46%' : '48%',
            background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
            opacity: cinematic ? 0.22 : 0.18,
            marginLeft: (index - 3) * 22,
          }}
        />
      ))}
    </div>
  )
}
