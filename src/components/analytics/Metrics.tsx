import { formatPeso } from '../../utils/formatPeso'
export default function Metrics({ revenue, orders, items, average, discounts }: { revenue: number; orders: number; items: number; average: number; discounts?: number }) {
 const metrics: [string, string | number][] = [['Total revenue', formatPeso(revenue)], ['Completed orders', orders], ['Items sold', items], ['Average order value', formatPeso(average)]]
 if (discounts !== undefined) metrics.push(['Total discounts', formatPeso(discounts)])
 return <dl className="management-metrics grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{metrics.map(([label, value]) => <div key={label} className="rounded-xl border border-stone-200 bg-white p-5"><dt className="text-sm text-stone-600">{label}</dt><dd className="mt-3 break-words text-2xl font-semibold">{value}</dd></div>)}</dl>
}
