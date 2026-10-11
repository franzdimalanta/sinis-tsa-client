import { useEffect, useRef } from 'react'

type RevealOptions = { dynamic?: boolean; visitKey?: string; distance?: number; stagger?: number }

/** Visible base styles remain the fallback if observation or animation fails. */
export default function useScrollReveal({ dynamic = false, visitKey, distance = 18, stagger = 0 }: RevealOptions = {}) {
  const rootRef = useRef<HTMLDivElement>(null)
  const revealed = useRef(new Set<string>())
  const previousVisit = useRef(visitKey)
  useEffect(() => {
    const root = rootRef.current
    if (!root || !('IntersectionObserver' in window)) return
    if (previousVisit.current !== visitKey) { revealed.current.clear(); previousVisit.current = visitKey }
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const animations = new Set<Animation>()
    const observed = new Set<HTMLElement>()
    let observer: IntersectionObserver | undefined
    let mutations: MutationObserver | undefined
    const keyOf = (element: HTMLElement) => element.dataset.revealKey
    const stopAnimations = () => { animations.forEach(animation => animation.cancel()); animations.clear() }
    const stop = () => { observer?.disconnect(); mutations?.disconnect(); observed.clear(); stopAnimations() }
    function register() {
      for (const element of observed) if (!root?.contains(element)) { observer?.unobserve(element); observed.delete(element) }
      root?.querySelectorAll<HTMLElement>('[data-scroll-reveal]').forEach(element => {
        const key = keyOf(element)
        if (observed.has(element) || (key && revealed.current.has(key))) return
        if (motion.matches) { if (key) revealed.current.add(key); return }
        const rect = element.getBoundingClientRect()
        if (!dynamic && rect.top < window.innerHeight && rect.bottom > 0) return
        observed.add(element)
        observer?.observe(element)
      })
    }
    const onMotionChange = () => {
      if (motion.matches) { stopAnimations(); observer?.disconnect(); observed.clear() }
      register()
    }
    try {
      observer = new IntersectionObserver(entries => {
        let tileIndex = 0
        for (const entry of entries.filter(entry => entry.isIntersecting && entry.intersectionRatio >= .08).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left)) {
          observer?.unobserve(entry.target)
          const element = entry.target as HTMLElement
          const key = keyOf(element)
          if (key && revealed.current.has(key)) continue
          if (key) revealed.current.add(key)
          if (motion.matches) continue
          const delay = element.hasAttribute('data-reveal-tile') ? Math.min(tileIndex++ * stagger, 240) : Number(element.dataset.revealDelay || 0)
          try {
            const animation = element.animate([
              { opacity: 0, transform: `translateY(${distance}px)` },
              { opacity: 1, transform: 'translateY(0)' },
            ], { duration: 550, easing: 'ease-out', delay, fill: 'backwards' })
            animations.add(animation)
            animation.onfinish = () => animations.delete(animation)
          } catch { /* Visible base styles provide the fallback. */ }
        }
      }, { threshold: .08 })
      register()
      if (dynamic) { mutations = new MutationObserver(register); mutations.observe(root, { childList: true, subtree: true }) }
      motion.addEventListener('change', onMotionChange)
    } catch { stop() }
    return () => { stop(); motion.removeEventListener('change', onMotionChange) }
  }, [dynamic, visitKey, distance, stagger])
  return rootRef
}
