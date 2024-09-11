/// <reference types="vite/client" />
/// <reference types="vite/types/importMeta.d.ts" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
  readonly VITE_AUTHORIZATION: string
  // Añade aquí otras variables de entorno que estés utilizando
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
