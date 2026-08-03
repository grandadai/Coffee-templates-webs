import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useMouseParallax } from '@/hooks/useMouseParallax'

type HeroProductProps = {
  src: string
  alt: string
  width: number
  accent: string
  amplitudeScale?: number
  cinematic?: boolean
  /** Optional second image revealed during the coffee ritual (e.g. pour + splash) */
  revealSrc?: string
}

export function HeroProduct({
  src,
  alt,
  width,
  accent,
  amplitudeScale = 1,
  cinematic = false,
  revealSrc,
}: HeroProductProps) {
  const parallaxRef = useRef<HTMLDivElement>(null)
  const floatRef = useRef<HTMLDivElement>(null)
  const shadowRef = useRef<HTMLDivElement>(null)
  const revealRef = useRef<HTMLImageElement>(null)

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
        y: -18 * amplitudeScale,
        rotate: 2.2 * amplitudeScale,
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

  useEffect(() => {
    if (revealRef.current) {
      gsap.set(revealRef.current, { opacity: 0 })
    }
  }, [revealSrc])

  return (
    <div
      className={`pointer-events-none absolute left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 ${
        cinematic ? 'top-[60%]' : 'top-[46%]'
      }`}
      style={{ width: `min(${width}px, ${cinematic ? '46vw' : '58vw'})` }}
    >
      <div className="hero-product will-change-transform">
        <div ref={parallaxRef} className="will-change-transform">
          <div ref={floatRef} className="relative will-change-transform">
            <div
              aria-hidden
              className="absolute left-1/2 top-[40%] h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
              style={{
                background: `radial-gradient(circle, ${accent}66 0%, transparent 70%)`,
              }}
            />
            <img
              src={src}
              alt={alt}
              width={width}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              draggable={false}
              className="hero-product-base relative z-10 mx-auto h-auto w-full object-contain select-none drop-shadow-[0_40px_80px_rgba(0,0,0,0.55)]"
            />
            {revealSrc ? (
              <img
                ref={revealRef}
                src={revealSrc}
                alt=""
                aria-hidden
                width={width}
                loading="eager"
                decoding="async"
                draggable={false}
                className="hero-product-reveal pointer-events-none absolute inset-0 z-20 mx-auto h-auto w-full object-contain select-none drop-shadow-[0_40px_80px_rgba(0,0,0,0.55)]"
              />
            ) : null}
            <div
              ref={shadowRef}
              aria-hidden
              className="pointer-events-none absolute left-1/2 bottom-2 z-0 h-8 w-[48%] -translate-x-1/2 rounded-[100%] bg-black/65 blur-2xl will-change-transform"
              style={{ opacity: 0.5 }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
