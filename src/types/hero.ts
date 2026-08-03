export type ButtonVariant = 'primary' | 'secondary'
export type HeroLayout = 'split' | 'cinematic'

export type HeroButton = {
  label: string
  variant: ButtonVariant
  href?: string
}

export type FloatingAssetConfig = {
  id: string
  src: string
  alt: string
  /** Horizontal position as percentage of hero width */
  x: number
  /** Vertical position as percentage of hero height */
  y: number
  width: number
  /** Parallax depth multiplier for mouse (foreground ~1, mid ~0.5) */
  depth: number
  /** Base rotation in degrees */
  rotate: number
  /** Idle float duration in seconds (4–12) */
  floatDuration: number
  /** Idle float delay in seconds */
  floatDelay: number
  /** Vertical float amplitude in px */
  floatAmplitude: number
  /** Horizontal float amplitude in px */
  floatAmplitudeX?: number
  /** Rotation drift in degrees during float */
  floatRotate?: number
  /** Scroll parallax speed multiplier */
  scrollSpeed: number
  zIndex: number
  hideOnTablet?: boolean
  hideOnMobile?: boolean
  /** Optional ritual role for scroll choreography */
  ritual?: 'bean' | 'ice' | 'sugar' | 'milk' | 'splash' | 'decor'
}

export type ThemeColors = {
  bgFrom: string
  bgVia: string
  bgTo: string
  accent: string
  accentSoft: string
  text: string
  textMuted: string
  glow: string
  vignette: string
  particle: string[]
  smoke: string
}

export type ThemeConfig = {
  id: string
  name: string
  tagline: string
  layout: HeroLayout
  nav: {
    logo: string
    links: string[]
    cta: string
  }
  headline: {
    line1: string
    line2: string
    accent: string
  }
  subheadline: string
  buttons: HeroButton[]
  colors: ThemeColors
  mockup: {
    title: string
    subtitle: string
    browserUrl: string
  }
  product: {
    src: string
    alt: string
    width: number
    /** Optional inset screenshot shown inside the mockup behind the product */
    mockupImage?: string
    /** Optional ritual reveal image (e.g. pour + splash composite) */
    revealSrc?: string
  }
  floatingObjects: FloatingAssetConfig[]
  particles: {
    count: number
    colors: string[]
  }
  smoke: {
    enabled: boolean
    color: string
  }
  /** Labels shown during the coffee ritual scroll sequence */
  ritualSteps?: string[]
}
