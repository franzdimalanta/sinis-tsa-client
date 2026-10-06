import { NavLink } from 'react-router-dom'

type NavigationLinkProps = {
  to: string
  label: string
  end?: boolean
}

export default function NavigationLink({ to, label, end = false }: NavigationLinkProps) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-700 ${isActive ? 'bg-stone-800 text-white' : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'}`
      }
    >
      {label}
    </NavLink>
  )
}
