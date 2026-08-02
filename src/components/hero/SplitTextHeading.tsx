import { useMemo, type CSSProperties } from 'react'

type SplitTextHeadingProps = {
  line1: string
  line2: string
  accent: string
  className?: string
  style?: CSSProperties
}

function splitWords(text: string) {
  return text.split(' ').filter(Boolean)
}

export function SplitTextHeading({
  line1,
  line2,
  accent,
  className,
  style,
}: SplitTextHeadingProps) {
  const lineOneWords = useMemo(() => splitWords(line1), [line1])
  const lineTwoWords = useMemo(
    () =>
      splitWords(line2).map((word) => ({
        word,
        isAccent: accent.toLowerCase().includes(word.toLowerCase()),
      })),
    [accent, line2],
  )

  return (
    <h1 className={className} style={style} aria-label={`${line1} ${line2}`}>
      <span className="block overflow-hidden pb-1">
        {lineOneWords.map((word, wordIndex) => (
          <span key={`l1-${word}`} className="inline-block overflow-hidden">
            <span
              className="hero-split-char inline-block will-change-transform"
              data-word={wordIndex}
            >
              {word}
              {wordIndex < lineOneWords.length - 1 ? '\u00A0' : ''}
            </span>
          </span>
        ))}
      </span>
      <span className="block overflow-hidden">
        {lineTwoWords.map(({ word, isAccent }, wordIndex) => (
          <span key={`l2-${word}`} className="inline-block overflow-hidden">
            <span
              className={`hero-split-char inline-block will-change-transform ${
                isAccent ? 'hero-accent-text' : ''
              }`}
              data-word={wordIndex + lineOneWords.length}
            >
              {word}
              {wordIndex < lineTwoWords.length - 1 ? '\u00A0' : ''}
            </span>
          </span>
        ))}
      </span>
    </h1>
  )
}
