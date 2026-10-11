import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import useScrollReveal from '../../hooks/useScrollReveal'
import { developerProfiles } from '../../components/about/developerProfiles'
import { signatureAssets } from '../../components/menu/signatureAssets'
import greenEye from '../../assets/sinis-tsa-hero-logo.svg'
import creamEye from '../../assets/sinis-tsa-logo.svg'
import HeroMatchaTexture from '../../components/common/HeroMatchaTexture'
import '../../components/about/aboutPage.css'

const values = [
  { title: 'Comfort in every cup', copy: 'Drinks that feel familiar, with enough personality to keep things interesting.', path: 'M4 8h13v8a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8Zm13 2h2a3 3 0 0 1 0 6h-2M8 3v2m5-2v2' },
  { title: 'Room for everyone', copy: 'A welcoming café concept for a quiet break, a catch-up, or a conversation about your latest favorite.', path: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m20 0v-2a4 4 0 0 0-3-3.87M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8m7 0a4 4 0 0 1 0 8' },
  { title: 'Care in the details', copy: 'From the menu to the website, we want the little things to feel thoughtful and easy.', path: 'm9 12 2 2 4-4M12 3l8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Z' },
]

export default function AboutPage() {
  const revealRef = useScrollReveal({ distance: 18 })
  useEffect(() => {
    const previous = document.title
    document.title = 'About Us | SINIS TSA'
    return () => { document.title = previous }
  }, [])
  return <div ref={revealRef} className="about-page">
    <section className="about-hero hero-surface" aria-labelledby="about-title">
      <HeroMatchaTexture />
      <div className="about-width about-hero-layout about-intro-entrance">
        <div><p className="about-eyebrow">OUR STORY</p><h1 id="about-title" className="customer-heading">A little sinister.<br />A lot of heart.</h1><p className="about-lead">SINIS TSA began with two teammates, a shared love of Pokémon, and an idea: give a coffee-and-tea café a personality of its own. Cute, a little mischievous, and serious about making your everyday feel better.</p></div>
        <div className="about-product-composition">
          <span className="about-product-halo" aria-hidden="true" />
          <img className="about-product about-product-coffee" src={signatureAssets['sinister-coffee'].src} alt={signatureAssets['sinister-coffee'].alt} />
          <img className="about-product about-product-matcha" src={signatureAssets['sini-tsa-matcha'].src} alt={signatureAssets['sini-tsa-matcha'].alt} />
          <span className="about-composition-label">Good sips.<br />Little trouble.</span>
        </div>
      </div>
    </section>
    <section className="about-section about-width about-story" aria-labelledby="about-story-title">
      <div data-scroll-reveal><p className="about-eyebrow">HOW IT STARTED</p><h2 className="customer-heading" id="about-story-title">Two fans.<br />One mischievous idea.</h2><img src={greenEye} alt="" className="about-story-eye" /></div>
      <div data-scroll-reveal className="about-prose"><p>For John Mier Estorco and Franz Dominic Dimalanta, Pokémon was common ground. Mier also loves the trading card game, while Franz shares the enthusiasm for Pokémon that helped spark the café’s identity.</p><p>That shared interest became the starting point for SINIS TSA: a café website with playful product names, a leafy-eyed logo, and the charm of a tiny villain who would probably steal your snacks.</p><p>Built as a student project, the website brings that personality into a practical café experience—from browsing drinks to putting together an order. It is a place for us to practice our craft and build something we are proud to share.</p></div>
    </section>
    <section className="about-purpose" aria-label="Our mission and vision">
      <div className="about-width about-section"><p data-scroll-reveal className="about-eyebrow">WHAT OUR CAFÉ CONCEPT AIMS TO ACHIEVE</p><div className="about-purpose-columns">
        <div data-scroll-reveal><span aria-hidden="true" className="about-section-number">01</span><h2 className="customer-heading">Our mission</h2><p>Make everyday breaks a little brighter through comforting coffee and tea, playful personality, and a simple, welcoming ordering experience.</p></div>
        <div data-scroll-reveal data-reveal-delay="80"><span aria-hidden="true" className="about-section-number">02</span><h2 className="customer-heading">Our vision</h2><p>To become a cozy gathering spot where good drinks, shared interests, and a little mischief bring people together.</p></div>
      </div></div>
    </section>
    <section className="about-width about-section" aria-labelledby="about-values-title">
      <div data-scroll-reveal className="about-section-heading"><p className="about-eyebrow">WHAT WE STAND FOR</p><h2 className="customer-heading" id="about-values-title">Good sips. A little mischief.</h2></div>
      <div className="about-values">{values.map((value, index) => <div key={value.title} data-scroll-reveal data-reveal-delay={index * 70} className="about-value"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={value.path} /></svg><h3>{value.title}</h3><p>{value.copy}</p></div>)}</div>
    </section>
    <section className="about-team" aria-labelledby="about-team-title"><div className="about-width about-section">
      <div data-scroll-reveal className="about-section-heading"><p className="about-eyebrow">MEET THE DEVELOPERS</p><h2 className="customer-heading" id="about-team-title">The humans behind the mischief.</h2><p>Two Pokémon fans. Many ideas. A suspicious number of browser tabs.</p></div>
      <div className="about-developers">{developerProfiles.map((profile, index) => <div key={profile.initials} data-scroll-reveal data-reveal-delay={index * 90} className="about-developer-reveal"><article className="about-developer" data-theme={profile.theme}>
        <div className="about-portrait" style={{ aspectRatio: profile.imageAspectRatio }}>{profile.imageSrc ? <img className="about-portrait-image" src={profile.imageSrc} alt={profile.imageAlt ?? `Portrait of ${profile.name}`} style={{ objectPosition: profile.imagePosition ?? 'center' }} /> : <div className="about-portrait-placeholder"><img src={creamEye} alt="" /><span aria-hidden="true">{profile.initials}</span><p>Photo coming soon</p></div>}</div>
        <div className="about-developer-copy"><h3>{profile.name}</h3><p className="about-developer-role">{profile.role}</p><p>{profile.bio}</p><p className="about-developer-footer">{profile.footer}</p></div>
      </article></div>)}</div>
    </div></section>
    <section className="about-closing about-width about-section" aria-labelledby="about-cta-title"><div data-scroll-reveal><img src={greenEye} alt="" /><h2 className="customer-heading" id="about-cta-title">Meet your next delightful bad idea.</h2><p>Coffee, tea, and a little trouble.</p><Link to="/menu" className="about-menu-button">View Menu</Link></div></section>
  </div>
}
