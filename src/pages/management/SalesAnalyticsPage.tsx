import ManagementPageHeader from '../../components/management/ManagementPageHeader'
import OverallSummary from '../../components/analytics/OverallSummary'
import SalesReport from '../../components/analytics/SalesReport'
import BestSellers from '../../components/analytics/BestSellers'
import StatusBreakdown from '../../components/analytics/StatusBreakdown'
export default function SalesAnalyticsPage() {
 return <div className="space-y-10"><ManagementPageHeader title="Sales analytics" description="Understand completed sales and ordering activity, with reports grouped in Manila time." /><OverallSummary /><SalesReport /><BestSellers /><StatusBreakdown /></div>
}
