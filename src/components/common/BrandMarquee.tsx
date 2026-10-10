import marqueeLogo from '../../assets/sinis-tsa-logo.svg'

const message = 'SIP • EXPLORE • LEVEL UP YOUR EVERYDAY'

function MarqueeGroup() {
  return (
    <div className="sinis-marquee-group flex shrink-0 items-center">
      {Array.from({ length: 4 }, (_, index) => (
        <span key={index} className="flex shrink-0 items-center gap-6 pr-6 sm:gap-10 sm:pr-10">
          <span className="text-xs font-semibold tracking-[0.12em] sm:text-sm">{message}</span>
          <span aria-hidden="true" className="relative h-8 w-24 shrink-0">
            {/* The supplied square SVG has generous transparent margins around its symbol. */}
            <img src={marqueeLogo} alt="" className="absolute top-1/2 h-24 w-24 -translate-y-1/2 object-contain" />
          </span>
        </span>
      ))}
    </div>
  )
}

export default function BrandMarquee() {
  return (
    <section aria-label="SINIS TSA motto" className="sinis-marquee flex w-full min-w-0 items-center bg-header-green text-cream">
      <p className="sr-only">{message}</p>
      <div className="min-w-0 flex-1 overflow-hidden py-2" aria-hidden="true">
        <div className="sinis-marquee-track flex w-max">
          <MarqueeGroup />
          <MarqueeGroup />
        </div>
      </div>
      <p className="sinis-marquee-static min-w-0 flex-1 px-5 py-3 text-center text-xs leading-6 font-semibold tracking-wide" aria-hidden="true">{message}</p>
    </section>
  )
}
