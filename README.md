# Digital Wallet — Front-End

Vue 3 + TypeScript + Vite + Tailwind CSS v4, with Pinia, Vue Router, Vitest, ESLint (+ Oxlint) and
Prettier.

## Run

Start the backend first (in `../wallet-backend`):

```sh
npm run dev
```

Then here:

```sh
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

The app calls `/api/*` and `/ws` on its own origin and the Vite dev server proxies them to the
backend at `http://localhost:4000` (see `vite.config.ts`). If the backend runs elsewhere, set
`BACKEND_URL` before starting Vite — PowerShell: `$env:BACKEND_URL='http://localhost:4100'; npm run dev`,
bash: `BACKEND_URL=http://localhost:4100 npm run dev` — or set `VITE_API_URL` / `VITE_WS_URL` in
`.env.local` to call it directly (see `.env.example`). Endpoint constants live in `src/config.ts`.

Backend API contract: `../wallet-backend/docs/API.md`.

## Scripts

| Script                 | What it does                           |
| ---------------------- | -------------------------------------- |
| `npm run dev`          | Dev server with hot reload             |
| `npm run build`        | Type-check and build for production    |
| `npm run preview`      | Serve the production build             |
| `npm test`             | Run unit tests once                    |
| `npm run test:unit`    | Run unit tests in watch mode           |
| `npm run type-check`   | `vue-tsc` type check                   |
| `npm run lint`         | Oxlint + ESLint (with `--fix`)         |
| `npm run format`       | Prettier (also sorts Tailwind classes) |
| `npm run format:check` | Prettier check without writing         |

## Structure

```
src/
  main.ts            app bootstrap (Pinia, router, Tailwind CSS)
  App.vue            layout + navigation
  config.ts          backend endpoints (API_URL, WS_URL)
  router/index.ts    routes: / (live feed), /send (send money)
  views/             FeedView.vue, SendMoneyView.vue (placeholders)
  assets/main.css    Tailwind entry
  __tests__/         unit tests
```

## Recommended IDE setup

[VS Code](https://code.visualstudio.com/) +
[Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar).
