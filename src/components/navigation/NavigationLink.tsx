import { NavLink } from 'react-router-dom'

type NavigationLinkProps = {
  to: string
  label: string
  end?: boolean
}

export default function NavigationLink({ to, label, end = false }: NavigationLinkProps) {
  return (
    <NavLink to={to} end={end} className={({ isActive }) => `brew-nav-link${isActive ? ' is-active' : ''}`}>
      {label}
    </NavLink>
  )
}
