import { Link, useLocation, type LinkProps } from 'react-router-dom'
import { rememberMenuVisit } from '../../utils/menuModalRoute'

export default function ProductDetailsLink(props: LinkProps) {
  const location = useLocation()
  return <Link {...props} state={{ backgroundLocation: location }} onClick={event => {
    props.onClick?.(event)
    if (!event.defaultPrevented && event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
      event.currentTarget.focus({ preventScroll: true })
      rememberMenuVisit(location)
    }
  }} />
}
