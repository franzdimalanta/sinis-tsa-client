import { useLayoutEffect, useRef, useState } from 'react'
import { sampleReviews } from './sampleReviews'
import eyeLogo from '../../assets/sinis-tsa-logo.svg'

function ReviewGroup({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div className={`sinis-review-group flex shrink-0 gap-5 pr-5 ${duplicate ? 'sinis-review-duplicate' : ''}`} aria-hidden={duplicate ? true : undefined} inert={duplicate ? true : undefined}>
      {sampleReviews.map(({ id, quote, attribution, initials, rating }) => (
        <figure key={id} className="sinis-review-card flex w-[min(400px,calc(100svw-40px))] shrink-0 flex-col rounded-[24px] border border-header-green/20 bg-cream p-6 text-espresso sm:p-8">
          <figcaption className="flex items-center gap-3">
            <span aria-hidden="true" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-matcha/25 text-sm font-extrabold text-header-green">{initials}</span>
            <span className="min-w-0 flex-1 text-sm font-bold text-header-green">{attribution}</span>
            <span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-header-green p-1"><img src={eyeLogo} alt="" className="h-full w-full object-contain" /></span>
          </figcaption>
          <div role="img" aria-label={`Sample rating: ${rating} out of 5.`} className="mt-4 flex gap-1 text-butter">
            {Array.from({ length: rating }, (_, index) => <svg key={index} aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8-6.2-3.2-6.2 3.2 1.2-6.8-5-4.9 6.9-1z" /></svg>)}
          </div>
          <blockquote className="mt-4 text-lg leading-7 sm:text-xl sm:leading-8">“{quote}”</blockquote>
          <p className="mt-auto pt-4 text-xs leading-5 text-header-green/75">Sample review</p>
        </figure>
      ))}
    </div>
  )
}

export default function CustomerReviews() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [focused, setFocused] = useState(false)
  useLayoutEffect(() => {
    const track = trackRef.current
    const group = track?.firstElementChild
    if (!track || !group) return
    const measure = () => track.style.setProperty('--review-scroll-duration', `${group.getBoundingClientRect().width / 65}s`)
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(group)
    return () => observer.disconnect()
  }, [])
  return (
    <section aria-labelledby="customer-reviews-heading" className="sinis-reviews w-full min-w-0 bg-cream" onFocusCapture={() => setFocused(true)} onBlurCapture={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false)
    }}>
      <div className="w-full min-w-0 px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
        <h2 data-scroll-reveal id="customer-reviews-heading" className="customer-heading mx-auto w-full text-center text-3xl text-header-green sm:text-4xl lg:text-5xl">CUSTOMER REVIEWS</h2>
      </div>
        <div tabIndex={0} role="group" aria-label="Sample reviews. Scrolling pauses while focused." className="sinis-review-viewport w-full overflow-hidden bg-header-green px-5 py-10 focus-visible:outline-offset-[-4px] sm:py-12">
          <div ref={trackRef} className="sinis-review-track flex w-max" style={{ animationPlayState: focused ? 'paused' : 'running' }}>
            <ReviewGroup />
            <ReviewGroup duplicate />
          </div>
        </div>
    </section>
  )
}
