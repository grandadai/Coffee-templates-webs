import { createContext } from 'react'

export type ParallaxValues = {
  x: number
  y: number
  rotateX: number
  rotateY: number
}

export type MouseParallaxContextValue = {
  subscribe: (cb: (values: ParallaxValues) => void) => () => void
  amplitudeScale: number
}

export const MouseParallaxContext = createContext<MouseParallaxContextValue | null>(
  null,
)
