import { useContext, useEffect } from 'react'
import { MouseParallaxContext } from '@/components/hero/mouseParallaxContext'

export function useMouseParallax(
  strength: number,
  onFrame: (x: number, y: number, rotateX: number, rotateY: number) => void,
) {
  const ctx = useContext(MouseParallaxContext)

  useEffect(() => {
    if (!ctx) return
    return ctx.subscribe((values) => {
      const scale = strength * ctx.amplitudeScale
      onFrame(
        values.x * scale,
        values.y * scale,
        values.rotateX * Math.min(1, strength / 18),
        values.rotateY * Math.min(1, strength / 18),
      )
    })
  }, [ctx, onFrame, strength])
}
