import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { mkdirpSync } from 'mkdirp';
import { createClient } from '@sanity/client';
import { formatISO } from 'date-fns';
import toMarkdown from '@sanity/block-content-to-markdown';
import dotenv from 'dotenv';
dotenv.config();

// Configuration du client Sanity
const client = createClient({
  projectId: process.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2023-01-01',
});

// Requête GROQ
const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]
| order(publishDate desc)[0...12] {
  _id,
  title,
  category,
  body,                // Portable Text (tableau d'objets)
  description,         // texte simple
  readingTime,
  "slug": slug.current,
  "publishedAt": publishDate,
  "image": image.asset->url,
  "authorName": author.name,
  "authorAvatarUrl": author.avatar.asset->url
}`;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = path.join(__dirname, '../src/content/blog');

function toFrontmatter(obj) {
  const lines = ['---'];
  for (const [key, value] of Object.entries(obj)) {
    if (value === undefined || value === null) continue;

    if (value instanceof Date) {
      lines.push(`${key}: "${formatISO(value)}"`);
    } else if (typeof value === 'object' && !Array.isArray(value)) {
      lines.push(`${key}:`);
      for (const [subKey, subValue] of Object.entries(value)) {
        if (subValue === undefined || subValue === null) continue;
        lines.push(`  ${subKey}: "${subValue}"`);
      }
    } else if (typeof value === 'string') {
      const escaped = value.replace(/"/g, '\\"');
      lines.push(`${key}: "${escaped}"`);
    } else {
      lines.push(`${key}: ${value}`);
    }
  }
  lines.push('---\n');
  return lines.join('\n');
}


async function main() {
  const posts = await client.fetch(POSTS_QUERY);
  mkdirpSync(CONTENT_DIR);

  for (const post of posts) {
    const slug = post.slug;

    const fmData = {
      title: post.title,
      category: post.category,
      readingTime: post.readingTime,
      description: post.description,
      publishDate: new Date(post.publishedAt),
      updatedDate: undefined,
      imageUrl: post.image,
      author: {
        name: post.authorName,
        avatar: post.authorAvatarUrl,
      },
      headings: undefined,
    };

    const frontmatter = toFrontmatter(fmData);
    let bodyContent = '';
    if (Array.isArray(post.body) && post.body.length > 0) {
      bodyContent = toMarkdown(post.body, {
        serializers: {
          types: {
            code: (props) =>
              '```' + props.node.language + '\n' + props.node.code + '\n```',
          }
        },
        imageOptions: { w: 800, fit: 'max' },
        projectId: process.env.PUBLIC_SANITY_PROJECT_ID,
        dataset: process.env.PUBLIC_SANITY_DATASET,
      }) + '\n';
    } else {
      bodyContent = '<!-- Aucun contenu “body” pour ce post -->\n';
    }

    const filePath = path.join(CONTENT_DIR, `${slug}.md`);
    fs.writeFileSync(filePath, frontmatter + bodyContent, 'utf-8');
    console.log(`→ Généré : ${slug}.md`);
  }

  console.log('✅ Tous les posts Sanity ont été exportés vers src/content/blog.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
