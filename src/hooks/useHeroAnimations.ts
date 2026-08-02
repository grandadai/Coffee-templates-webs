import { useEffect, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type UseHeroAnimationsOptions = {
  rootRef: RefObject<HTMLElement | null>
  enabled?: boolean
  themeId?: string
}

export function useHeroAnimations({
  rootRef,
  enabled = true,
  themeId,
}: UseHeroAnimationsOptions) {
  useEffect(() => {
    const root = rootRef.current
    if (!root || !enabled) return

    const ctx = gsap.context(() => {
      const nav = root.querySelector('.hero-nav')
      const mockup = root.querySelector('.hero-mockup')
      const product = root.querySelector('.hero-product')
      const floats = root.querySelectorAll('.hero-float-item')
      const chars = root.querySelectorAll('.hero-split-char')
      const buttons = root.querySelectorAll('.hero-cta')
      const sub = root.querySelector('.hero-sub')
      const bg = root.querySelector('.hero-bg')

      gsap.set(bg, { opacity: 0 })
      gsap.set(mockup, { opacity: 0, scale: 0.92 })
      gsap.set(product, { opacity: 0, y: 40, scale: 0.8 })
      gsap.set(floats, { opacity: 0, y: 28, scale: 0.9 })
      gsap.set(chars, { yPercent: 120, opacity: 0 })
      gsap.set([buttons, sub], { opacity: 0, y: 24 })
      gsap.set(nav, { opacity: 0, y: -24 })

      const intro = gsap.timeline({
        defaults: { ease: 'power3.out' },
      })

      intro
        .to(bg, { opacity: 1, duration: 0.7 }, 0)
        .to(nav, { opacity: 1, y: 0, duration: 0.7 }, 0.15)
        .to(mockup, { opacity: 1, scale: 1, duration: 1.05 }, 0.2)
        .to(product, { opacity: 1, y: 0, scale: 1, duration: 1.05 }, 0.35)
        .to(
          floats,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            stagger: 0.08,
          },
          0.55,
        )
        .to(
          chars,
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.045,
          },
          0.45,
        )
        .to(sub, { opacity: 1, y: 0, duration: 0.6 }, 0.85)
        .to(
          buttons,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
          },
          0.95,
        )

      if (mockup && product) {
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.1,
          },
        })

        scrollTl
          .to(
            mockup,
            {
              y: -80,
              scale: 0.9,
              opacity: 0.55,
              rotateX: 14,
              ease: 'none',
            },
            0,
          )
          .to(
            product,
            {
              y: -20,
              scale: 1.04,
              ease: 'none',
            },
            0,
          )
          .to(
            floats,
            {
              y: (_index, target) => {
                const speed = Number(
                  (target as HTMLElement).dataset.scrollSpeed ?? 1,
                )
                return -40 * speed
              },
              opacity: 0.35,
              scale: 0.96,
              ease: 'none',
              stagger: {
                each: 0.02,
                from: 'random',
              },
            },
            0,
          )
          .to(
            root.querySelector('.hero-copy'),
            {
              y: -60,
              opacity: 0.15,
              ease: 'none',
            },
            0,
          )
      }
    }, root)

    return () => {
      ctx.revert()
    }
  }, [enabled, rootRef, themeId])
}
