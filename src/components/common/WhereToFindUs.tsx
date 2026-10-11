import { Link } from 'react-router-dom'
import { cafeLocation } from './cafeLocation'
import { presentationLocation } from './presentationLocation'
import PhilippineClock from './PhilippineClock'
import MonsterFootsteps from './MonsterFootsteps'
import eyeLogo from '../../assets/sinis-tsa-hero-logo.svg'

export default function WhereToFindUs() {
  return (
    <section id="find-us" aria-labelledby="find-us-heading" className="relative isolate w-full bg-cream py-12 sm:py-16 lg:py-20">
      <MonsterFootsteps />
      <div className="relative z-[1] mx-auto grid w-full max-w-[1440px] items-center gap-8 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-12">
        <div data-scroll-reveal className="min-w-0 overflow-hidden rounded-[24px] lg:rounded-[32px]">
          {cafeLocation.imageSrc ? <img src={cafeLocation.imageSrc} alt={cafeLocation.imageAlt} className="aspect-[4/3] w-full object-cover object-center" /> : (
            <div role="img" aria-label="Café photo unavailable" className="flex aspect-[4/3] items-center justify-center bg-matcha/40 p-6">
              <img src={eyeLogo} alt="" className="h-20 w-24 object-contain" />
            </div>
          )}
        </div>
        <div className="min-w-0 text-espresso">
          <h2 data-scroll-reveal id="find-us-heading" className="customer-heading text-3xl text-header-green sm:text-4xl lg:text-5xl">WHERE TO FIND US</h2>
          {cafeLocation.address && <address className="mt-6 whitespace-pre-line font-brand text-base leading-7 not-italic text-espresso sm:text-lg sm:leading-8">{cafeLocation.address}</address>}
          {cafeLocation.openingHours && <p className="mt-4 font-brand leading-7"><span className="block text-sm font-extrabold text-header-green">Opening hours</span><span className="block whitespace-pre-line">{cafeLocation.openingHours}</span></p>}
          <PhilippineClock />
          <figure data-scroll-reveal className="mt-6 min-w-0">
            <div className="overflow-hidden rounded-[24px]">
              <iframe
                src={presentationLocation.embedSrc}
                title="Map of National University Clark"
                loading="lazy"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                className="block h-[320px] w-full"
                style={{ border: 0 }}
              />
            </div>
          </figure>
          <div data-scroll-reveal className="mt-8 flex flex-wrap gap-3">
            <a href={presentationLocation.directionsUrl} target="_blank" rel="noopener noreferrer" aria-label="Get directions to National University Clark (opens in a new tab)" className="inline-flex min-h-11 items-center justify-center rounded-full border border-header-green/30 px-6 py-2 text-sm font-semibold text-header-green hover:bg-matcha/20">Get Directions</a>
            <Link to="/menu" className="inline-flex min-h-11 items-center justify-center rounded-full bg-header-green px-6 py-2 text-sm font-semibold text-cream hover:bg-header-interaction">View Menu</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
