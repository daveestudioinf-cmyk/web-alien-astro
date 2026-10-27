import type { APIRoute } from 'astro';

export const prerender = true;

const isPreviewBuild = import.meta.env.MODE === 'preview';
const productionUrl = 'https://aliencreativo.com/';

export const GET: APIRoute = () => {
  const urls = isPreviewBuild ? [] : [productionUrl];
  const entries = urls.map((url) => `  <url><loc>${url}</loc></url>`).join('\n');
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    entries,
    '</urlset>',
  ].filter(Boolean).join('\n');

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
