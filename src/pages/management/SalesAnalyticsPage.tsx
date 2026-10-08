import OverallSummary from '../../components/analytics/OverallSummary'
import SalesReport from '../../components/analytics/SalesReport'
import BestSellers from '../../components/analytics/BestSellers'
import StatusBreakdown from '../../components/analytics/StatusBreakdown'
export default function SalesAnalyticsPage() {
 return <div className="space-y-10"><header><h1 className="text-3xl font-semibold">Sales analytics</h1><p className="mt-3 text-stone-600">Completed-order sales, historical best sellers, and current order counts.</p></header><OverallSummary /><SalesReport /><BestSellers /><StatusBreakdown /></div>
}
