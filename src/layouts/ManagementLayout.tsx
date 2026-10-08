import { Link, Outlet } from 'react-router-dom'
import NavigationLink from '../components/navigation/NavigationLink'

const links = [
  { to: '/manage', label: 'Dashboard', end: true },
  { to: '/manage/menu', label: 'Menu' },
  { to: '/manage/orders', label: 'Orders' },
  { to: '/manage/inventory', label: 'Inventory' },
  { to: '/manage/recipes', label: 'Recipes' },
  { to: '/manage/analytics', label: 'Analytics' },
]

export default function ManagementLayout() {
  return (
    <div className="min-h-screen bg-background md:grid md:grid-cols-[15rem_minmax(0,1fr)] lg:grid-cols-[16rem_minmax(0,1fr)]">
      <aside className="management-sidebar min-w-0 bg-primary px-5 py-6 text-background md:sticky md:top-0 md:flex md:h-screen md:flex-col md:px-6 md:py-8">
        <Link to="/manage" className="block w-fit focus-visible:outline-background">
          <span className="block font-editorial text-3xl leading-none tracking-tight">BrewLogic</span>
          <span className="mt-3 block text-[0.65rem] uppercase tracking-[0.2em] text-surface-warm">Management</span>
        </Link>
        <nav aria-label="Management navigation" className="mt-6 flex flex-wrap gap-1 md:mt-10 md:flex-col md:gap-2">
          {links.map((link) => <NavigationLink key={link.to} {...link} />)}
        </nav>
        <div className="mt-6 border-t border-accent/40 pt-5 md:mt-auto">
          <Link to="/" className="text-sm text-surface-warm underline underline-offset-4 hover:text-white focus-visible:outline-background">
            Back to customer site
          </Link>
        </div>
      </aside>
      <main className="management-workspace min-w-0 px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
        <div className="mx-auto min-w-0 max-w-6xl"><Outlet /></div>
      </main>
    </div>
  )
}
