import { Link, Outlet } from 'react-router-dom'
import NavigationLink from '../components/navigation/NavigationLink'

export default function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-5 sm:px-6">
          <Link to="/" className="text-xl font-bold tracking-tight">BrewLogic</Link>
          <nav aria-label="Customer navigation" className="flex flex-wrap gap-1">
            <NavigationLink to="/" label="Home" end />
            <NavigationLink to="/menu" label="Menu" />
            <NavigationLink to="/cart" label="Cart" />
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
        <Outlet />
      </main>
      <footer className="border-t border-stone-200">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-3 px-4 py-5 text-sm text-stone-600 sm:px-6">
          <p>BrewLogic · Coffee Shop Management System</p>
          <Link to="/manage" className="underline underline-offset-4 hover:text-stone-900">Management</Link>
        </div>
      </footer>
    </div>
  )
}
