import { useRef } from 'react'
import gsap from 'gsap'
import type { ThemeConfig } from '@/types/hero'
import { useMouseParallax } from '@/hooks/useMouseParallax'

type WebsiteMockupProps = {
  theme: ThemeConfig
}

export function WebsiteMockup({ theme }: WebsiteMockupProps) {
  const parallaxRef = useRef<HTMLDivElement>(null)
  const isCoffee = theme.id === 'coffee'
  const cinematic = theme.layout === 'cinematic'

  useMouseParallax(10, (x, y, rotateX, rotateY) => {
    if (!parallaxRef.current) return
    gsap.set(parallaxRef.current, {
      x,
      y,
      rotateX: rotateX * 0.8,
      rotateY: rotateY * 0.8,
      force3D: true,
    })
  })

  return (
    <div
      className={`pointer-events-none absolute left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 [perspective:1400px] ${
        cinematic
          ? 'top-[56%] w-[min(940px,96vw)]'
          : 'top-[48%] w-[min(720px,78vw)]'
      }`}
    >
      <div className="hero-mockup will-change-transform">
        <div ref={parallaxRef} className="will-change-transform">
          <div
            className="relative overflow-hidden rounded-[28px] border border-white/15 shadow-[0_50px_140px_rgba(0,0,0,0.6)] will-change-transform"
            style={{
              transform: cinematic
                ? 'rotateX(12deg) rotateY(-8deg) scale(1.02)'
                : 'rotateX(8deg) rotateY(-6deg)',
              background: isCoffee
                ? 'linear-gradient(165deg, rgba(78,48,30,0.95), rgba(24,14,10,0.97))'
                : 'linear-gradient(160deg, rgba(28,36,68,0.92), rgba(10,14,28,0.96))',
            }}
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
              </div>
              <div className="flex-1 rounded-full bg-white/8 px-3 py-1 text-[10px] tracking-wide text-white/55 sm:text-xs">
                {theme.mockup.browserUrl}
              </div>
            </div>

            <div
              className={`relative overflow-hidden p-5 sm:p-8 ${
                cinematic ? 'aspect-[16/11]' : 'aspect-[16/10]'
              }`}
            >
              <div
                className="absolute inset-0 opacity-85"
                style={{
                  background: isCoffee
                    ? 'radial-gradient(circle at 18% 18%, rgba(232,176,122,0.32), transparent 42%), radial-gradient(circle at 78% 72%, rgba(120,70,40,0.4), transparent 52%), linear-gradient(180deg, rgba(255,240,220,0.05), transparent 40%)'
                    : 'radial-gradient(circle at 20% 20%, rgba(124,92,255,0.28), transparent 45%), radial-gradient(circle at 80% 70%, rgba(65,209,255,0.2), transparent 50%)',
                }}
              />

              <div className="relative z-10 flex h-full flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-semibold tracking-[0.22em] text-white/80 sm:text-sm">
                    {theme.nav.logo}
                  </div>
                  <div className="hidden gap-4 text-[10px] text-white/45 sm:flex sm:text-xs">
                    {theme.nav.links.slice(0, 3).map((link) => (
                      <span key={link}>{link}</span>
                    ))}
                  </div>
                </div>

                <div className={cinematic ? 'mx-auto max-w-[58%] text-center' : 'max-w-[55%]'}>
                  <div
                    className={`mb-2 h-2 w-16 rounded-full ${cinematic ? 'mx-auto' : ''}`}
                    style={{ background: theme.colors.accent }}
                  />
                  <div className="mb-2 font-display text-xl font-semibold text-white sm:text-3xl">
                    {theme.mockup.title}
                  </div>
                  <div className="text-[11px] text-white/55 sm:text-sm">
                    {theme.mockup.subtitle}
                  </div>
                  <div className={`mt-4 flex gap-2 ${cinematic ? 'justify-center' : ''}`}>
                    <div
                      className="h-7 w-24 rounded-full sm:h-8 sm:w-28"
                      style={{ background: theme.colors.accent }}
                    />
                    <div className="h-7 w-16 rounded-full border border-white/20 sm:h-8 sm:w-20" />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {[0.4, 0.6, 0.45].map((opacity, i) => (
                    <div
                      key={i}
                      className="h-12 rounded-xl border border-white/10 bg-white/5 sm:h-16"
                      style={{ opacity }}
                    />
                  ))}
                </div>
              </div>

              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-transparent opacity-60"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -left-1/4 top-0 h-full w-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/12 to-transparent"
              />
            </div>
          </div>

          <div
            aria-hidden
            className="absolute left-1/2 -bottom-10 h-12 w-[80%] -translate-x-1/2 rounded-[100%] bg-black/55 blur-2xl"
          />
        </div>
      </div>
    </div>
  )
}
