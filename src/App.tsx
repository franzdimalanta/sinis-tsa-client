import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PublicLayout from './layouts/PublicLayout'
import ManagementLayout from './layouts/ManagementLayout'
import NotFoundPage from './pages/NotFoundPage'
import LandingPage from './pages/public/LandingPage'
import MenuPage from './pages/public/MenuPage'
import MenuItemPage from './pages/public/MenuItemPage'
import CartPage from './pages/public/CartPage'
import CheckoutPage from './pages/public/CheckoutPage'
import OrderConfirmationPage from './pages/public/OrderConfirmationPage'
import DashboardPage from './pages/management/DashboardPage'
import MenuManagementPage from './pages/management/MenuManagementPage'
import AddMenuItemPage from './pages/management/AddMenuItemPage'
import EditMenuItemPage from './pages/management/EditMenuItemPage'
import OrderManagementPage from './pages/management/OrderManagementPage'
import InventoryPage from './pages/management/InventoryPage'
import RecipeManagementPage from './pages/management/RecipeManagementPage'
import SalesAnalyticsPage from './pages/management/SalesAnalyticsPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="menu" element={<MenuPage />} />
          <Route path="menu/:id" element={<MenuItemPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="order-confirmation/:id" element={<OrderConfirmationPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="/manage" element={<ManagementLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="menu" element={<MenuManagementPage />} />
          <Route path="menu/new" element={<AddMenuItemPage />} />
          <Route path="menu/:id/edit" element={<EditMenuItemPage />} />
          <Route path="orders" element={<OrderManagementPage />} />
          <Route path="inventory" element={<InventoryPage />} />
          <Route path="recipes" element={<RecipeManagementPage />} />
          <Route path="analytics" element={<SalesAnalyticsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
