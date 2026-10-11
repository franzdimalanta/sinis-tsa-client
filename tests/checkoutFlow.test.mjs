import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import vm from 'node:vm'
import test from 'node:test'
import ts from 'typescript'
const require = createRequire(import.meta.url)

test('checkout validation, review invalidation, failures and single successful submission use mocked APIs', async () => {
 const source = await readFile(new URL('../src/pages/public/CheckoutPage.tsx', import.meta.url), 'utf8')
 const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } })
 let states = [], refs = [], stateIndex = 0, refIndex = 0, schema, errors = {}, previewCalls = 0, orderCalls = 0, clearCalls = 0, destination
 let values = { customerName: 'A', orderType: 'takeout', notes: '' }
 const cart = { items: [{ menuItemId: '6ac7bb0d53ee9c5d90b27d0c', name: 'Americano', size: 'small', quantity: 1, unitPrice: 90 }], totalQuantity: 1, subtotal: 90, clearCart() { clearCalls++ } }
 const preview = { items: [], subtotal: 90, discountAmount: 0, total: 90, stockAvailable: true }
 let previewAPI = async () => preview, orderAPI = async () => ({ _id: 'mock-order' })
 const exports = {}
 vm.runInNewContext(outputText, { exports, require(name) {
  if (name === 'react') return {
   useState(initial) { const index = stateIndex++; if (!(index in states)) states[index] = initial; return [states[index], value => { states[index] = typeof value === 'function' ? value(states[index]) : value }] },
   useRef(initial) { const index = refIndex++; return refs[index] ??= { current: initial } },
  }
  if (name === 'react-router-dom') return { Link: 'a', useNavigate: () => path => { destination = path } }
  if (name === '@hookform/resolvers/zod') return { zodResolver(value) { schema = value; return {} } }
  if (name === 'react-hook-form') return {
   useWatch: () => values,
   useForm: () => ({ register: name => ({ name }), control: {}, getValues: () => values, formState: { errors }, handleSubmit: fn => async () => {
    const result = schema.safeParse(values)
    if (result.success) { errors = {}; await fn(result.data) }
    else errors = Object.fromEntries(result.error.issues.map(issue => [issue.path[0], { message: issue.message }]))
   } }),
  }
  if (name.includes('hooks/useCart')) return { useCart: () => cart }
  if (name.includes('api/orders')) return { previewOrder: payload => { previewCalls++; return previewAPI(payload) }, createOrder: payload => { orderCalls++; return orderAPI(payload) } }
  if (name.includes('utils/orderError')) return { getOrderError: error => error.message }
  if (name.endsWith('.css')) return {}
  if (name.includes('components/')) return { default: 'mock-component', __esModule: true }
  return require(name)
 } })
 function render() { stateIndex = 0; refIndex = 0; return exports.default() }
 function nodes(element) { if (!element || typeof element !== 'object') return []; return [element, ...[element.props?.children].flat(Infinity).flatMap(nodes)] }
 function form(tree) { return nodes(tree).find(node => node.type === 'form') }
 function place(tree) { return nodes(tree).find(node => node.type === 'button' && node.props.children === 'Place Order') }
 const flush = () => new Promise(resolve => setImmediate(resolve))
 async function review() { form(render()).props.onSubmit({}); await flush() }
 await review(); assert.equal(previewCalls, 0); assert.ok(errors.customerName)
 assert.equal(schema.safeParse({ ...values, orderType: 'delivery' }).success, false)
 assert.equal(schema.safeParse({ ...values, customerName: 'Misty', notes: 'x'.repeat(501) }).success, false)
 values = { ...values, customerName: 'Misty' }
 let resolvePreview
 previewAPI = () => new Promise(resolve => { resolvePreview = resolve })
 const opening = form(render()); opening.props.onSubmit({}); opening.props.onSubmit({})
 assert.equal(previewCalls, 1)
 resolvePreview(preview); await flush(); assert.ok(place(render()))
 form(render()).props.onChange(); assert.equal(place(render()), undefined)
 previewAPI = async () => preview
 await review(); values = { ...values, notes: 'Updated' }; assert.equal(place(render()), undefined)
 await review(); cart.items = [{ ...cart.items[0], quantity: 2 }]; assert.equal(place(render()), undefined)
 previewAPI = async () => { throw new Error('Review failed') }
 await review(); assert.equal(states[2], 'Review failed'); assert.equal(clearCalls, 0); assert.equal(values.notes, 'Updated')
 previewAPI = async () => preview
 await review(); orderAPI = async () => { throw new Error('Submit failed') }
 await place(render()).props.onClick(); assert.equal(states[2], 'Submit failed'); assert.equal(clearCalls, 0); assert.equal(place(render()), undefined)
 await review()
 let resolveOrder
 orderAPI = () => new Promise(resolve => { resolveOrder = resolve })
 const confirm = place(render()); const first = confirm.props.onClick(); await confirm.props.onClick()
 assert.equal(orderCalls, 2)
 resolveOrder({ _id: 'mock-order' }); await first
 assert.equal(clearCalls, 1); assert.equal(destination, '/order-confirmation/mock-order')
})
