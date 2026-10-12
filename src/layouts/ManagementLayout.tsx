import { useEffect, useRef, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import NavigationLink from '../components/navigation/NavigationLink'
import brandLogo from '../assets/sinis-tsa-hero-logo.svg'
import '../managementTheme.css'

const links = [
  { to: '/manage', label: 'Dashboard', end: true },
  { to: '/manage/menu', label: 'Menu' },
  { to: '/manage/orders', label: 'Orders' },
  { to: '/manage/inventory', label: 'Inventory' },
  { to: '/manage/recipes', label: 'Recipes' },
  { to: '/manage/analytics', label: 'Analytics' },
]

export default function ManagementLayout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (!menuOpen) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setMenuOpen(false)
      menuButtonRef.current?.focus()
    }
    const desktop = window.matchMedia('(min-width: 768px)')
    const closeOnDesktop = () => { if (desktop.matches) setMenuOpen(false) }
    window.addEventListener('keydown', closeOnEscape)
    desktop.addEventListener('change', closeOnDesktop)
    return () => {
      window.removeEventListener('keydown', closeOnEscape)
      desktop.removeEventListener('change', closeOnDesktop)
    }
  }, [menuOpen])
  return (
    <div className="management-shell">
      <a href="#management-content" className="management-skip-link">Skip to content</a>
      <aside className="management-sidebar">
        <div className="management-brand-row">
          <Link to="/manage" className="management-brand" onClick={() => setMenuOpen(false)}>
            <img src={brandLogo} alt="" width="40" height="40" />
            <span><span className="management-wordmark">SINIS TSA</span><span className="management-identifier">Management</span></span>
          </Link>
          <button ref={menuButtonRef} type="button" className="management-menu-toggle" aria-label={menuOpen ? 'Close management navigation' : 'Open management navigation'} aria-expanded={menuOpen} aria-controls="management-navigation" onClick={() => setMenuOpen(open => !open)}>
            <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {menuOpen ? <path d="m6 6 12 12M6 18 18 6" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
        <nav id="management-navigation" aria-label="Management navigation" className={menuOpen ? 'is-open' : ''} onClick={event => { if ((event.target as Element).closest('a')) setMenuOpen(false) }}>
          {links.map(link => <NavigationLink key={link.to} {...link} />)}
        </nav>
        <Link to="/" className="management-customer-link">Back to customer site <span aria-hidden="true">↗</span></Link>
      </aside>
      <main id="management-content" tabIndex={-1} className="management-workspace">
        <div className="mx-auto min-w-0 max-w-6xl"><Outlet /></div>
      </main>
    </div>
  )
}
