import { Link, useParams } from 'react-router-dom'
import ProductDetails from '../../components/menu/ProductDetails'

export default function MenuItemPage() {
  const { id = '' } = useParams()
  return <div className="customer-page space-y-8">
    <Link to="/menu" className="inline-block text-sm font-medium text-header-green underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2">Back to menu</Link>
    <ProductDetails key={id} id={id} />
  </div>
}
