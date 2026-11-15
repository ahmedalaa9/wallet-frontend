/**
 * Backend endpoints. By default the app talks to its own origin and the Vite
 * dev server proxies `/api` and `/ws` to the backend (see vite.config.ts), so
 * there is no CORS to think about. Set VITE_API_URL / VITE_WS_URL in `.env.local`
 * to call the backend directly instead.
 */
const wsOrigin = `${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${window.location.host}`

export const API_URL: string = import.meta.env.VITE_API_URL ?? ''
export const WS_URL: string = import.meta.env.VITE_WS_URL ?? `${wsOrigin}/ws`
