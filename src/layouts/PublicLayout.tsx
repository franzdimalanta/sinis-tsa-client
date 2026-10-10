import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import NavigationLink from '../components/navigation/NavigationLink'
import { useCart } from '../hooks/useCart'
import CustomerFooter from '../components/common/CustomerFooter'
import HomeWordmarkLink from '../components/navigation/HomeWordmarkLink'
import brandLogo from '../assets/sinis-tsa-logo.svg'

export default function PublicLayout() {
  const { totalQuantity } = useCart()
  const layoutRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const isHomepage = useLocation().pathname === '/'

  useEffect(() => {
    if (!menuOpen) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setMenuOpen(false)
      menuButtonRef.current?.focus()
    }
    const desktop = window.matchMedia('(min-width: 768px)')
    const closeOnDesktop = () => {
      if (desktop.matches) setMenuOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    desktop.addEventListener('change', closeOnDesktop)
    return () => {
      window.removeEventListener('keydown', closeOnEscape)
      desktop.removeEventListener('change', closeOnDesktop)
    }
  }, [menuOpen])

  useLayoutEffect(() => {
    const header = headerRef.current
    const layout = layoutRef.current
    if (!header || !layout) return
    const measureHeader = () => {
      layout.style.setProperty('--customer-header-height', `${header.getBoundingClientRect().height}px`)
    }
    measureHeader()
    const observer = new ResizeObserver(measureHeader)
    observer.observe(header)
    return () => observer.disconnect()
  }, [])
  return (
    <div ref={layoutRef} className="sinis-customer flex min-h-screen flex-col bg-cream">
      <a href="#customer-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:bg-forest focus:px-5 focus:py-3 focus:text-cream">Skip to content</a>
      <header ref={headerRef} className="sinis-header sticky top-0 z-30 border-b border-white/20 bg-header-green">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-x-8 gap-y-3 px-5 py-3 sm:px-8 sm:py-4">
          <HomeWordmarkLink onClick={() => setMenuOpen(false)} aria-label="SINIS TSA home" className="flex min-h-11 items-center gap-2 rounded-sm text-white">
            <img src={brandLogo} alt="" className="h-11 w-11 shrink-0 object-contain" />
            <span className="block whitespace-nowrap font-wordmark text-2xl leading-none font-normal tracking-[0.06em] sm:text-3xl">SINIS TSA</span>
          </HomeWordmarkLink>
          <button ref={menuButtonRef} type="button" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} aria-controls="customer-navigation" onClick={() => setMenuOpen((open) => !open)} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm text-white md:hidden">
            <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {menuOpen ? <path d="m6 6 12 12M6 18 18 6" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
          <nav id="customer-navigation" aria-label="Customer navigation" onClick={(event) => {
            if ((event.target as Element).closest('a')) setMenuOpen(false)
          }} className={`${menuOpen ? 'flex' : 'hidden'} absolute inset-x-0 top-full max-h-[calc(100svh-var(--customer-header-height,5rem))] flex-col items-start gap-1 overflow-y-auto border-t border-white/20 bg-header-green px-5 py-3 sm:px-8 md:static md:flex md:max-h-none md:flex-row md:flex-wrap md:items-center md:overflow-visible md:border-0 md:bg-transparent md:p-0`}>
            <NavigationLink to="/" label="Home" end />
            <NavigationLink to="/menu" label="Menu" />
            <NavLink to="/cart" className={({ isActive }) => `brew-nav-link gap-2${isActive ? ' is-active' : ''}`}>
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 3h2l3 12h11l2-9H6" />
                <circle cx="9" cy="20" r="1" />
                <circle cx="18" cy="20" r="1" />
              </svg>
              <span className="brew-nav-label">{`Cart (${totalQuantity})`}</span>
            </NavLink>
          </nav>
        </div>
      </header>
      <main id="customer-content" tabIndex={-1} className={`mx-auto w-full min-w-0 flex-1 ${isHomepage ? 'pb-8 sm:pb-10' : 'max-w-6xl px-5 py-8 sm:px-8 sm:py-10'}`}>
        <Outlet />
      </main>
      <CustomerFooter />
    </div>
  )
}
