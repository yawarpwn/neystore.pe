/// <reference path="../.astro/types.d.ts" />
/// <reference path="../.astro/env.d.ts" />
/// <reference path="../.astro/db-types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
	readonly CLOUDINARY_API_SECRET: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
