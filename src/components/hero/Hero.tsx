import { useEffect, useMemo, useRef, type CSSProperties } from 'react'
import gsap from 'gsap'
import type { ThemeConfig } from '@/types/hero'
import { useBreakpoint } from '@/hooks/useMediaQuery'
import { useHeroAnimations } from '@/hooks/useHeroAnimations'
import { BackgroundLayer } from './BackgroundLayer'
import { FloatingObject } from './FloatingObject'
import { HeroProduct } from './HeroProduct'
import { WebsiteMockup } from './WebsiteMockup'
import { ParticleLayer } from './ParticleLayer'
import { SmokeLayer } from './SmokeLayer'
import { MouseParallax } from './MouseParallax'
import { SplitTextHeading } from './SplitTextHeading'
import { HeroAnimations } from './HeroAnimations'
import { CoffeeRitual } from './CoffeeRitual'
import { useCoffeeRitualScroll } from '@/hooks/useCoffeeRitualScroll'

type HeroProps = {
  theme: ThemeConfig
  onThemeChange?: (themeId: string) => void
  themes?: ThemeConfig[]
}

function ThemeToggle({
  themes,
  activeId,
  onThemeChange,
}: {
  themes: ThemeConfig[]
  activeId: string
  onThemeChange?: (themeId: string) => void
}) {
  if (themes.length <= 1) return null
  return (
    <div className="flex overflow-hidden rounded-full border border-white/15 bg-white/5 p-1 backdrop-blur-md">
      {themes.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onThemeChange?.(item.id)}
          className={`rounded-full px-3 py-1.5 text-[11px] tracking-wide transition-all duration-300 ${
            item.id === activeId
              ? 'bg-white text-black'
              : 'text-white/70 hover:text-white'
          }`}
        >
          {item.id === 'coffee' ? 'Coffee' : 'Agency'}
        </button>
      ))}
    </div>
  )
}

export function Hero({ theme, onThemeChange, themes = [] }: HeroProps) {
  const rootRef = useRef<HTMLElement>(null)
  const decorRef = useRef<HTMLDivElement>(null)
  const { isMobile, isTablet } = useBreakpoint()
  const amplitudeScale = isMobile ? 0.4 : 1
  const cinematic = theme.layout === 'cinematic'

  useHeroAnimations({
    rootRef,
    themeId: theme.id,
    layout: theme.layout,
  })

  useCoffeeRitualScroll({
    rootRef,
    enabled: cinematic && theme.id === 'coffee',
    themeId: theme.id,
  })

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

    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (media.matches) return

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
      <div
        id={cinematic ? 'coffee-ritual-pin' : undefined}
        className={cinematic ? 'relative h-[280vh]' : 'relative'}
      >
        <section
          ref={rootRef}
          className={`coffee-stage-pin relative w-full overflow-hidden ${
            cinematic ? 'h-[100svh]' : 'min-h-[100svh]'
          }`}
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

          <header className="hero-nav relative z-[60] mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 md:px-8">
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
              <ThemeToggle
                themes={themes}
                activeId={theme.id}
                onThemeChange={onThemeChange}
              />
              <a
                href="#contact"
                className="rounded-full px-4 py-2 text-xs font-medium text-black transition-transform duration-300 hover:scale-[1.03] md:text-sm"
                style={{ background: theme.colors.accent }}
              >
                {theme.nav.cta}
              </a>
            </div>
          </header>

          {cinematic ? (
            <>
              {/* Full-bleed cinematic stage — Instagram reel composition */}
              <div className="pointer-events-none absolute inset-0 z-10">
                <WebsiteMockup theme={theme} />
                <HeroProduct
                  src={theme.product.src}
                  alt={theme.product.alt}
                  width={theme.product.width}
                  accent={theme.colors.accent}
                  amplitudeScale={amplitudeScale}
                  cinematic
                  revealSrc={theme.product.revealSrc}
                />
                {visibleFloats.map((item) => (
                  <FloatingObject
                    key={`${theme.id}-${item.id}`}
                    config={item}
                    amplitudeScale={amplitudeScale}
                    eager={item.depth > 1 || item.ritual === 'bean'}
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
                  cinematic
                />
              </div>

              {/* Compact overlay copy — kept above the product stage */}
              <div className="hero-copy pointer-events-none absolute inset-x-0 top-[4.6rem] z-[55] mx-auto max-w-3xl px-5 text-center md:top-[4.8rem]">
                <p className="mb-2 text-[10px] font-medium tracking-[0.28em] text-[color:var(--hero-muted)] uppercase md:text-xs">
                  {theme.tagline}
                </p>
                <SplitTextHeading
                  line1={theme.headline.line1}
                  line2={theme.headline.line2}
                  accent={theme.headline.accent}
                  className="font-display text-[clamp(1.9rem,4.8vw,3.6rem)] leading-[1.05] font-semibold tracking-[-0.03em] drop-shadow-[0_8px_40px_rgba(0,0,0,0.55)]"
                />
                <p className="hero-sub mx-auto mt-2 hidden max-w-md text-[11px] leading-relaxed text-[color:var(--hero-muted)] md:block md:text-sm">
                  {theme.subheadline}
                </p>
              </div>

              <div className="pointer-events-none absolute inset-x-0 bottom-16 z-[56] flex justify-center gap-3 px-5 md:bottom-20">
                {theme.buttons.map((button) => (
                  <a
                    key={button.label}
                    href={button.href ?? '#work'}
                    className={`hero-cta pointer-events-auto inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium transition-transform duration-300 will-change-transform hover:scale-[1.03] ${
                      button.variant === 'primary'
                        ? 'text-black shadow-[0_10px_40px_rgba(0,0,0,0.35)]'
                        : 'border border-white/20 bg-black/30 text-white backdrop-blur-md'
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

              <CoffeeRitual
                steps={theme.ritualSteps ?? []}
                enabled={Boolean(theme.ritualSteps?.length)}
              />
            </>
          ) : (
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
                  revealSrc={theme.product.revealSrc}
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
          )}
        </section>
      </div>
    </MouseParallax>
  )
}
