import { useRef } from 'react'
import gsap from 'gsap'
import type { ThemeColors } from '@/types/hero'
import { useMouseParallax } from '@/hooks/useMouseParallax'

type BackgroundLayerProps = {
  colors: ThemeColors
}

export function BackgroundLayer({ colors }: BackgroundLayerProps) {
  const layerRef = useRef<HTMLDivElement>(null)

  useMouseParallax(5, (x, y) => {
    if (!layerRef.current) return
    gsap.set(layerRef.current, {
      x,
      y,
      force3D: true,
    })
  })

  return (
    <div className="hero-bg absolute inset-0 z-0 overflow-hidden will-change-transform">
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(165deg, ${colors.bgFrom} 0%, ${colors.bgVia} 48%, ${colors.bgTo} 100%)`,
        }}
      />

      <div ref={layerRef} className="absolute inset-0 will-change-transform">
        <div
          className="absolute -left-[10%] top-[8%] h-[48vw] w-[48vw] rounded-full blur-[90px]"
          style={{ background: colors.glow, opacity: 0.55 }}
        />
        <div
          className="absolute -right-[8%] top-[28%] h-[42vw] w-[42vw] rounded-full blur-[100px]"
          style={{ background: colors.accentSoft, opacity: 0.22 }}
        />
        <div
          className="absolute bottom-[-10%] left-[30%] h-[36vw] w-[36vw] rounded-full blur-[110px]"
          style={{ background: colors.accent, opacity: 0.16 }}
        />
      </div>

      {/* Decorative slow shapes layer */}
      <div className="hero-decor-shapes pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute left-[8%] top-[18%] h-40 w-40 rounded-full border border-white/10" />
        <div className="absolute right-[12%] top-[22%] h-24 w-24 rotate-12 rounded-3xl border border-white/10" />
        <div className="absolute bottom-[18%] left-[18%] h-16 w-16 rounded-full bg-white/5 blur-sm" />
      </div>

      {/* Vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center, transparent 40%, ${colors.vignette} 100%)`,
        }}
      />

      {/* Film grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.045] mix-blend-overlay"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
        }}
      />
    </div>
  )
}
