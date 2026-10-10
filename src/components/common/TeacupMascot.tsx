import type { SVGProps } from 'react'

type TeacupMascotProps = SVGProps<SVGSVGElement> & {
  size?: number | string
  cupColor?: string
  faceColor?: string
}

/** Original flat teacup mark, designed to stay legible at small sizes. */
export default function TeacupMascot({ size = 40, cupColor = '#FFFFFF', faceColor = '#526B3F', ...props }: TeacupMascotProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true" {...props}>
      <path d="M34 15h3a8 8 0 0 1 0 16h-4" stroke={cupColor} strokeWidth="5" />
      <path d="M7 12h29l-2 19c-.6 6-5 9-12.5 9S9.6 37 9 31L7 12Z" fill={cupColor} />
      <circle cx="17" cy="24" r="1.7" fill={faceColor} />
      <circle cx="27" cy="24" r="1.7" fill={faceColor} />
      <path d="m14.5 19.5 4 1M25 20.5l4-1" stroke={faceColor} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M19 29q4 2.5 7-1" stroke={faceColor} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}
