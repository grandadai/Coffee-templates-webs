import { useMemo, useState } from 'react'
import { Hero } from '@/components/hero'
import { Reveal, SplitHeading } from '@/components/motion'
import { themeList, themes } from '@/config/themes'
import type { ThemeConfig } from '@/types/hero'

function FeatureSection({ theme }: { theme: ThemeConfig }) {
  const cards = useMemo(
    () => [
      {
        title: 'Layered depth system',
        body: 'Seven independent layers respond to mouse, scroll, and idle motion with unique speeds and amplitudes.',
      },
      {
        title: 'Client-swappable assets',
        body: 'Reuse the same cinematic engine for coffee, jewelry, footwear, real estate, or your agency — only the config changes.',
      },
      {
        title: 'Performance-first motion',
        body: 'Transforms and opacity only, GPU-accelerated, Lenis-smoothed, and tuned to hold a buttery 60 FPS feel.',
      },
    ],
    [],
  )

  return (
    <section
      id="work"
      className="relative z-10 border-t border-white/10 px-5 py-28 md:px-8"
      style={{
        background: `linear-gradient(180deg, ${theme.colors.bgTo}, ${theme.colors.bgFrom})`,
        color: theme.colors.text,
      }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 max-w-2xl">
          <Reveal duration={0.85}>
            <p className="mb-3 text-xs tracking-[0.28em] text-white/50 uppercase">
              The system
            </p>
          </Reveal>
          <SplitHeading className="font-display text-3xl font-semibold tracking-tight md:text-5xl">
            One animation architecture. Infinite brand expressions.
          </SplitHeading>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {cards.map((card, index) => (
            <Reveal key={card.title} delay={index * 0.08} duration={0.9 + index * 0.05}>
              <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md transition-transform duration-500 hover:-translate-y-1">
                <div
                  className="mb-5 h-1.5 w-12 rounded-full"
                  style={{ background: theme.colors.accent }}
                />
                <h3 className="mb-3 text-lg font-medium">{card.title}</h3>
                <p className="text-sm leading-relaxed text-white/60">{card.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function MethodSection({ theme }: { theme: ThemeConfig }) {
  return (
    <section
      id="method"
      className="px-5 py-28 md:px-8"
      style={{
        background: theme.colors.bgFrom,
        color: theme.colors.text,
      }}
    >
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <Reveal duration={0.85}>
            <p className="mb-3 text-xs tracking-[0.28em] text-white/50 uppercase">
              Suggested for your business
            </p>
          </Reveal>
          <SplitHeading className="font-display text-3xl font-semibold tracking-tight md:text-5xl">
            Custom assets. Same cinematic engine.
          </SplitHeading>
          <Reveal delay={0.1} duration={0.95}>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/60 md:text-base">
              Instead of always animating coffee beans and cups, swap the stage for each
              client: diamonds for jewelry, a shoe emerging from a product page, a house
              rising from a listing, or UI cards for your agency.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-3">
          {[
            ['Jewelry', 'Floating diamonds, gold rings, light flares'],
            ['Footwear', 'Hero shoe out of screen + leather textures'],
            ['Real estate', 'Architectural house with soft plan overlays'],
            ['Agency', 'Mockup + UI cards, cursors, analytics glow'],
          ].map(([title, body], index) => (
            <Reveal key={title} delay={index * 0.06} duration={0.85}>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4">
                <div className="text-sm font-medium" style={{ color: theme.colors.accent }}>
                  {title}
                </div>
                <div className="mt-1 text-sm text-white/60">{body}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function App() {
  const [themeId, setThemeId] = useState('coffee')
  const theme = themes[themeId] ?? themes.coffee

  return (
    <div className="min-h-screen bg-[#05070F] text-white antialiased">
      <Hero theme={theme} themes={themeList} onThemeChange={setThemeId} />
      <FeatureSection theme={theme} />
      <MethodSection theme={theme} />

      <Reveal
        as="footer"
        id="contact"
        className="border-t border-white/10 px-5 py-10 text-sm text-white/45 md:px-8"
        style={{ background: theme.colors.bgTo }}
        duration={0.8}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="tracking-[0.22em]">{theme.nav.logo}</div>
          <div>Cinematic hero system · React · GSAP · Lenis · Tailwind</div>
        </div>
      </Reveal>
    </div>
  )
}
