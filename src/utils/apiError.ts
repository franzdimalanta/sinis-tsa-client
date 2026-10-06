import axios from 'axios'
export function getMenuError(error: unknown) {
 if (axios.isAxiosError(error)) {
  if (error.response?.status === 404) return 'This menu item could not be found.'
  if (error.response?.status === 400) return 'This menu item link is invalid.'
 }
 return 'We could not load the menu right now. Please try again.'
}
