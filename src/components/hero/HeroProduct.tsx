import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useMouseParallax } from '@/hooks/useMouseParallax'

type HeroProductProps = {
  src: string
  alt: string
  width: number
  accent: string
  amplitudeScale?: number
}

export function HeroProduct({
  src,
  alt,
  width,
  accent,
  amplitudeScale = 1,
}: HeroProductProps) {
  const parallaxRef = useRef<HTMLDivElement>(null)
  const floatRef = useRef<HTMLDivElement>(null)
  const shadowRef = useRef<HTMLDivElement>(null)

  useMouseParallax(18, (x, y, rotateX, rotateY) => {
    if (!parallaxRef.current) return
    gsap.set(parallaxRef.current, {
      x,
      y,
      rotateX,
      rotateY,
      force3D: true,
    })
  })

  useEffect(() => {
    const el = floatRef.current
    const shadow = shadowRef.current
    if (!el || !shadow) return

    const tl = gsap.timeline({
      repeat: -1,
      yoyo: true,
      defaults: { ease: 'sine.inOut' },
    })

    tl.to(
      el,
      {
        y: -16 * amplitudeScale,
        rotate: 2.5 * amplitudeScale,
        duration: 5.8,
      },
      0,
    )
    tl.to(
      shadow,
      {
        opacity: 0.28,
        scaleX: 0.9,
        duration: 5.8,
      },
      0,
    )

    return () => {
      tl.kill()
    }
  }, [amplitudeScale])

  return (
    <div
      className="pointer-events-none absolute left-1/2 top-[46%] z-50 -translate-x-1/2 -translate-y-1/2"
      style={{ width: `min(${width}px, 58vw)` }}
    >
      <div className="hero-product will-change-transform">
        <div ref={parallaxRef} className="will-change-transform">
          <div ref={floatRef} className="relative will-change-transform">
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
              style={{
                background: `radial-gradient(circle, ${accent}55 0%, transparent 70%)`,
              }}
            />
            <img
              src={src}
              alt={alt}
              width={width}
              height={width}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              draggable={false}
              className="relative z-10 mx-auto h-auto w-full object-contain select-none drop-shadow-[0_30px_60px_rgba(0,0,0,0.45)]"
            />
            <div
              ref={shadowRef}
              aria-hidden
              className="pointer-events-none absolute left-1/2 -bottom-2 z-0 h-6 w-[62%] -translate-x-1/2 rounded-[100%] bg-black/55 blur-xl will-change-transform"
              style={{ opacity: 0.42 }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
