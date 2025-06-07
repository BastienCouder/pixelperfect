// studio-sanity/sanity.config.ts
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool }    from '@sanity/vision'
import { schemaTypes }   from './schemaTypes'

export default defineConfig({
  name:  'default',
  title: 'Sanity Studio',

  projectId: import.meta.env.VITE_SANITY_PROJECT_ID! || 'djtvr81h',
  dataset:   import.meta.env.VITE_SANITY_DATASET! || 'production',

  plugins: [structureTool(), visionTool()],
  schema:   { types: schemaTypes },
})
