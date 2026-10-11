import { Link, type LinkProps } from 'react-router-dom'

export default function HomeWordmarkLink(props: Omit<LinkProps, 'to'>) {
  return <Link {...props} to="/" />
}
