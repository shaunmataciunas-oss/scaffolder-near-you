import React from 'react';
import { locations, getAllRegions } from '@/data/locations';

const SitemapPage = () => {
  const SITE_URL = 'https://scaffoldersnearyou.co.uk';
  const LAST_MOD = '2026-02-07';
  
  const staticRoutes = [
    { path: '/', priority: '1.0', changefreq: 'weekly' },
    { path: '/locations', priority: '0.9', changefreq: 'daily' },
    { path: '/shop', priority: '0.9', changefreq: 'daily' },
    { path: '/services', priority: '0.7', changefreq: 'monthly' },
    { path: '/blog', priority: '0.7', changefreq: 'weekly' },
    { path: '/faq', priority: '0.6', changefreq: 'monthly' },
    { path: '/contact', priority: '0.6', changefreq: 'monthly' },
    { path: '/html-sitemap', priority: '0.5', changefreq: 'weekly' }
  ];

  const productCategories = [
    'tubes', 'boards', 'fittings', 'systems', 'towers', 'ladders', 'accessories', 'safety'
  ];

  const regions = getAllRegions();

  // Generate XML string
  const generateXML = () => {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // Static Routes
    staticRoutes.forEach(route => {
      xml += '  <url>\n';
      xml += `    <loc>${SITE_URL}${route.path}</loc>\n`;
      xml += `    <lastmod>${LAST_MOD}</lastmod>\n`;
      xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
      xml += `    <priority>${route.priority}</priority>\n`;
      xml += '  </url>\n';
    });

    // Shop Categories
    productCategories.forEach(cat => {
      xml += '  <url>\n';
      xml += `    <loc>${SITE_URL}/category/${cat}</loc>\n`;
      xml += `    <lastmod>${LAST_MOD}</lastmod>\n`;
      xml += '    <changefreq>daily</changefreq>\n';
      xml += '    <priority>0.8</priority>\n';
      xml += '  </url>\n';
    });

    // Regional Hubs
    regions.forEach(region => {
      const slug = region.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      xml += '  <url>\n';
      xml += `    <loc>${SITE_URL}/region/${slug}</loc>\n`;
      xml += `    <lastmod>${LAST_MOD}</lastmod>\n`;
      xml += '    <changefreq>weekly</changefreq>\n';
      xml += '    <priority>0.9</priority>\n';
      xml += '  </url>\n';
    });

    // Locations (Parent and Child)
    locations.forEach(location => {
      const isParent = !location.parentSlug;
      // Parents higher priority
      const priority = isParent ? '0.8' : '0.7'; 
      const changeFreq = isParent ? 'weekly' : 'monthly';

      xml += '  <url>\n';
      xml += `    <loc>${SITE_URL}/locations/${location.slug}</loc>\n`;
      xml += `    <lastmod>${LAST_MOD}</lastmod>\n`;
      xml += `    <changefreq>${changeFreq}</changefreq>\n`;
      xml += `    <priority>${priority}</priority>\n`;
      xml += '  </url>\n';
    });

    xml += '</urlset>';
    return xml;
  };

  const xmlContent = generateXML();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Sitemap XML Debug View</h1>
      <div className="mb-4 text-sm text-gray-500 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
        <p className="font-bold mb-2">Debug Info:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Static Pages: {staticRoutes.length}</li>
          <li>Categories: {productCategories.length}</li>
          <li>Regions: {regions.length}</li>
          <li>Locations: {locations.length}</li>
          <li><strong>Total URLs: {staticRoutes.length + productCategories.length + regions.length + locations.length}</strong></li>
        </ul>
      </div>
      <div className="bg-gray-100 dark:bg-zinc-900 p-4 rounded-lg overflow-auto border border-gray-200 dark:border-gray-800 h-[600px]">
        <pre className="text-xs font-mono whitespace-pre-wrap break-all text-gray-800 dark:text-gray-300">
          {xmlContent}
        </pre>
      </div>
    </div>
  );
};

export default SitemapPage;