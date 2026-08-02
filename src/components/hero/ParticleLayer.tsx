import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useBreakpoint } from '@/hooks/useMediaQuery'

type ParticleLayerProps = {
  count: number
  colors: string[]
  enabled?: boolean
}

type Particle = {
  id: number
  left: number
  top: number
  size: number
  color: string
  duration: number
  delay: number
  opacity: number
  x: number
  y: number
}

function createParticles(count: number, colors: string[]): Particle[] {
  return Array.from({ length: count }, (_, id) => {
    const seed = (id + 1) * 9301 + 49297
    const rand = (offset: number) => {
      const value = Math.sin(seed * (offset + 1.7)) * 10000
      return value - Math.floor(value)
    }

    return {
      id,
      left: rand(1) * 100,
      top: rand(2) * 100,
      size: 1.5 + rand(3) * 3.5,
      color: colors[Math.floor(rand(4) * colors.length)] ?? colors[0],
      duration: 4 + rand(5) * 8,
      delay: rand(6) * 4,
      opacity: 0.2 + rand(7) * 0.55,
      x: (rand(8) - 0.5) * 40,
      y: (rand(9) - 0.5) * 50,
    }
  })
}

export function ParticleLayer({
  count,
  colors,
  enabled = true,
}: ParticleLayerProps) {
  const { isMobile, isTablet } = useBreakpoint()

  const particles = useMemo(() => {
    const reduced = isMobile ? Math.floor(count * 0.35) : isTablet ? Math.floor(count * 0.65) : count
    return createParticles(enabled ? reduced : 0, colors)
  }, [colors, count, enabled, isMobile, isTablet])

  if (!enabled || particles.length === 0) return null

  return (
    <div className="pointer-events-none absolute inset-0 z-[25] overflow-hidden">
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute rounded-full will-change-transform"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: particle.size,
            height: particle.size,
            background: particle.color,
            boxShadow: `0 0 ${particle.size * 3}px ${particle.color}`,
            opacity: particle.opacity,
          }}
          animate={{
            x: [0, particle.x, 0],
            y: [0, particle.y, 0],
            opacity: [particle.opacity * 0.4, particle.opacity, particle.opacity * 0.4],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Soft dust glows */}
      {!isMobile && (
        <>
          <div
            className="absolute left-[18%] top-[30%] h-40 w-40 rounded-full blur-3xl"
            style={{ background: colors[0], opacity: 0.12 }}
          />
          <div
            className="absolute right-[16%] top-[55%] h-48 w-48 rounded-full blur-3xl"
            style={{ background: colors[1] ?? colors[0], opacity: 0.1 }}
          />
        </>
      )}
    </div>
  )
}
