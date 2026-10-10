import { useLayoutEffect, useRef, useState } from 'react'
import { sampleReviews } from './sampleReviews'

function ReviewGroup({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div className={`sinis-review-group flex shrink-0 gap-5 pr-5 ${duplicate ? 'sinis-review-duplicate' : ''}`} aria-hidden={duplicate ? true : undefined} inert={duplicate ? true : undefined}>
      {sampleReviews.map(({ id, quote, attribution, imageSrc, imageAlt }) => (
        <figure key={id} className="sinis-review-card flex aspect-[4/3] w-[min(400px,calc(100svw-40px))] shrink-0 flex-col justify-between overflow-hidden rounded-[24px] border border-header-green/40 bg-cream text-espresso">
          {imageSrc ? <img src={imageSrc} alt={imageAlt || `${attribution}: ${quote}`} className="h-full w-full object-contain" /> : <div className="flex h-full flex-col justify-between p-6 sm:p-8">
            <blockquote className="text-xl leading-8 sm:text-2xl sm:leading-9">“{quote}”</blockquote>
            <figcaption className="mt-6 text-sm font-medium text-header-green">{attribution}</figcaption>
          </div>}
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
    <section aria-labelledby="customer-reviews-heading" aria-describedby="sample-review-label" className="sinis-reviews w-full min-w-0 bg-cream" onFocusCapture={() => setFocused(true)} onBlurCapture={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false)
    }}>
      <div className="mx-auto w-full max-w-[1440px] px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
        <h2 data-scroll-reveal id="customer-reviews-heading" className="font-brand text-center text-3xl leading-tight font-extrabold tracking-tight text-header-green sm:text-4xl lg:text-5xl">CUSTOMER REVIEWS</h2>
        <div className="mt-4 text-center text-sm" aria-hidden="true">&nbsp;</div>
        <p id="sample-review-label" className="sr-only">Sample reviews for layout preview.</p>
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
