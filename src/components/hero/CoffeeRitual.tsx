import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type CoffeeRitualProps = {
  steps: string[]
  enabled: boolean
  rootSelector?: string
}

/**
 * Scroll-pinned coffee ritual labels + intensifies steam while ingredients animate
 * via classes attached in useHeroAnimations.
 */
export function CoffeeRitual({ steps, enabled }: CoffeeRitualProps) {
  const labelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!enabled || !labelRef.current) return

    const labels = labelRef.current.querySelectorAll<HTMLElement>('.ritual-step')
    gsap.set(labels, { opacity: 0, y: 12 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#coffee-ritual-pin',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.8,
      },
    })

    const segment = 1 / Math.max(steps.length, 1)
    labels.forEach((label, index) => {
      const start = index * segment
      tl.to(label, { opacity: 1, y: 0, duration: segment * 0.35 }, start)
      tl.to(
        label,
        { opacity: index === labels.length - 1 ? 0.85 : 0, y: -10, duration: segment * 0.35 },
        start + segment * 0.55,
      )
    })

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [enabled, steps.length])

  if (!enabled) return null

  return (
    <div
      ref={labelRef}
      className="pointer-events-none absolute inset-x-0 bottom-8 z-[70] flex justify-center px-4 md:bottom-10"
    >
      <div className="relative h-10 min-w-[220px] text-center">
        {steps.map((step) => (
          <div
            key={step}
            className="ritual-step absolute inset-0 flex items-center justify-center text-sm tracking-[0.22em] text-[#F7EFE6]/90 uppercase md:text-base"
          >
            {step}
          </div>
        ))}
      </div>
    </div>
  )
}

