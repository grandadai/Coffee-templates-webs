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
      const milk = root.querySelectorAll('[data-ritual="milk"]')
      const ice = root.querySelectorAll('[data-ritual="ice"]')
      const sugar = root.querySelectorAll('[data-ritual="sugar"]')
      const splash = root.querySelectorAll('[data-ritual="splash"]')
      const beans = root.querySelectorAll('[data-ritual="bean"]')
      const copy = root.querySelector('.hero-copy')

      gsap.set(milk, { opacity: 0, y: -40, scaleY: 0.4, transformOrigin: '50% 0%' })
      gsap.set(ice, { opacity: 0, y: -120, rotate: -20 })
      gsap.set(sugar, { opacity: 0, scale: 0.7, y: -30 })
      gsap.set(splash, { opacity: 0, scale: 0.6 })
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

      // 0.00–0.18 steam intensifies, mockup settles back
      tl.to(steam, { opacity: 0.28, y: -40, stagger: 0.05, ease: 'none' }, 0)
        .to(
          mockup,
          {
            y: 40,
            scale: 0.92,
            opacity: 0.72,
            rotateX: 12,
            ease: 'none',
          },
          0,
        )
        .to(product, { scale: 1.08, y: -10, ease: 'none' }, 0)

      // 0.15–0.38 milk flows in
      tl.to(
        milk,
        {
          opacity: 1,
          y: 30,
          scaleY: 1,
          duration: 0.22,
          ease: 'none',
        },
        0.15,
      )
        .to(
          splash,
          {
            opacity: 0.9,
            scale: 1,
            duration: 0.18,
            ease: 'none',
          },
          0.28,
        )

      // 0.35–0.55 ice cubes drop
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
        0.35,
      )

      // 0.50–0.70 sugar dissolves
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
        0.5,
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
        0.62,
      )

      // 0.65–1.00 beans keep orbiting outward, product stays hero
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
        0.65,
      )
        .to(
          copy,
          {
            opacity: 0.2,
            y: -30,
            ease: 'none',
          },
          0.55,
        )
        .to(
          mockup,
          {
            opacity: 0.4,
            scale: 0.86,
            y: 80,
            ease: 'none',
          },
          0.7,
        )
        .to(
          product,
          {
            scale: 1.14,
            y: -18,
            ease: 'none',
          },
          0.7,
        )
        .to(steam, { opacity: 0.38, y: -70, ease: 'none' }, 0.75)
    }, root)

    return () => ctx.revert()
  }, [enabled, rootRef, themeId])
}
