import type { DailySales } from '../../types/analytics'
import { formatPeso } from '../../utils/formatPeso'
import { formatSalesDate } from '../../utils/analytics'
import EmptyState from '../common/EmptyState'
export default function DailySalesChart({ days }: { days: DailySales[] }) {
 if (!days.length) return <EmptyState message="No completed sales in this date range. Try another range or clear dates." />
 const maximum = Math.max(...days.map(day => day.revenue), 0)
 return <ul aria-label="Daily sales" className="space-y-4">{days.map(day => <li key={day.date} className="rounded-xl border border-stone-200 bg-white p-5"><div className="flex flex-wrap justify-between gap-3"><h4 className="font-semibold"><time dateTime={day.date}>{formatSalesDate(day.date)}</time></h4><p className="font-semibold">{formatPeso(day.revenue)}</p></div><p className="mt-2 text-sm text-stone-600">{day.orders} orders / {day.itemsSold} items sold</p><div aria-hidden="true" className="mt-4 h-3 overflow-hidden rounded-full bg-stone-100"><div className="h-full rounded-full bg-amber-800" style={{ width: maximum > 0 ? (day.revenue / maximum * 100) + '%' : '0%' }} /></div></li>)}</ul>
}
