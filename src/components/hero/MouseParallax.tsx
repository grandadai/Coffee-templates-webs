import { useEffect, useMemo, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { useBreakpoint } from '@/hooks/useMediaQuery'
import {
  MouseParallaxContext,
  type MouseParallaxContextValue,
  type ParallaxValues,
} from './mouseParallaxContext'

type MouseParallaxProps = {
  children: ReactNode
  className?: string
}

export function MouseParallax({ children, className }: MouseParallaxProps) {
  const { isMobile } = useBreakpoint()
  const listeners = useRef(new Set<(values: ParallaxValues) => void>())
  const target = useRef({ x: 0, y: 0 })
  const current = useRef<ParallaxValues>({
    x: 0,
    y: 0,
    rotateX: 0,
    rotateY: 0,
  })

  const amplitudeScale = isMobile ? 0.4 : 1

  useEffect(() => {
    if (isMobile) {
      target.current = { x: 0, y: 0 }
      return
    }

    const onMove = (event: PointerEvent) => {
      const nx = (event.clientX / window.innerWidth) * 2 - 1
      const ny = (event.clientY / window.innerHeight) * 2 - 1
      target.current.x = nx
      target.current.y = ny
    }

    const onLeave = () => {
      target.current.x = 0
      target.current.y = 0
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
    }
  }, [isMobile])

  useEffect(() => {
    const tick = () => {
      current.current.x = gsap.utils.interpolate(
        current.current.x,
        target.current.x,
        0.06,
      )
      current.current.y = gsap.utils.interpolate(
        current.current.y,
        target.current.y,
        0.06,
      )
      current.current.rotateY = gsap.utils.clamp(
        -5,
        5,
        current.current.x * 5 * amplitudeScale,
      )
      current.current.rotateX = gsap.utils.clamp(
        -5,
        5,
        -current.current.y * 5 * amplitudeScale,
      )

      listeners.current.forEach((listener) => listener(current.current))
    }

    gsap.ticker.add(tick)
    return () => {
      gsap.ticker.remove(tick)
    }
  }, [amplitudeScale])

  const value = useMemo<MouseParallaxContextValue>(
    () => ({
      amplitudeScale,
      subscribe: (cb) => {
        listeners.current.add(cb)
        return () => {
          listeners.current.delete(cb)
        }
      },
    }),
    [amplitudeScale],
  )

  return (
    <MouseParallaxContext.Provider value={value}>
      <div className={className}>{children}</div>
    </MouseParallaxContext.Provider>
  )
}
