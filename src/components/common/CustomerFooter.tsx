import { Link } from 'react-router-dom'
import HomeWordmarkLink from '../navigation/HomeWordmarkLink'
import brandLogo from '../../assets/sinis-tsa-logo.svg'

// Supply confirmed destinations before rendering these entries as links.
const legalLinks: { label: string; href?: string }[] = [
  { label: 'Privacy Policy' }, { label: 'Terms of Use' },
]
const socialLinks: { name: string; href?: string; path: string }[] = [
  { name: 'Facebook', path: 'M14 21v-8h3l.5-4H14V7c0-1 .5-1.5 1.5-1.5H18V2.2c-.8-.1-1.8-.2-3-.2-3 0-5 1.8-5 5v2H7v4h3v8Z' },
  { name: 'TikTok', path: 'M14 3v12a3 3 0 1 1-3-3V8a7 7 0 1 0 7 7V9a8 8 0 0 0 4 1V6a4 4 0 0 1-4-3Z' },
  { name: 'Instagram', path: 'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm6-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z' },
  { name: 'YouTube', path: 'M22 7c-.3-2-1-3-3-3H5C3 4 2.3 5 2 7a30 30 0 0 0 0 10c.3 2 1 3 3 3h14c2 0 2.7-1 3-3a30 30 0 0 0 0-10ZM10 8l6 4-6 4Z' },
]

export default function CustomerFooter() {
  const year = new Date().getFullYear()
  const iconClass = 'sinis-footer-social inline-flex h-11 w-11 items-center justify-center rounded-full'
  return (
    <footer className="sinis-footer w-full bg-header-green text-white">
      <div className="mx-auto w-full max-w-[1440px] px-5 py-10 sm:px-8 lg:px-12">
        <div className="flex flex-col items-start gap-6 lg:grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-center lg:gap-8">
          <HomeWordmarkLink aria-label="SINIS TSA home" className="inline-flex min-h-11 items-center gap-3 rounded-sm text-white">
            <img src={brandLogo} alt="" className="h-14 w-14 shrink-0 object-contain sm:h-16 sm:w-16" />
            <span className="whitespace-nowrap font-wordmark text-3xl leading-tight font-normal tracking-[0.04em] sm:text-4xl">SINIS TSA</span>
          </HomeWordmarkLink>
          <div className="flex w-full flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center text-sm lg:w-auto">
            {legalLinks.map(({ label, href }) => href ? <Link key={label} to={href} className="sinis-footer-hover inline-flex min-h-11 items-center rounded-sm">{label}</Link> : <button key={label} type="button" className="sinis-footer-hover inline-flex min-h-11 items-center rounded-sm border-0 bg-transparent">{label}</button>)}
          </div>
          <div role="group" aria-label="Social platforms" className="flex flex-wrap gap-2 lg:justify-self-end">
            {socialLinks.map(({ name, href, path }) => {
              const icon = <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" fillRule="evenodd"><path d={path} /></svg>
              return href ? <a key={name} href={href} aria-label={name} className={iconClass}>{icon}</a> : <button key={name} type="button" aria-label={name} className={iconClass}>{icon}</button>
            })}
          </div>
        </div>
        <div className="mt-6 border-t border-white/25 pt-6 text-center text-xs leading-6">
          <p>© {year} <strong className="font-brand font-extrabold">SINIS TSA</strong>. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
