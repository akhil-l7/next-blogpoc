import { config } from '@/app.config';
import client from '@/lib/prismic';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = `https://${config.url}`;
  
  const posts = await client.getAllByType('blog');
  
  const blogPosts = posts.map((post) => ({
    url: `${baseUrl}/${post.id}`,
    lastModified: post.last_publication_date ? new Date(post.last_publication_date) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];

  return [...staticPages, ...blogPosts];
}

