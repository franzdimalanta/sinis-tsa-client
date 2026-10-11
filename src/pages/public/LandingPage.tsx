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
import HeroMatchaTexture from '../../components/common/HeroMatchaTexture'
export default function LandingPage() {
  const revealRef = useScrollReveal()
  const intro = useHomepageIntro(revealRef)
  return <>
    {intro.active && <HomepageIntro overlayRef={intro.overlayRef} />}
    <div ref={revealRef} className="customer-page space-y-14 sm:space-y-20">
    <section className="hero-surface">
      <HeroMatchaTexture />
      <div className="sinis-hero mx-auto grid w-full max-w-[1440px] items-center gap-8 px-5 sm:px-8 lg:grid-cols-2 lg:gap-12 lg:px-12">
      <div className="hero-copy min-w-0">
        <div data-hero-entrance="branding" className="hero-branding flex min-w-0 flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-5">
          <img src={heroLogo} alt="" className="hero-eye shrink-0 object-contain" />
          <h1 className="hero-wordmark min-w-0 text-header-green">SINIS TSA</h1>
        </div>
        <p data-hero-entrance="branding" className="hero-tagline text-espresso">A little sinister. A lot to sip.</p>
        <p data-hero-entrance="support" className="hero-description text-muted">Wickedly good coffee and tea to level up your day. Being good can wait.</p>
        <div data-hero-entrance="support" className="hero-buttons flex flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap">
          <Link to="/menu" className="inline-flex min-h-11 items-center justify-center gap-5 rounded-full border border-transparent bg-header-green px-6 py-2 text-sm font-semibold text-cream hover:bg-header-interaction focus-visible:outline-offset-4">View Menu <span aria-hidden="true">↗</span></Link>
          <a href="#find-us" className="inline-flex min-h-11 items-center justify-center rounded-full border border-header-green/30 bg-transparent px-6 py-2 text-sm font-semibold text-header-green hover:bg-matcha/20">Find Us</a>
        </div>
      </div>
      <div data-hero-entrance="carousel" className="min-w-0"><DrinkCarousel autoplayReady={intro.ready} /></div>
      </div>
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
