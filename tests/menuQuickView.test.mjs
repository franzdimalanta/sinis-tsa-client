import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'
import ts from 'typescript'

async function loadUtility(name, instance = '') {
  const source = await readFile(new URL(`../src/utils/${name}.ts`, import.meta.url), 'utf8')
  const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } })
  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}#${instance}`)
}
const routes = await loadUtility('menuModalRoute')
const { availableProductSizes } = await loadUtility('availableProductSizes')
const { isCartItem } = await loadUtility('cartStorage')
const menu = { pathname: '/menu', search: '', hash: '', key: 'menu-visit', state: null }
const detail = { ...menu, pathname: '/menu/6ac7bb0d53ee9c5d90b27d0c', key: 'detail', state: { backgroundLocation: menu } }

test('direct detail URLs render standalone', () => {
  assert.equal(routes.getMenuBackground({ ...detail, state: null }), undefined)
})
test('menu navigation provides a background; Back selects menu and Forward restores modal', () => {
  routes.rememberMenuVisit(menu)
  assert.equal(routes.getMenuBackground(detail), menu)
  assert.equal(routes.getMenuBackground(menu), undefined)
  assert.equal(routes.getMenuBackground(detail), menu)
})
test('refresh ignores persisted history background state', async () => {
  const refreshed = await loadUtility('menuModalRoute', 'fresh-runtime')
  assert.equal(refreshed.getMenuBackground(detail), undefined)
})
test('non-menu origins and cart routes cannot open a menu modal', () => {
  const cart = { ...menu, pathname: '/cart', key: 'cart' }
  routes.rememberMenuVisit(cart)
  assert.equal(routes.getMenuBackground({ ...detail, state: { backgroundLocation: cart } }), undefined)
  assert.equal(routes.getMenuBackground({ ...detail, pathname: '/cart' }), undefined)
})
const item = { _id: '6ac7bb0d53ee9c5d90b27d0c', name: 'Americano', isActive: true,
  sizes: [{ size: 'small', price: 90 }, { size: 'medium', price: 110 }, { size: 'large', price: 130 }] }
const availability = { sizes: [{ size: 'small', available: false }, { size: 'medium', available: true, price: 999 }] }
test('only active, available catalog sizes can be selected, at catalog prices', () => {
  assert.deepEqual(availableProductSizes(item, availability), [{ size: 'medium', price: 110 }])
  assert.deepEqual(availableProductSizes({ ...item, isActive: false }, availability), [])
  assert.deepEqual(availableProductSizes(item, { sizes: [] }), [])
})
test('available selection produces a valid cart payload without changing the API price', () => {
  const size = availableProductSizes(item, availability)[0]
  assert.equal(isCartItem({ menuItemId: item._id, name: item.name, size: size.size, quantity: 1, unitPrice: size.price }), true)
})
