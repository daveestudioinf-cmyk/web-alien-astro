import type { APIRoute } from 'astro';

export const prerender = true;

const isPreviewBuild = import.meta.env.MODE === 'preview';
const sitemapUrl = 'https://aliencreativo.com/sitemap.xml';

export const GET: APIRoute = () => {
  const content = isPreviewBuild
    ? 'User-agent: *\nAllow: /\n'
    : `User-agent: *\nAllow: /\n\nSitemap: ${sitemapUrl}\n`;

  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
