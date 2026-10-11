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

export default function MenuPage() {
  const { items, categories, loading, error, refresh } = useMenuItems()
  const [categoryId, setCategoryId] = useState('')
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
    <SignatureShowcase items={items} loading={loading} error={error} />
    <div ref={revealRef}><section className="complete-menu-section" aria-labelledby="complete-menu-title">
      <div className="complete-menu-intro">
        <h2 id="complete-menu-title"><span className="block" data-scroll-reveal data-reveal-key="heading:explore">EXPLORE OUR MENU</span></h2>
        <p className="text-muted">Find your favorite, then check its sizes and current availability.</p>
      </div>
      <MenuCategoryNavigation categories={categories} selectedId={categoryId} onSelect={setCategoryId} />
      <div className="complete-menu-products">
        {loading ? <LoadingState /> : error ? <ErrorState message={error} onRetry={refresh} /> : !categoryId || categoryId === signaturesFilterId ? <>
          <section aria-labelledby="signature-menu-heading" className="complete-menu-group">
            <h3 id="signature-menu-heading" className="complete-menu-group-title"><span className="block" data-scroll-reveal data-reveal-key="heading:signatures">SIGNATURES</span></h3>
            <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {uniqueSignatures.map(({ presentation, item }) => item ?
                <div key={item._id} className="menu-reveal-tile" data-scroll-reveal data-reveal-tile data-reveal-key={`product:${item._id}`}><MenuCard item={item} showCategory={false} /></div> :
                <div key={presentation.id} className="menu-reveal-tile" data-scroll-reveal data-reveal-tile data-reveal-key={`presentation:${presentation.id}`}><SignaturePresentationCard slide={presentation} /></div>)}
            </div>
          </section>
          {!categoryId && typeSections.map(group => <section key={group.id} aria-labelledby={`menu-group-${group.id}`} className="complete-menu-group">
            <h3 id={`menu-group-${group.id}`} className="complete-menu-group-title"><span className="block" data-scroll-reveal data-reveal-key={`heading:${group.id}`}>{group.name}</span></h3>
            <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">{group.items.map(item => <div key={item._id} className="menu-reveal-tile" data-scroll-reveal data-reveal-tile data-reveal-key={`product:${item._id}`}><MenuCard item={item} showCategory={false} /></div>)}</div>
          </section>)}
          {!categoryId && !items.length && <EmptyState message="Our menu is currently empty. Please check back soon." />}
        </> : !filtered.length ?
          <EmptyState message={items.length ? 'No menu items in this category right now. Try another category.' : 'Our menu is currently empty. Please check back soon.'} /> :
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">{filtered.map(item => <div key={item._id} className="menu-reveal-tile" data-scroll-reveal data-reveal-tile data-reveal-key={`product:${item._id}`}><MenuCard item={item} showCategory={!categoryId} /></div>)}</div>}
      </div>
    </section></div>
  </div>
}
