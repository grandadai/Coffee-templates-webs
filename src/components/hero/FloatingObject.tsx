import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import type { FloatingAssetConfig } from '@/types/hero'
import { useMouseParallax } from '@/hooks/useMouseParallax'

type FloatingObjectProps = {
  config: FloatingAssetConfig
  amplitudeScale?: number
  eager?: boolean
}

export function FloatingObject({
  config,
  amplitudeScale = 1,
  eager = false,
}: FloatingObjectProps) {
  const parallaxRef = useRef<HTMLDivElement>(null)
  const floatRef = useRef<HTMLDivElement>(null)
  const shadowRef = useRef<HTMLDivElement>(null)

  useMouseParallax(30 * config.depth, (x, y, rotateX, rotateY) => {
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

    const duration = config.floatDuration
    const ampY = config.floatAmplitude * amplitudeScale
    const ampX = (config.floatAmplitudeX ?? config.floatAmplitude * 0.45) * amplitudeScale
    const rot = (config.floatRotate ?? 0) * amplitudeScale

    const tl = gsap.timeline({
      repeat: -1,
      yoyo: true,
      defaults: { ease: 'sine.inOut' },
    })

    tl.to(
      el,
      {
        y: -ampY,
        x: ampX,
        rotate: config.rotate + rot,
        duration,
        delay: config.floatDelay,
      },
      0,
    )

    tl.to(
      shadow,
      {
        opacity: 0.22,
        scaleX: 0.85,
        x: ampX * 0.35,
        duration,
        delay: config.floatDelay,
      },
      0,
    )

    return () => {
      tl.kill()
    }
  }, [amplitudeScale, config])

  return (
    <div
      className="pointer-events-none absolute"
      style={{
        left: `${config.x}%`,
        top: `${config.y}%`,
        width: config.width,
        zIndex: config.zIndex,
        transform: 'translate3d(-50%, -50%, 0)',
      }}
    >
      <div
        className="hero-float-item will-change-transform"
        data-scroll-speed={config.scrollSpeed}
        data-ritual={config.ritual}
      >
        <div ref={parallaxRef} className="will-change-transform">
          <div ref={floatRef} className="relative will-change-transform">
            <img
              src={config.src}
              alt={config.alt}
              width={config.width}
              height={config.width}
              loading={eager ? 'eager' : 'lazy'}
              decoding="async"
              draggable={false}
              className="pointer-events-none h-auto w-full object-contain select-none"
              style={{ transform: `rotate(${config.rotate}deg)` }}
            />
            <div
              ref={shadowRef}
              aria-hidden
              className="pointer-events-none absolute left-1/2 -bottom-3 h-4 w-[70%] -translate-x-1/2 rounded-[100%] bg-black/50 blur-md will-change-transform"
              style={{ opacity: 0.35 }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
