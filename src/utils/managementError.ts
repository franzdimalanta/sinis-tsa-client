import axios from 'axios'
export function getManagementError(error: unknown, resource: 'menu' | 'order' = 'menu') {
 if (axios.isAxiosError<{ message?: unknown }>(error)) {
  if (error.response?.status === 404) return resource === 'order' ? 'This order could not be found.' : 'This menu item could not be found.'
  if (error.response?.status === 400) {
   const message = error.response.data.message
   if (resource === 'order') {
    const safeOrderMessages = ['Invalid order ID', 'Invalid order status', 'Invalid order status filter',
     'Order status has changed; refresh and try again',
     'Cannot cancel order because original stock deduction transactions are missing',
     'Cannot cancel order because an original stock deduction quantity is invalid']
    if (typeof message === 'string' && (safeOrderMessages.includes(message) ||
     /^Cannot change order status from (pending|preparing|ready|completed|cancelled) to (pending|preparing|ready|completed|cancelled)$/.test(message))) return message
    if (typeof message === 'string' && message.startsWith('Cannot cancel order because ingredient ')) return 'Cannot cancel this order because an ingredient no longer exists. Review its stock history.'
    return 'The order could not be updated. Refresh the list and check its current status.'
   }
   const safe = ['Cannot delete menu item because it is used by recipes', 'Cannot remove a menu item size that is used by a recipe', 'A record with this name already exists', 'Referenced category does not exist', 'A valid category ObjectId is required', 'Invalid menu item ID']
   if (typeof message === 'string' && safe.includes(message)) return message
   return 'Please check the menu item fields and selected category, then try again.'
  }
 }
 return 'We could not complete this request. Please check the connection and try again.'
}
