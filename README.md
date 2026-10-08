# BrewLogic Frontend

React + Vite + TypeScript customer ordering and management interface, styled with Tailwind CSS. Routing uses React Router; forms use React Hook Form and Zod; API calls use one configured Axios instance.

See the [project README](../README.md) for complete setup, environment configuration, backend requirements, routes, API overview, protected demo seeding, and the demonstration workflow.

From this directory:

```sh
npm ci
npm run dev -- --port 5173 --strictPort
npm run build
npm run lint
```

The client uses `VITE_API_URL` from an optional `.env`, with `http://localhost:5000/api` as its development fallback. See [.env.example](.env.example). The backend must be running for API-driven pages, and its current CORS configuration permits `http://localhost:5173`.

Cart display state persists locally under `brewlogic-cart`. Checkout prices, discounts, inventory checks, and final totals are calculated by the backend.
