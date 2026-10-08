import axios from 'axios'
export function getManagementError(error: unknown) {
 if (axios.isAxiosError<{ message?: unknown }>(error)) {
  if (error.response?.status === 404) return 'This menu item could not be found.'
  if (error.response?.status === 400) {
   const message = error.response.data.message
   const safe = ['Cannot delete menu item because it is used by recipes', 'Cannot remove a menu item size that is used by a recipe', 'A record with this name already exists', 'Referenced category does not exist', 'A valid category ObjectId is required', 'Invalid menu item ID']
   if (typeof message === 'string' && safe.includes(message)) return message
   return 'Please check the menu item fields and selected category, then try again.'
  }
 }
 return 'We could not complete this request. Please check the connection and try again.'
}
