import { Link } from 'react-router-dom'
import { cafeLocation } from './cafeLocation'
import { presentationLocation } from './presentationLocation'

export default function WhereToFindUs() {
  return (
    <section id="find-us" aria-labelledby="find-us-heading" className="w-full bg-cream py-12 sm:py-16 lg:py-20">
      <div className="mx-auto grid w-full max-w-[1440px] items-center gap-8 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-12">
        <div data-scroll-reveal className="min-w-0 overflow-hidden rounded-[24px] lg:rounded-[32px]">
          {cafeLocation.imageSrc ? <img src={cafeLocation.imageSrc} alt={cafeLocation.imageAlt} className="aspect-[4/3] w-full object-cover object-center" /> : (
            <div role="img" aria-label={cafeLocation.imageAlt} className="flex aspect-[4/3] items-center justify-center bg-matcha/40 p-6">
              <span aria-hidden="true" className="rounded-full border border-header-green/30 px-5 py-3 text-center text-sm text-espresso">Café image placeholder</span>
            </div>
          )}
        </div>
        <div className="min-w-0 text-espresso">
          <h2 data-scroll-reveal id="find-us-heading" className="font-brand text-3xl leading-tight font-extrabold tracking-tight text-header-green sm:text-4xl lg:text-5xl">WHERE TO FIND US</h2>
          {cafeLocation.address && <address className="mt-6 text-lg leading-8 not-italic">{cafeLocation.address}</address>}
          {cafeLocation.openingHours && <p className="mt-4 leading-7"><span className="font-semibold">Opening hours: </span>{cafeLocation.openingHours}</p>}
          <figure data-scroll-reveal className="mt-6 min-w-0">
            <div className="overflow-hidden rounded-[24px]">
              <iframe
                src={presentationLocation.embedSrc}
                title="Presentation location: National University Clark"
                loading="lazy"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                className="block h-[320px] w-full"
                style={{ border: 0 }}
              />
            </div>
            <figcaption className="mt-3 text-sm leading-6">Demo location: NU Clark — for presentation purposes.</figcaption>
          </figure>
          <div data-scroll-reveal className="mt-8 flex flex-wrap gap-3">
            <a href={presentationLocation.directionsUrl} target="_blank" rel="noopener noreferrer" aria-label="Get Directions to demo location NU Clark (opens in a new tab)" className="inline-flex min-h-11 items-center justify-center rounded-full border border-header-green/30 px-6 py-2 text-sm font-semibold text-header-green hover:bg-matcha/20">Get Directions</a>
            <Link to="/menu" className="inline-flex min-h-11 items-center justify-center rounded-full bg-header-green px-6 py-2 text-sm font-semibold text-cream hover:bg-header-interaction">Explore Menu</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
