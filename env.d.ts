/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** e.g. `http://localhost:4000`. Empty/unset = same origin through the Vite proxy. */
  readonly VITE_API_URL?: string
  /** e.g. `ws://localhost:4000/ws`. Unset = same origin through the Vite proxy. */
  readonly VITE_WS_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
