import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { getSalesAnalytics } from '../../api/analytics'
import { useManagementData } from '../../hooks/useManagementData'
import { salesRangeSchema, formatSalesDate, getAnalyticsError } from '../../utils/analytics'
import type { SalesRangeValues } from '../../utils/analytics'
import Metrics from './Metrics'
import DailySalesChart from './DailySalesChart'
import LoadingState from '../common/LoadingState'
import ErrorState from '../common/ErrorState'
export default function SalesReport() {
 const [filters, setFilters] = useState<SalesRangeValues>({ start: '', end: '' })
 const tag = JSON.stringify(filters)
 const load = useCallback(async (signal: AbortSignal) => ({ tag, report: await getSalesAnalytics({ start: filters.start || undefined, end: filters.end || undefined }, signal) }), [filters, tag])
 const { data, loading, error, refresh } = useManagementData(load, getAnalyticsError)
 const { register, handleSubmit, reset, formState: { errors } } = useForm<SalesRangeValues>({ resolver: zodResolver(salesRangeSchema), defaultValues: { start: '', end: '' } })
 function apply(values: SalesRangeValues) { if (JSON.stringify(values) !== tag) { setFilters(values); refresh() } }
 function clear() { const empty = { start: '', end: '' }; reset(empty); apply(empty) }
 const report = data?.tag === tag ? data.report : null
 const range = !filters.start && !filters.end ? 'All completed-order history' : filters.start && filters.end ? formatSalesDate(filters.start) + ' - ' + formatSalesDate(filters.end) : filters.start ? 'From ' + formatSalesDate(filters.start) : 'Through ' + formatSalesDate(filters.end)
 return <section aria-label="Date-range report" className="space-y-5"><h2 className="text-xl font-semibold">Date-range sales report</h2><p className="text-sm text-stone-600">Dates use Asia/Manila. Only completed orders are included.</p>
 <form noValidate onSubmit={handleSubmit(apply)} className="rounded-xl border border-stone-200 bg-white p-5"><div className="grid gap-4 sm:grid-cols-2"><label>Start date<input type="date" {...register('start')} aria-invalid={!!errors.start} aria-describedby="start-error" className="mt-2 block w-full min-w-0 rounded-lg border p-3 focus-visible:outline-2 focus-visible:outline-amber-800" />{errors.start && <span id="start-error" role="alert" className="mt-2 block text-sm text-red-800">{errors.start.message}</span>}</label><label>End date<input type="date" {...register('end')} aria-invalid={!!errors.end} aria-describedby="end-error" className="mt-2 block w-full min-w-0 rounded-lg border p-3 focus-visible:outline-2 focus-visible:outline-amber-800" />{errors.end && <span id="end-error" role="alert" className="mt-2 block text-sm text-red-800">{errors.end.message}</span>}</label></div><div className="mt-5 flex flex-wrap gap-3"><button type="submit" className="rounded-lg bg-amber-950 px-5 py-3 font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2">Apply date range</button><button type="button" onClick={clear} className="rounded-lg border px-5 py-3 font-medium focus-visible:outline-2 focus-visible:outline-offset-2">Clear dates</button></div></form>
 <p role="status" className="font-medium text-stone-600">{range}</p>
 {error ? <ErrorState message={error} onRetry={refresh} /> : loading || !report ? <LoadingState message="Loading sales report..." /> : <><Metrics revenue={report.totalRevenue} orders={report.totalOrders} items={report.totalItemsSold} average={report.averageOrderValue} /><h3 className="text-lg font-semibold">Daily sales</h3><DailySalesChart days={report.dailySales} /></>}
 </section>
}
