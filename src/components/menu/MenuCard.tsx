import ProductDetailsLink from './ProductDetailsLink'
import type { MenuItem } from '../../types/menu'
import { formatPeso } from '../../utils/formatPeso'
import MenuProductVisual from './MenuProductVisual'
import { isDrink } from './menuProductImages'
import './menuTile.css'

export default function MenuCard({ item, showCategory = true }: { item: MenuItem; showCategory?: boolean }) {
  return <article className="menu-tile">
    <MenuProductVisual item={item} />
    <div className="menu-tile-details">
      {showCategory && <p className="menu-tile-category">{item.category?.name ?? 'Uncategorized'}</p>}
      <h2 className="menu-tile-name">{item.name}</h2>
      <p className="menu-tile-description">{item.description}</p>
      <div className="menu-tile-purchase">
        <p className="menu-tile-price">{item.sizes.length ? 'From ' + formatPeso(Math.min(...item.sizes.map(size => size.price))) : 'Prices unavailable'}</p>
        <p className="menu-tile-sizes">{item.sizes.map(size => size.size).join(' / ')}</p>
        <ProductDetailsLink to={'/menu/' + encodeURIComponent(item._id)} aria-label={`View ${isDrink(item) ? 'Drink' : 'Item'}: ${item.name}`} className="menu-tile-action">{isDrink(item) ? 'View Drink' : 'View Item'}</ProductDetailsLink>
      </div>
    </div>
  </article>
}
