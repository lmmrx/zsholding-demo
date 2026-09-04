import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type {
  HomeContent,
  LearningPortalContent,
  Property,
  SupportContent,
} from './types';

const CONTENT_DIR = path.join(process.cwd(), 'content');

function readFrontmatter<T>(filePath: string): T {
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data } = matter(raw);
  return data as T;
}

export function getHomeContent(): HomeContent {
  return readFrontmatter<HomeContent>(path.join(CONTENT_DIR, 'home.md'));
}

export function getLearningPortalContent(): LearningPortalContent {
  return readFrontmatter<LearningPortalContent>(
    path.join(CONTENT_DIR, 'learning-portal.md')
  );
}

export function getSupportContent(): SupportContent {
  return readFrontmatter<SupportContent>(
    path.join(CONTENT_DIR, 'support.md')
  );
}

/** Every property, sorted for the Locations grid. Add a new hotel by
 * dropping a new .md file in content/properties/ — no code changes needed. */
export function getAllProperties(): Property[] {
  const dir = path.join(CONTENT_DIR, 'properties');
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'));

  const properties = files.map((file) => {
    const slug = file.replace(/\.md$/, '');
    const data = readFrontmatter<Omit<Property, 'slug'>>(
      path.join(dir, file)
    );
    return { slug, ...data };
  });

  return properties.sort((a, b) => a.order - b.order);
}

export function getProperty(slug: string): Property | undefined {
  const filePath = path.join(CONTENT_DIR, 'properties', `${slug}.md`);
  if (!fs.existsSync(filePath)) return undefined;
  const data = readFrontmatter<Omit<Property, 'slug'>>(filePath);
  return { slug, ...data };
}

/** Only properties that have an amenities breakdown get their own hub +
 * amenity pages (matches the original site: only Red Deer North linked out). */
export function getPropertiesWithAmenities(): Property[] {
  return getAllProperties().filter(
    (p) => p.amenities && p.amenities.length > 0
  );
}
