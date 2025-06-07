# Projet Astro + Sanity Studio

## Structure du projet
```
/
├─ astro.config.mjs
├─ vite.config.ts
├─ package.json        # scripts Astro + sync-sanity
├─ .env                # variables PUBLIC_ pour Astro
├─ src/                # code Astro
└─ studio-sanity/
   ├─ vite.config.ts   # envPrefix pour Studio
   ├─ sanity.config.ts # config Sanity Studio
   ├─ package.json     # scripts Studio
   └─ .env             # variables VITE_ pour Studio
```

## Variables d’environnement

### Astro (/.env)
```env
PUBLIC_SANITY_PROJECT_ID=VOTRE_PROJECT_ID
PUBLIC_SANITY_DATASET=production
```

### Sanity Studio (/studio-sanity/.env)
```env
VITE_SANITY_PROJECT_ID=VOTRE_PROJECT_ID
VITE_SANITY_DATASET=production
```

## Scripts NPM

### Racine – package.json
```json
{
  "scripts": {
    "dev": "npm run sync-sanity && astro dev",
    "sync-sanity": "node ./scripts/fetch-sanity.js",
    "build": "astro build",
    "preview": "astro preview"
  }
}
```

### Studio – studio-sanity/package.json
```json
{
  "scripts": {
    "dev": "sanity start",
    "build": "sanity build"
  }
}
```

## Fetch Script

```js
// scripts/fetch-sanity.js
import dotenv from 'dotenv'
dotenv.config()

import sanityClient from '@sanity/client'

const client = sanityClient({
  projectId: process.env.PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.PUBLIC_SANITY_DATASET!,
  useCdn: true,
})

async function main() {
  // ...
}

main().catch(console.error)
```

## Build & Déploiement

### Production build (Astro)
```bash
npm run build
```
Ce script génère le dossier `dist/` contenant votre site statique.

Pour prévisualiser localement :
```bash
npm run preview
```
Le site tourne alors sur `http://localhost:4173`.

### Build Sanity Studio
```bash
cd studio-sanity
npm run build   # génère le dossier dist/ du Studio
npx serve ./dist
```
Par défaut, le Studio statique est servi sur `http://localhost:3333`.

## Liens Web (exemples)
- https://votre-site-demo.com
- https://votre-studio-demo.com
