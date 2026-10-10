import { useEffect, useState } from 'react'
import { promoSlides, type PromoSlide } from './promoSlides'

function Banner({ slide }: { slide: PromoSlide }) {
  return slide.src
    ? <img src={slide.src} alt={slide.alt} className="block aspect-[4/3] w-full object-cover lg:aspect-[20/23]" style={{ backgroundColor: slide.background, objectPosition: slide.objectPosition || 'center' }} />
    : <div role="img" aria-label={slide.alt} className="aspect-[4/3] w-full lg:aspect-[20/23]" style={{ backgroundColor: slide.background }} />
}

export default function DrinkCarousel({ autoplayReady = true }: { autoplayReady?: boolean }) {
  const [slide, setSlide] = useState({ index: 0, previous: null as number | null })
  const [hidden, setHidden] = useState(() => document.hidden)
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotion = () => setReducedMotion(media.matches)
    const updateVisibility = () => setHidden(document.hidden)
    media.addEventListener('change', updateMotion)
    document.addEventListener('visibilitychange', updateVisibility)
    return () => {
      media.removeEventListener('change', updateMotion)
      document.removeEventListener('visibilitychange', updateVisibility)
    }
  }, [])

  useEffect(() => {
    if (!autoplayReady || hidden || reducedMotion) return
    const timer = window.setInterval(() => setSlide((current) => ({
      index: (current.index + 1) % promoSlides.length,
      previous: current.index,
    })), 2500)
    return () => window.clearInterval(timer)
  }, [autoplayReady, hidden, reducedMotion])

  return (
    <section aria-label="Promotional banners" aria-roledescription="carousel" className="min-w-0">
      <div className="relative overflow-hidden rounded-[24px] lg:rounded-[32px]" aria-live="off">
        {slide.previous !== null && !reducedMotion && <div aria-hidden="true" inert className="drink-slide-out-left absolute inset-0">
          <Banner slide={promoSlides[slide.previous]} />
        </div>}
        <div key={slide.index} role="group" aria-roledescription="slide" aria-label={`${slide.index + 1} of ${promoSlides.length}`} className={slide.previous === null || reducedMotion ? '' : 'drink-slide-in-right'} onAnimationEnd={(event) => {
          if (event.target === event.currentTarget) setSlide((current) => ({ ...current, previous: null }))
        }}>
          <Banner slide={promoSlides[slide.index]} />
        </div>
      </div>
    </section>
  )
}
