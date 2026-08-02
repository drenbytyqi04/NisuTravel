import type { MetadataRoute } from 'next';
import { destinations } from '@/data/destinations';
import { site } from '@/data/site';

/** Gjenerohet automatikisht — destinacionet e reja shtohen vetvetiu. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: MetadataRoute.Sitemap = [
    { url: site.url, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    {
      url: `${site.url}/destinacionet`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${site.url}/rreth-nesh`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${site.url}/kontakti`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  const destinationPages: MetadataRoute.Sitemap = destinations.map((destination) => ({
    url: `${site.url}/destinacionet/${destination.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...pages, ...destinationPages];
}
