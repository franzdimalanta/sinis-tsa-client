import { Link } from 'react-router-dom'
import type { MenuItem } from '../../types/menu'
import { formatPeso } from '../../utils/formatPeso'
export default function MenuCard({ item }: { item: MenuItem }) {
 return <article className="flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
  <div aria-hidden="true" className="flex h-28 items-center justify-center bg-amber-50 text-4xl text-amber-900">BrewLogic</div>
  <div className="flex flex-1 flex-col p-6"><p className="text-xs font-semibold uppercase tracking-widest text-amber-800">{item.category?.name ?? 'Uncategorized'}</p><h2 className="mt-2 text-xl font-semibold">{item.name}</h2><p className="mt-2 flex-1 text-sm leading-6 text-stone-600">{item.description}</p>
   <p className="mt-4 font-semibold">{item.sizes.length ? 'From ' + formatPeso(Math.min(...item.sizes.map(size => size.price))) : 'Prices unavailable'}</p><p className="mt-1 text-sm capitalize text-stone-500">{item.sizes.map(size => size.size).join(' / ')}</p>
   <Link to={'/menu/' + item._id} aria-label={'View ' + item.name} className="mt-5 rounded-lg border border-amber-900 px-4 py-2 text-center font-medium text-amber-950 hover:bg-amber-50 focus-visible:outline-2 focus-visible:outline-offset-2">View sizes & availability</Link>
  </div></article>
}
