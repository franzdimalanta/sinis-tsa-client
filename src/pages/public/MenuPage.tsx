import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import useScrollReveal from '../../hooks/useScrollReveal'
import { useMenuItems } from '../../hooks/useMenuItems'
import MenuCard from '../../components/menu/MenuCard'
import LoadingState from '../../components/common/LoadingState'
import ErrorState from '../../components/common/ErrorState'
import EmptyState from '../../components/common/EmptyState'
import SignatureShowcase from '../../components/menu/SignatureShowcase'
import MenuCategoryNavigation from '../../components/menu/MenuCategoryNavigation'
import SignaturePresentationCard from '../../components/menu/SignaturePresentationCard'
import { getSignatureEntries, signaturesFilterId } from '../../components/menu/signatureMembership'
import { presentMenuItem, plannedWaffles, hiddenMenuProductIds } from '../../components/menu/productPresentation'
import { signatureSlides } from '../../components/menu/signatureSlides'

export default function MenuPage() {
  const { items: apiItems, categories, loading, error, refresh } = useMenuItems()
  const items = apiItems.filter(item => !hiddenMenuProductIds.has(item._id)).map(presentMenuItem)
  const [categoryId, setCategoryId] = useState('')
  const coffeePreview = categories.find(category => category._id === categoryId)?.name === 'Coffee'
    ? signatureSlides.find(slide => slide.id === 'hyper-macchiato' && !slide.menuItemId) : undefined
  const location = useLocation()
  const revealRef = useScrollReveal({ dynamic: true, visitKey: location.key, distance: 16, stagger: 70 })
  const filtered = items.filter(item => !categoryId || item.category?._id === categoryId)
  const signatures = getSignatureEntries(items)
  const signatureIds = new Set(signatures.flatMap(entry => entry.item ? [entry.item._id] : []))
  const uniqueSignatures = signatures.filter((entry, index) => !entry.item || signatures.findIndex(other => other.item?._id === entry.item?._id) === index)
  const typeGroups = new Map(categories.map(category => [category._id, category.name]))
  for (const item of items) typeGroups.set(item.category?._id ?? 'uncategorized', item.category?.name ?? 'Uncategorized')
  const typeSections = [...typeGroups].map(([id, name]) => ({ id, name,
    items: items.filter(item => (item.category?._id ?? 'uncategorized') === id && !signatureIds.has(item._id)),
  })).filter(group => group.items.length)
  return <div className="customer-page">
    <SignatureShowcase />
    <div ref={revealRef}><section className="complete-menu-section" aria-labelledby="complete-menu-title">
      <div className="complete-menu-intro">
        <h2 id="complete-menu-title" className="customer-heading"><span className="block" data-scroll-reveal data-reveal-key="heading:explore">PICK YOUR LITTLE TEMPTATION</span></h2>
        <p className="text-muted">Coffee, tea, and a little sweet trouble. Pick your favorite, then check sizes and availability.</p>
      </div>
      <MenuCategoryNavigation categories={categories} selectedId={categoryId} onSelect={setCategoryId} />
      <div className="complete-menu-products">
        {loading ? <LoadingState /> : error ? <ErrorState message={error} onRetry={refresh} /> : !categoryId || categoryId === signaturesFilterId ? <>
          <section aria-labelledby="signature-menu-heading" className="complete-menu-group">
            <h3 id="signature-menu-heading" className="complete-menu-group-title customer-heading"><span className="block" data-scroll-reveal data-reveal-key="heading:signatures">SIGNATURES</span></h3>
            <div className="signature-menu-grid grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {uniqueSignatures.map(({ presentation, item }) =>
                <div key={item?._id ?? presentation.id} className="menu-reveal-tile" data-scroll-reveal data-reveal-tile data-reveal-key={item ? `product:${item._id}` : `presentation:${presentation.id}`}><SignaturePresentationCard slide={presentation} item={item} /></div>)}
            </div>
          </section>
          {!categoryId && typeSections.map(group => <section key={group.id} aria-labelledby={`menu-group-${group.id}`} className="complete-menu-group">
            <h3 id={`menu-group-${group.id}`} className="complete-menu-group-title customer-heading"><span className="block" data-scroll-reveal data-reveal-key={`heading:${group.id}`}>{group.name}</span></h3>
            <div className="signature-menu-grid grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">{group.items.map(item => <div key={item._id} className="menu-reveal-tile" data-scroll-reveal data-reveal-tile data-reveal-key={`product:${item._id}`}><MenuCard item={item} showCategory={false} /></div>)}</div>
          </section>)}
          {!categoryId && !items.length && <EmptyState message="Our menu is currently empty. Please check back soon." />}
        </> : !filtered.length && !coffeePreview ?
          <EmptyState message={items.length ? 'No menu items in this category right now. Try another category.' : 'Our menu is currently empty. Please check back soon.'} /> :
          <div className="signature-menu-grid grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">{filtered.map(item => <div key={item._id} className="menu-reveal-tile" data-scroll-reveal data-reveal-tile data-reveal-key={`product:${item._id}`}><MenuCard item={item} showCategory={!categoryId} /></div>)}
            {coffeePreview && <div className="menu-reveal-tile" data-scroll-reveal data-reveal-tile data-reveal-key={`presentation:${coffeePreview.id}`}><SignaturePresentationCard slide={coffeePreview} /></div>}
          </div>}
        {!loading && !error && (!categoryId || categories.find(category => category._id === categoryId)?.name === 'Pastries') && <section aria-labelledby="waffle-menu-heading" className="complete-menu-group mt-12">
          <h3 id="waffle-menu-heading" className="complete-menu-group-title customer-heading"><span data-scroll-reveal data-reveal-key="heading:waffles">WAFFLES / COMING SOON</span></h3>
          <div className="signature-menu-grid grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">{plannedWaffles.map(product => <div key={product.id} className="menu-reveal-tile" data-scroll-reveal data-reveal-tile data-reveal-key={`presentation:${product.id}`}><SignaturePresentationCard slide={product} /></div>)}</div>
        </section>}
      </div>
    </section></div>
  </div>
}
