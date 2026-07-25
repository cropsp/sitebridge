/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly ENABLE_AMAZON_AFFILIATE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
