# SINIS TSA Frontend

SINIS TSA is a coffee shop ordering and management interface developed as part of an Advanced Web Programming final project.

This repository contains the **frontend application** for SINIS TSA. The backend is maintained separately in the `sinis-tsa-server` repository.

## Features

### Customer Experience

- Coffee-shop landing page
- Menu browsing with category filters
- Signature drink showcase
- Product details and size selection
- Live ingredient-based availability
- Persistent shopping cart
- Quantity controls and confirmed cart clearing
- Validated checkout form
- Server-calculated order preview
- Order placement and confirmation
- About Us page
- Responsive navigation
- Automatic scroll-to-top when navigating between pages

### Management Interface

- Management dashboard
- Menu-item management
- Order workflow management
- Inventory and ingredient management
- Recipe management
- Sales analytics and reporting

## Tech Stack

- React
- Vite
- TypeScript
- Tailwind CSS
- React Router
- React Hook Form
- Zod
- `@hookform/resolvers`
- Axios

## Requirements

- Node.js 24 or newer is recommended
- npm
- Running SINIS TSA backend

## Installation

Clone the repository:

```sh
git clone https://github.com/franzdimalanta/sinis-tsa-client.git
cd sinis-tsa-client
```

Install dependencies:

```sh
npm ci
```

## Environment

The frontend can use `VITE_API_URL` from an optional `.env` file.

Copy:

```text
.env.example
```

to:

```text
.env
```

Example:

```dotenv
VITE_API_URL=http://localhost:5000/api
```

If `VITE_API_URL` is not provided, the application uses:

```text
http://localhost:5000/api
```

The backend must be running for API-driven pages such as the menu, checkout, management tools, and analytics.

Vite environment values are exposed to the browser and should not contain secrets.

## Running the Development Server

Start the frontend with:

```sh
npm run dev -- --port 5173 --strictPort
```

Open:

```text
http://localhost:5173
```

Port `5173` is used intentionally because the local backend CORS configuration permits that frontend origin.

## Build and Verification

Create a production build:

```sh
npm run build
```

Run linting:

```sh
npm run lint
```

## Main Routes

### Customer

| Route | Purpose |
| --- | --- |
| `/` | Landing page |
| `/menu` | Menu browsing and category filters |
| `/menu/:id` | Product details |
| `/cart` | Shopping cart |
| `/checkout` | Checkout and order preview |
| `/order-confirmation/:id` | Saved order confirmation |
| `/about` | About Us and developer profiles |

### Management

| Route | Purpose |
| --- | --- |
| `/manage` | Dashboard |
| `/manage/menu` | Menu management |
| `/manage/menu/new` | Add menu item |
| `/manage/menu/:id/edit` | Edit menu item |
| `/manage/orders` | Order workflow |
| `/manage/inventory` | Inventory management |
| `/manage/recipes` | Recipe management |
| `/manage/analytics` | Sales analytics |

Unknown routes display the application's Not Found page.

## Backend Integration

All API requests use the shared Axios client.

The backend is responsible for authoritative operations including:

- prices and totals
- discount calculations
- stock validation
- menu availability
- order creation
- order status transitions
- inventory processing
- analytics

The backend repository is available at:

https://github.com/franzdimalanta/sinis-tsa-server

## Cart Persistence

Cart display state is stored locally in the browser under:

```text
brewlogic-cart
```

This is a legacy internal storage key retained for backward compatibility.

Prices stored in the cart are display snapshots only. Final prices, discounts, inventory checks, and totals are calculated by the backend.

## Notes

- The backend should normally run at `http://localhost:5000`.
- The frontend should run at `http://localhost:5173`.
- The frontend requires the backend for live database-driven features.
- Authentication, payment integration, and deployment are outside the current project scope.
- The production build may report Vite's large-chunk warning. This warning does not indicate a build or lint failure.

## Related Repository

SINIS TSA Backend:

https://github.com/franzdimalanta/sinis-tsa-server
