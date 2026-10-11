import { useEffect, useRef, type CSSProperties } from 'react'
import './monsterFootsteps.css'

// Fixed walking routes: alternating feet stay connected across clock renders.
const walkingPaths = [
  { start: 0, steps: [[8, 78, 45], [19, 72, 49], [28, 58, 39], [40, 53, 52], [50, 40, 45], [62, 35, 62]] },
  { start: 9, steps: [[93, 18, -120], [80, 22, -112], [72, 35, -125], [58, 39, -115], [49, 53, -130], [36, 57, -120]] },
  { start: 18, steps: [[24, 8, 150], [29, 23, 166], [23, 38, 180], [30, 53, 157], [27, 69, 171], [35, 84, 150]] },
]

export default function MonsterFootsteps() {
  const trailRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const trail = trailRef.current
    const section = trail?.closest('section')
    if (!trail || !section) return
    let visible = false
    let observer: IntersectionObserver | undefined
    const sync = () => { trail.style.animationPlayState = visible && !document.hidden ? 'running' : 'paused' }
    try {
      if ('IntersectionObserver' in window) {
        observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync() })
        observer.observe(section)
      } else { trail.classList.add('is-static') }
    } catch { trail.classList.add('is-static') }
    document.addEventListener('visibilitychange', sync)
    sync()
    return () => { observer?.disconnect(); document.removeEventListener('visibilitychange', sync) }
  }, [])
  return <div ref={trailRef} className="monster-footsteps" aria-hidden="true">
    {walkingPaths.flatMap((path, route) => path.steps.map(([x, y, angle], step) =>
      <span key={`${route}:${step}`} className={`monster-step route-${route} foot-${step}`} style={{ left: `${x}%`, top: `${y}%`, '--step-delay': `${path.start + step * 1.1}s` } as CSSProperties}>
        <span className="monster-step-direction" style={{ transform: `rotate(${angle}deg) scaleX(${step % 2 ? -1 : 1})` }}>
          <svg viewBox="0 0 80 100" fill="currentColor"><path d="M18 57C16 43 26 36 40 40C54 35 67 43 64 58C77 73 66 95 41 95C14 95 3 74 18 57Z" /><ellipse cx="15" cy="29" rx="11" ry="14" transform="rotate(-20 15 29)" /><ellipse cx="40" cy="18" rx="12" ry="15" /><ellipse cx="65" cy="29" rx="11" ry="14" transform="rotate(20 65 29)" /></svg>
        </span>
      </span>))}
  </div>
}
