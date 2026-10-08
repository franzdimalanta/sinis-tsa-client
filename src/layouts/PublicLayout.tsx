import { Link, Outlet } from 'react-router-dom'
import NavigationLink from '../components/navigation/NavigationLink'
import { useCart } from '../hooks/useCart'

export default function PublicLayout() {
  const { totalQuantity } = useCart()
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-x-8 gap-y-5 px-5 py-6 sm:px-8">
          <Link to="/" className="text-primary focus-visible:rounded-sm">
            <span className="block font-editorial text-3xl leading-none tracking-tight sm:text-4xl">BrewLogic</span>
            <span className="mt-2 block text-[0.65rem] uppercase tracking-[0.2em] text-muted">Coffee, simplified.</span>
          </Link>
          <nav aria-label="Customer navigation" className="flex flex-wrap items-center gap-1">
            <NavigationLink to="/" label="Home" end />
            <NavigationLink to="/menu" label="Menu" />
            <NavigationLink to="/cart" label={`Cart (${totalQuantity})`} />
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full min-w-0 max-w-6xl flex-1 px-5 py-8 sm:px-8 sm:py-10">
        <Outlet />
      </main>
      <footer className="border-t border-border bg-surface-warm">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-6 text-sm text-muted sm:px-8">
          <p>BrewLogic - Coffee Shop Management System</p>
          <Link to="/manage" className="ui-button-tertiary">Management</Link>
        </div>
      </footer>
    </div>
  )
}
