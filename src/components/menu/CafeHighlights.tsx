import { cafeHighlights } from './cafeHighlightData'
import { Link } from 'react-router-dom'
import eyeLogo from '../../assets/sinis-tsa-hero-logo.svg'

export default function CafeHighlights() {
  return (
    <section aria-labelledby="cafe-highlights-heading" className="sinis-highlights w-full bg-header-green py-12 sm:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-[1440px] px-10 sm:px-16 lg:px-[88px]">
      <h2 data-scroll-reveal id="cafe-highlights-heading" className="customer-heading text-center text-3xl text-cream sm:text-4xl lg:text-5xl">GOOD SIPS. BAD INFLUENCE.</h2>
      <div className="mt-9 grid min-w-0 gap-6 lg:mt-12 lg:grid-cols-3">
        {cafeHighlights.map(({ id, title, description, image }, index) => (
          <article key={id} tabIndex={0} data-scroll-reveal data-reveal-delay={index * 80} className="sinis-highlight-card relative isolate grid min-w-0 overflow-hidden rounded-[22px] lg:rounded-[28px]">
            {image.src ? <img src={image.src} alt={image.alt} className="col-start-1 row-start-1 aspect-[4/5] h-full w-full object-cover" style={{ objectPosition: image.objectPosition || 'center' }} /> : (
              <div role="img" aria-label={`SINIS TSA illustration: ${title}`} className="col-start-1 row-start-1 flex aspect-[4/5] items-start justify-center px-6 pt-16" style={{ backgroundColor: image.background }}>
                <img src={eyeLogo} alt="" className="h-20 w-24 object-contain" />
              </div>
            )}
            <div className="sinis-highlight-overlay pointer-events-none absolute inset-0 flex items-center justify-center p-6 text-center text-espresso lg:p-7">
              {description && <p className="sinis-highlight-description max-w-xs font-brand text-base leading-relaxed font-bold text-espresso sm:text-lg">{description}</p>}
            </div>
            <div className="sinis-highlight-content absolute inset-0 flex flex-col justify-end text-espresso">
              <div className="sinis-highlight-caption p-6 lg:p-7">
                <h3 className="font-brand text-2xl leading-snug font-semibold">{title}</h3>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div data-scroll-reveal className="mt-9 flex justify-center lg:mt-12">
        <Link to="/about" className="sinis-about-button inline-flex min-h-11 items-center justify-center rounded-full px-7 py-3 text-sm font-semibold focus-visible:outline-cream focus-visible:outline-offset-4">Know More About Us</Link>
      </div>
      </div>
    </section>
  )
}
