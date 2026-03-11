import type { MetadataRoute } from 'next'
import { config } from "@/app.config";

export default function robots(): MetadataRoute.Robots {
    const baseUrl = `https://${config.url}`;
    
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/'],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}
