import { getAnalyticsSummary } from '../../api/analytics'
import { useManagementData } from '../../hooks/useManagementData'
import { getAnalyticsError } from '../../utils/analytics'
import Metrics from './Metrics'
import LoadingState from '../common/LoadingState'
import ErrorState from '../common/ErrorState'
export default function OverallSummary() {
 const { data, loading, error, refresh } = useManagementData(getAnalyticsSummary, getAnalyticsError)
 return <section aria-label="Overall sales summary" className="space-y-4"><h2 className="text-xl font-semibold">Overall completed sales</h2>{loading ? <LoadingState message="Loading overall summary..." /> : error ? <ErrorState message={error} onRetry={refresh} /> : data && <Metrics revenue={data.totalRevenue} orders={data.totalOrders} items={data.totalItemsSold} average={data.averageOrderValue} discounts={data.totalDiscounts} />}</section>
}
