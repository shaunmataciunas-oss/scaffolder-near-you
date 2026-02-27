import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getAllRegions } from '../src/data/locations.js';
import { generateLocationSitemaps } from './generate-all-sitemaps.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_URL = 'https://scaffoldersnearyou.co.uk';
// Changed to sitemap-main.xml as this file now only handles main structure, not all locations
const OUTPUT_FILE = path.resolve(__dirname, '../public/sitemap-main.xml');
const LAST_MOD = '2026-02-08';

// Define main static routes to include
const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/locations', priority: '0.8', changefreq: 'daily' },
  { path: '/shop', priority: '0.9', changefreq: 'daily' },
  { path: '/services', priority: '0.7', changefreq: 'monthly' },
  { path: '/blog', priority: '0.7', changefreq: 'weekly' },
  { path: '/faq', priority: '0.6', changefreq: 'monthly' },
  { path: '/contact', priority: '0.6', changefreq: 'monthly' },
  { path: '/html-sitemap', priority: '0.5', changefreq: 'weekly' }
];

// Shop Categories
const productCategories = [
  'tubes',
  'boards',
  'fittings',
  'systems',
  'towers',
  'ladders',
  'accessories',
  'safety'
];

const generateMainSitemap = () => {
  console.log('------------------------------------------------');
  console.log('Starting Main Sitemap Generation');
  console.log('------------------------------------------------');

  // 2. Begin XML Construction
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  let urlCount = 0;

  // 3. Add Static Routes
  console.log(`Adding ${staticRoutes.length} static pages...`);
  staticRoutes.forEach(route => {
    xml += '  <url>\n';
    xml += `    <loc>${SITE_URL}${route.path}</loc>\n`;
    xml += `    <lastmod>${LAST_MOD}</lastmod>\n`;
    xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
    xml += `    <priority>${route.priority}</priority>\n`;
    xml += '  </url>\n';
    urlCount++;
  });

  // 4. Add Shop Categories
  console.log(`Adding ${productCategories.length} category pages...`);
  productCategories.forEach(cat => {
    xml += '  <url>\n';
    xml += `    <loc>${SITE_URL}/category/${cat}</loc>\n`;
    xml += `    <lastmod>${LAST_MOD}</lastmod>\n`;
    xml += '    <changefreq>daily</changefreq>\n';
    xml += '    <priority>0.8</priority>\n';
    xml += '  </url>\n';
    urlCount++;
  });

  // 5. Add Regional Hub Pages
  const regions = getAllRegions();
  console.log(`Adding ${regions.length} regional hub pages...`);
  regions.forEach(region => {
    // Slugify region name (e.g., "South West" -> "south-west")
    const slug = region.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    xml += '  <url>\n';
    xml += `    <loc>${SITE_URL}/region/${slug}</loc>\n`;
    xml += `    <lastmod>${LAST_MOD}</lastmod>\n`;
    xml += '    <changefreq>weekly</changefreq>\n';
    xml += '    <priority>0.9</priority>\n';
    xml += '  </url>\n';
    urlCount++;
  });

  xml += '</urlset>';

  // 7. Write to File
  try {
    fs.writeFileSync(OUTPUT_FILE, xml);
    console.log(`✅ Main sitemap successfully written to: ${OUTPUT_FILE}`);
  } catch (err) {
    console.error('❌ Error writing sitemap file:', err);
    process.exit(1);
  }

  // 8. Trigger Individual Location Sitemaps
  try {
    generateLocationSitemaps();
  } catch (err) {
    console.error('❌ Error generating location sitemaps:', err);
    process.exit(1);
  }

  console.log('------------------------------------------------');
  console.log('COMPLETE SITEMAP GENERATION FINISHED');
  console.log('------------------------------------------------');
};

try {
  generateMainSitemap();
} catch (error) {
  console.error('Fatal error generating sitemap:', error);
  process.exit(1);
}