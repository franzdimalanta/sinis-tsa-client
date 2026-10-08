import { getOrderStatusCounts } from '../../api/analytics'
import { useManagementData } from '../../hooks/useManagementData'
import { getAnalyticsError } from '../../utils/analytics'
import { orderStatuses, statusStyles } from '../../utils/orderWorkflow'
import LoadingState from '../common/LoadingState'
import ErrorState from '../common/ErrorState'
export default function StatusBreakdown() {
 const { data, loading, error, refresh } = useManagementData(getOrderStatusCounts, getAnalyticsError)
 return <section className="space-y-4"><h2 className="text-xl font-semibold">Order status breakdown</h2>{loading ? <LoadingState message="Loading order counts..." /> : error ? <ErrorState message={error} onRetry={refresh} /> : data && <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-5">{orderStatuses.map(status => <div key={status} className={'rounded-xl p-5 ' + statusStyles[status]}><dt className="capitalize">{status}</dt><dd className="mt-2 text-2xl font-semibold">{data[status] ?? 0}</dd></div>)}</dl>}</section>
}
