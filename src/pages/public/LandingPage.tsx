import { Link } from 'react-router-dom'
import DrinkCarousel from '../../components/menu/DrinkCarousel'
import CafeHighlights from '../../components/menu/CafeHighlights'
import BrandMarquee from '../../components/common/BrandMarquee'
import CustomerReviews from '../../components/common/CustomerReviews'
import useScrollReveal from '../../hooks/useScrollReveal'
import WhereToFindUs from '../../components/common/WhereToFindUs'
import heroLogo from '../../assets/sinis-tsa-hero-logo.svg'
import HomepageIntro from '../../components/common/HomepageIntro'
import useHomepageIntro from '../../hooks/useHomepageIntro'
export default function LandingPage() {
  const revealRef = useScrollReveal()
  const intro = useHomepageIntro(revealRef)
  return <>
    {intro.active && <HomepageIntro overlayRef={intro.overlayRef} />}
    <div ref={revealRef} className="customer-page space-y-14 sm:space-y-20">
    <section className="sinis-hero mx-auto grid w-full max-w-[1440px] items-center gap-8 px-5 sm:px-8 lg:grid-cols-2 lg:gap-12 lg:px-12">
      <div className="min-w-0">
        <div data-hero-entrance="branding" className="flex min-w-0 flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-5">
          <img src={heroLogo} alt="" className="h-28 w-28 shrink-0 object-contain sm:h-32 sm:w-32 lg:h-28 lg:w-28 xl:h-36 xl:w-36" />
          <h1 className="min-w-0 text-[clamp(3rem,5.5vw,6rem)] leading-[1.05] tracking-tight text-header-green">SINIS TSA</h1>
        </div>
        <p data-hero-entrance="branding" className="mt-5 max-w-md text-xl leading-snug font-semibold text-espresso sm:text-2xl">Your next adventure starts with a sip.</p>
        <p data-hero-entrance="support" className="mt-4 max-w-md text-base leading-7 text-muted sm:text-lg">Level up your everyday with coffee, tea, and a little discovery.</p>
        <div data-hero-entrance="support" className="mt-8 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap">
          <Link to="/menu" className="inline-flex min-h-11 items-center justify-center gap-5 rounded-full border border-transparent bg-header-green px-6 py-2 text-sm font-semibold text-cream hover:bg-header-interaction focus-visible:outline-offset-4">Explore Menu <span aria-hidden="true">↗</span></Link>
          <a href="#find-us" className="inline-flex min-h-11 items-center justify-center rounded-full border border-header-green/30 bg-transparent px-6 py-2 text-sm font-semibold text-header-green hover:bg-matcha/20">Find Us</a>
        </div>
      </div>
      <div data-hero-entrance="carousel" className="min-w-0"><DrinkCarousel autoplayReady={intro.ready} /></div>
    </section>
    <div>
      <CafeHighlights />
      <BrandMarquee />
      <CustomerReviews />
      <WhereToFindUs />
    </div>
  </div>
  </>
}
