import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import vm from 'node:vm'
import test from 'node:test'
import ts from 'typescript'

const require = createRequire(import.meta.url)
async function load(path, dependencies = {}, globals = {}) {
  const source = await readFile(new URL(`../src/${path}`, import.meta.url), 'utf8')
  const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: false } })
  const exports = {}
  vm.runInNewContext(outputText, { ...globals, exports, require(name) {
    if (name in dependencies) return dependencies[name]
    if (name === 'react/jsx-runtime') return require(name)
    throw Error(`Unexpected dependency: ${name}`)
  } })
  return exports
}
function hooks() {
  const states = [], refs = []
  let stateIndex = 0, refIndex = 0
  return {
    reset() { stateIndex = 0; refIndex = 0 },
    useState(initial) {
      const index = stateIndex++
      if (!(index in states)) states[index] = typeof initial === 'function' ? initial() : initial
      return [states[index], value => { states[index] = typeof value === 'function' ? value(states[index]) : value }]
    },
    useRef(initial) { const index = refIndex++; return refs[index] ??= { current: initial } },
    useEffect(callback) { callback() },
    useLayoutEffect() {},
  }
}
function elements(node) {
  if (Array.isArray(node)) return node.flatMap(elements)
  if (!node || typeof node !== 'object' || !node.props) return []
  return [node, ...elements(node.props.children)]
}

test('cart quantity, removal, persistence and clear confirmation use existing handlers', async () => {
  const stored = new Map()
  const localStorage = { getItem: key => stored.get(key) ?? null, setItem: (key, value) => stored.set(key, value) }
  const storage = await load('utils/cartStorage.ts', {}, { localStorage })
  const providerHooks = hooks()
  const { default: Provider } = await load('context/CartProvider.tsx', {
    react: providerHooks, './cartContext': { CartContext: { Provider: 'provider' } }, '../utils/cartStorage': storage,
  }, { localStorage })
  const cart = () => { providerHooks.reset(); return Provider({ children: null }).props.value }
  const item = { menuItemId: '6ac7bb0d53ee9c5d90b27d0c', name: 'Americano', size: 'small', unitPrice: 90, quantity: 1 }
  cart().addItem(item)
  cart().addItem({ ...item, size: 'medium', unitPrice: 110 })
  cart().updateQuantity(item.menuItemId, 'small', 3)
  assert.equal(cart().totalQuantity, 4)
  assert.equal(cart().subtotal, 380)
  cart().updateQuantity(item.menuItemId, 'small', 0)
  assert.equal(cart().totalQuantity, 4)
  assert.equal(JSON.parse(stored.get(storage.cartStorageKey)).length, 2)

  let clearCalls = 0
  const pageHooks = hooks()
  const { default: CartPage } = await load('pages/public/CartPage.tsx', {
    react: pageHooks, 'react-router-dom': { Link: 'a' },
    '../../hooks/useCart': { useCart: () => ({ ...cart(), clearCart() { clearCalls++; cart().clearCart() } }) },
    '../../utils/formatPeso': { formatPeso: value => `PHP ${value}` },
    '../../components/menu/menuProductImages': { menuProductImages: {} },
    '../../components/cart/CartSummary': { default: 'summary' },
    '../../components/cart/ClearCartDialog': { default: 'clear-dialog' },
    '../../assets/sinis-tsa-logo.svg': { default: 'logo' },
    '../../components/menu/ProductThumbnail': { default: 'thumbnail' },
    '../../components/menu/productPresentation': { productPresentation: {} },
    '../../components/cart/cartPage.css': {},
  })
  const render = () => { pageHooks.reset(); return elements(CartPage()) }
  const open = () => render().find(node => node.props.className === 'cart-quiet-action cart-clear').props.onClick({ currentTarget: { focus() {} } })
  open()
  assert.equal(cart().totalQuantity, 4)
  render().find(node => node.type === 'clear-dialog').props.onCancel()
  assert.equal(clearCalls, 0)
  assert.equal(render().some(node => node.type === 'clear-dialog'), false)
  render().find(node => node.props['aria-label'] === 'Remove Americano medium from cart').props.onClick()
  assert.equal(cart().totalQuantity, 3)
  open()
  const props = render().find(node => node.type === 'clear-dialog').props
  const dialogHooks = hooks()
  const { default: Dialog } = await load('components/cart/ClearCartDialog.tsx', {
    react: dialogHooks, 'react-dom': { createPortal: node => node },
  }, { document: { body: {} } })
  let cancelled = 0
  const dialog = Dialog({ ...props, onCancel() { cancelled++ } })
  dialog.props.onCancel({ preventDefault() {} })
  assert.equal(cancelled, 1)
  assert.equal(clearCalls, 0)
  elements(dialog).find(node => node.props.className === 'cart-confirm-keep').props.onClick()
  assert.equal(cancelled, 2)
  const confirm = elements(dialog).find(node => node.props.className === 'cart-confirm-clear')
  confirm.props.onClick()
  confirm.props.onClick()
  assert.equal(clearCalls, 1)
  assert.equal(cart().items.length, 0)
  assert.equal(cart().subtotal, 0)
  assert.equal(render().some(node => node.props.className === 'cart-empty'), true)
  assert.equal(render().some(node => node.props.className === 'cart-quiet-action cart-clear'), false)
})
