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
    <div className="min-h-screen md:grid md:grid-cols-[16rem_minmax(0,1fr)]">
      <aside className="border-b border-stone-200 bg-white p-5 md:border-r md:border-b-0">
        <Link to="/manage" className="text-xl font-bold tracking-tight">BrewLogic Management</Link>
        <nav aria-label="Management navigation" className="mt-6 flex flex-wrap gap-1 md:flex-col">
          {links.map((link) => <NavigationLink key={link.to} {...link} />)}
        </nav>
        <Link to="/" className="mt-6 inline-block text-sm text-stone-600 underline underline-offset-4 hover:text-stone-900">
          Back to customer site
        </Link>
      </aside>
      <main className="min-w-0 p-4 py-8 sm:p-8">
        <div className="mx-auto max-w-6xl"><Outlet /></div>
      </main>
    </div>
  )
}
