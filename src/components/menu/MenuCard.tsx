import { Link } from 'react-router-dom'
import type { MenuItem } from '../../types/menu'
import { formatPeso } from '../../utils/formatPeso'
import CoffeeVisual from './CoffeeVisual'
export default function MenuCard({ item }: { item: MenuItem }) {
 return <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition-shadow hover:shadow-sm motion-reduce:transition-none">
  <CoffeeVisual compact />
  <div className="flex flex-1 flex-col p-6"><p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-muted">{item.category?.name ?? 'Uncategorized'}</p><h2 className="mt-3 font-editorial text-2xl leading-tight text-primary">{item.name}</h2><p className="mt-3 flex-1 text-sm leading-7 text-muted">{item.description}</p>
   <p className="mt-5 text-lg font-semibold text-foreground">{item.sizes.length ? 'From ' + formatPeso(Math.min(...item.sizes.map(size => size.price))) : 'Prices unavailable'}</p><p className="mt-1 text-xs capitalize text-muted">{item.sizes.map(size => size.size).join(' / ')}</p>
   <Link to={'/menu/' + item._id} aria-label={'View ' + item.name} className="ui-button ui-button-secondary mt-5 min-h-11">View sizes & availability</Link>
   <p className="mt-3 text-xs text-muted">Check live availability in item details.</p>
  </div></article>
}
