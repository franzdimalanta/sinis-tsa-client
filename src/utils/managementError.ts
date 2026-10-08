import axios from 'axios'
export function getManagementError(error: unknown, resource: 'menu' | 'order' | 'ingredient' | 'recipe' = 'menu') {
 if (axios.isAxiosError<{ message?: unknown }>(error)) {
  if (error.response?.status === 404) return resource === 'menu' ? 'This menu item could not be found.' : `This ${resource} could not be found.`
  if (error.response?.status === 400) {
   const message = error.response.data.message
   if (resource === 'ingredient' || resource === 'recipe') {
    const safeInventoryMessages = ['Ingredient not found', 'Recipe not found', 'Invalid ingredient ID', 'Invalid recipe ID',
     'Cannot add stock to an inactive ingredient', 'Stock quantity must be changed through inventory operations',
     'Cannot delete ingredient because it is used by recipes', 'Referenced ingredient does not exist',
     'Referenced menu item does not exist', 'Recipe size must exist in the menu item sizes',
     'A recipe already exists for this menu item and size', 'A record with this name already exists',
     'Quantity must be a finite number greater than 0', 'Reason must be a non-empty string',
     'Reason must not exceed 300 characters', 'Each recipe ingredient must have a valid ObjectId',
     'A valid menu item ObjectId is required', 'A valid ingredient ObjectId is required',
     'A recipe must have at least one ingredient, with no duplicate ingredients.',
     'Ingredient quantity must be greater than 0.', 'Invalid inventory transaction type', 'Invalid ingredient ObjectId filter']
    if (typeof message === 'string' && safeInventoryMessages.includes(message)) return message
    return 'Please check the selected records and form values, then try again.'
   }
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
