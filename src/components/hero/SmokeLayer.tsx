import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useBreakpoint } from '@/hooks/useMediaQuery'

type SmokeLayerProps = {
  color: string
  enabled?: boolean
}

export function SmokeLayer({ color, enabled = true }: SmokeLayerProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const { isMobile } = useBreakpoint()

  useEffect(() => {
    if (!enabled || isMobile || !rootRef.current) return

    const puffs = rootRef.current.querySelectorAll<HTMLElement>('.smoke-puff')
    const tweens = Array.from(puffs).map((puff, index) =>
      gsap.to(puff, {
        y: -120 - index * 20,
        x: (index % 2 === 0 ? 30 : -24) + index * 4,
        scale: 1.35 + index * 0.08,
        opacity: 0,
        duration: 8 + index * 1.4,
        delay: index * 1.1,
        repeat: -1,
        ease: 'sine.out',
      }),
    )

    return () => {
      tweens.forEach((tween) => tween.kill())
    }
  }, [enabled, isMobile])

  if (!enabled || isMobile) return null

  return (
    <div
      ref={rootRef}
      className="pointer-events-none absolute inset-0 z-[45] overflow-hidden mix-blend-screen"
      aria-hidden
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="smoke-puff absolute left-1/2 top-[48%] h-40 w-40 -translate-x-1/2 rounded-full blur-3xl will-change-transform"
          style={{
            background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
            opacity: 0.18,
            marginLeft: (index - 2) * 28,
          }}
        />
      ))}
    </div>
  )
}
