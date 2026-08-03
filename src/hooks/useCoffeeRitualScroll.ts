import { useEffect, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type UseCoffeeRitualScrollOptions = {
  rootRef: RefObject<HTMLElement | null>
  enabled: boolean
  themeId?: string
}

export function useCoffeeRitualScroll({
  rootRef,
  enabled,
  themeId,
}: UseCoffeeRitualScrollOptions) {
  useEffect(() => {
    const root = rootRef.current
    if (!root || !enabled) return

    const pin = document.querySelector('#coffee-ritual-pin')
    if (!pin) return

    const ctx = gsap.context(() => {
      const mockup = root.querySelector('.hero-mockup')
      const product = root.querySelector('.hero-product')
      const steam = root.querySelectorAll('.smoke-puff')
      const ice = root.querySelectorAll('[data-ritual="ice"]')
      const sugar = root.querySelectorAll('[data-ritual="sugar"]')
      const splash = root.querySelectorAll('[data-ritual="splash"]')
      const beans = root.querySelectorAll('[data-ritual="bean"]')
      const copy = root.querySelector('.hero-copy')
      const cta = root.querySelectorAll('.hero-cta')

      gsap.set(ice, { opacity: 0, y: -120, rotate: -20 })
      gsap.set(sugar, { opacity: 0, scale: 0.7, y: -30 })
      gsap.set(splash, { opacity: 0, scale: 0.55, y: 30 })
      gsap.set(steam, { opacity: 0.08 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pin,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          pin: root,
          anticipatePin: 1,
        },
      })

      // Steam + stage depth
      tl.to(steam, { opacity: 0.3, y: -40, stagger: 0.05, ease: 'none' }, 0)
        .to(
          mockup,
          {
            y: 40,
            scale: 0.9,
            opacity: 0.65,
            rotateX: 12,
            ease: 'none',
          },
          0,
        )
        .to(product, { scale: 1.06, y: -8, ease: 'none' }, 0)

      // Dominant splash burst (milk/coffee splash moment)
      tl.to(
        splash,
        {
          opacity: 1,
          scale: 1.2,
          y: 0,
          stagger: 0.06,
          duration: 0.28,
          ease: 'none',
        },
        0.12,
      )
        .to(
          product,
          {
            scale: 1.14,
            y: -18,
            duration: 0.28,
            ease: 'none',
          },
          0.12,
        )
        .to(
          cta,
          {
            opacity: 0.12,
            y: 18,
            duration: 0.2,
            ease: 'none',
          },
          0.18,
        )
        .to(
          splash,
          {
            scale: 1.08,
            opacity: 1,
            duration: 0.22,
            ease: 'none',
          },
          0.4,
        )

      // Ice cubes drop
      tl.to(
        ice,
        {
          opacity: 1,
          y: 90,
          rotate: 12,
          stagger: 0.04,
          duration: 0.2,
          ease: 'none',
        },
        0.38,
      )

      // Sugar dissolves
      tl.to(
        sugar,
        {
          opacity: 1,
          y: 40,
          scale: 1,
          duration: 0.12,
          stagger: 0.03,
          ease: 'none',
        },
        0.52,
      ).to(
        sugar,
        {
          opacity: 0,
          scale: 0.35,
          y: 70,
          duration: 0.18,
          stagger: 0.03,
          ease: 'none',
        },
        0.64,
      )

      // Beans orbit + keep splash dominant
      tl.to(
        beans,
        {
          x: (i) => (i % 2 === 0 ? -36 : 40),
          y: (i) => (i % 2 === 0 ? -28 : 24),
          opacity: 1,
          scale: 1.05,
          stagger: 0.03,
          ease: 'none',
        },
        0.68,
      )
        .to(
          copy,
          {
            opacity: 0.18,
            y: -30,
            ease: 'none',
          },
          0.55,
        )
        .to(
          mockup,
          {
            opacity: 0.35,
            scale: 0.84,
            y: 90,
            ease: 'none',
          },
          0.7,
        )
        .to(
          splash,
          {
            scale: 1.16,
            opacity: 0.95,
            y: -8,
            ease: 'none',
          },
          0.7,
        )
        .to(
          product,
          {
            scale: 1.18,
            y: -22,
            ease: 'none',
          },
          0.7,
        )
        .to(steam, { opacity: 0.38, y: -70, ease: 'none' }, 0.75)
    }, root)

    return () => ctx.revert()
  }, [enabled, rootRef, themeId])
}
