import { useEffect, useMemo, useRef, type CSSProperties } from 'react'
import gsap from 'gsap'
import type { ThemeConfig } from '@/types/hero'
import { useBreakpoint } from '@/hooks/useMediaQuery'
import { BackgroundLayer } from './BackgroundLayer'
import { FloatingObject } from './FloatingObject'
import { HeroProduct } from './HeroProduct'
import { WebsiteMockup } from './WebsiteMockup'
import { ParticleLayer } from './ParticleLayer'
import { SmokeLayer } from './SmokeLayer'
import { MouseParallax } from './MouseParallax'
import { SplitTextHeading } from './SplitTextHeading'
import { useHeroAnimations } from '@/hooks/useHeroAnimations'
import { HeroAnimations } from './HeroAnimations'

type HeroProps = {
  theme: ThemeConfig
  onThemeChange?: (themeId: string) => void
  themes?: ThemeConfig[]
}

export function Hero({ theme, onThemeChange, themes = [] }: HeroProps) {
  const rootRef = useRef<HTMLElement>(null)
  const decorRef = useRef<HTMLDivElement>(null)
  const { isMobile, isTablet } = useBreakpoint()
  const amplitudeScale = isMobile ? 0.4 : 1

  useHeroAnimations({ rootRef, themeId: theme.id })

  const visibleFloats = useMemo(() => {
    return theme.floatingObjects.filter((item) => {
      if (isMobile && item.hideOnMobile) return false
      if ((isMobile || isTablet) && item.hideOnTablet) return false
      return true
    })
  }, [isMobile, isTablet, theme.floatingObjects])

  useEffect(() => {
    const el = decorRef.current
    if (!el || isMobile) return

    const tween = gsap.to(el, {
      y: 18,
      x: -10,
      duration: 14,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
    })

    return () => {
      tween.kill()
    }
  }, [isMobile, theme.id])

  return (
    <MouseParallax className="relative">
      <HeroAnimations />
      <section
        ref={rootRef}
        className="relative min-h-[100svh] w-full overflow-hidden"
        style={
          {
            '--hero-accent': theme.colors.accent,
            '--hero-accent-soft': theme.colors.accentSoft,
            '--hero-text': theme.colors.text,
            '--hero-muted': theme.colors.textMuted,
            color: theme.colors.text,
          } as CSSProperties
        }
      >
        <BackgroundLayer colors={theme.colors} />

        {/* Layer 2 - slow decorative shapes with independent movement */}
        <div
          ref={decorRef}
          className="pointer-events-none absolute inset-0 z-[5] will-change-transform"
          aria-hidden
        >
          <div
            className="absolute left-[6%] top-[40%] h-52 w-52 rounded-full border border-white/8"
            style={{ boxShadow: `inset 0 0 60px ${theme.colors.glow}` }}
          />
          <div className="absolute right-[8%] top-[60%] h-28 w-28 rotate-[18deg] rounded-[2rem] border border-white/10 bg-white/[0.03]" />
        </div>

        {/* Navigation */}
        <header className="hero-nav relative z-[60] mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-6 md:px-8">
          <div className="text-sm font-semibold tracking-[0.28em]">
            {theme.nav.logo}
          </div>
          <nav className="hidden items-center gap-8 text-sm text-[color:var(--hero-muted)] md:flex">
            {theme.nav.links.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="transition-colors duration-300 hover:text-white"
              >
                {link}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            {themes.length > 1 && (
              <div className="flex overflow-hidden rounded-full border border-white/15 bg-white/5 p-1 backdrop-blur-md">
                {themes.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onThemeChange?.(item.id)}
                    className={`rounded-full px-3 py-1.5 text-[11px] tracking-wide transition-all duration-300 ${
                      item.id === theme.id
                        ? 'bg-white text-black'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {item.id === 'coffee' ? 'Coffee' : 'Agency'}
                  </button>
                ))}
              </div>
            )}
            <a
              href="#contact"
              className="rounded-full px-4 py-2 text-xs font-medium text-black transition-transform duration-300 hover:scale-[1.03] md:text-sm"
              style={{ background: theme.colors.accent }}
            >
              {theme.nav.cta}
            </a>
          </div>
        </header>

        {/* Stage with layered depth */}
        <div className="hero-stage relative z-10 mx-auto flex min-h-[calc(100svh-88px)] max-w-7xl flex-col px-5 pb-16 pt-4 md:px-8 lg:flex-row lg:items-center lg:gap-8">
          <div className="hero-copy relative z-[55] w-full max-w-xl pt-4 lg:pt-0">
            <p className="mb-4 text-xs font-medium tracking-[0.28em] text-[color:var(--hero-muted)] uppercase">
              {theme.tagline}
            </p>

            <SplitTextHeading
              line1={theme.headline.line1}
              line2={theme.headline.line2}
              accent={theme.headline.accent}
              className="font-display text-[clamp(2.4rem,6vw,5rem)] leading-[1.05] font-semibold tracking-[-0.03em]"
            />

            <p className="hero-sub mt-5 max-w-md text-sm leading-relaxed text-[color:var(--hero-muted)] md:text-base">
              {theme.subheadline}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {theme.buttons.map((button) => (
                <a
                  key={button.label}
                  href={button.href ?? '#work'}
                  className={`hero-cta inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition-transform duration-300 will-change-transform hover:scale-[1.03] ${
                    button.variant === 'primary'
                      ? 'text-black'
                      : 'border border-white/20 bg-white/5 text-white backdrop-blur-md'
                  }`}
                  style={
                    button.variant === 'primary'
                      ? { background: theme.colors.accent }
                      : undefined
                  }
                >
                  {button.label}
                </a>
              ))}
            </div>
          </div>

          <div className="relative mt-10 h-[52vh] min-h-[360px] w-full flex-1 lg:mt-0 lg:h-[70vh]">
            <WebsiteMockup theme={theme} />

            <HeroProduct
              src={theme.product.src}
              alt={theme.product.alt}
              width={theme.product.width}
              accent={theme.colors.accent}
              amplitudeScale={amplitudeScale}
            />

            {visibleFloats.map((item) => (
              <FloatingObject
                key={`${theme.id}-${item.id}`}
                config={item}
                amplitudeScale={amplitudeScale}
                eager={item.depth > 1}
              />
            ))}

            <ParticleLayer
              count={theme.particles.count}
              colors={theme.particles.colors}
              enabled={!isMobile}
            />

            <SmokeLayer
              color={theme.smoke.color}
              enabled={theme.smoke.enabled && !isMobile}
            />
          </div>
        </div>
      </section>
    </MouseParallax>
  )
}
