import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { locations } from '../src/data/locations.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_URL = 'https://scaffoldersnearyou.co.uk';
const PUBLIC_DIR = path.resolve(__dirname, '../public');
const LAST_MOD = '2026-02-08';

const CITIES = [
  'Manchester', 'Bolton', 'Salford', 'Birmingham', 'London', 'Glasgow', 'Leeds', 
  'Liverpool', 'Coventry', 'Wolverhampton', 'Bristol', 'Edinburgh', 'Cardiff', 
  'Belfast', 'Newcastle', 'Sheffield', 'Nottingham', 'Leicester', 'Durham', 'York'
];

const TOWNS = [
  'Stockport', 'Oldham', 'Rochdale', 'Tameside', 'Bury', 'Wigan', 'Warrington', 
  'Chester', 'Crewe', 'Stoke', 'Derby', 'Leicestershire', 'Northampton', 
  'Peterborough', 'Cambridge', 'Stoke-on-Trent'
];

const generateXml = (urls) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;
};

const createUrlEntry = (loc, priority, changefreq) => {
  return `  <url>
    <loc>${SITE_URL}/locations/${loc}</loc>
    <lastmod>${LAST_MOD}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
};

export const generateLocationSitemaps = () => {
  console.log('------------------------------------------------');
  console.log('Starting Individual Location Sitemap Generation');
  console.log('------------------------------------------------');

  const generatedSitemaps = [];

  // 1. Generate City Sitemaps
  CITIES.forEach(cityName => {
    // Fuzzy match because data might differ slightly (e.g. Newcastle upon Tyne vs Newcastle)
    // or checks slugs
    const city = locations.find(l => 
      l.name.toLowerCase() === cityName.toLowerCase() && !l.parentSlug
    );

    if (!city) {
      console.warn(`⚠️  City not found in data: ${cityName}`);
      return;
    }

    const subLocations = locations.filter(l => l.parentSlug === city.slug);
    
    const urls = [];
    // Add City Page
    urls.push(createUrlEntry(city.slug, '0.8', 'weekly'));
    
    // Add Sub-locations
    subLocations.forEach(sub => {
      urls.push(createUrlEntry(sub.slug, '0.6', 'weekly'));
    });

    const filename = `sitemap-city-${city.slug}.xml`;
    const filePath = path.join(PUBLIC_DIR, filename);
    
    fs.writeFileSync(filePath, generateXml(urls));
    generatedSitemaps.push(filename);
    console.log(`✅ Created ${filename} (${urls.length} URLs)`);
  });

  // 2. Generate Town Sitemaps
  TOWNS.forEach(townName => {
    // Handle special cases like Stoke vs Stoke-on-Trent if needed
    const town = locations.find(l => 
      (l.name.toLowerCase() === townName.toLowerCase() || 
       (townName === 'Stoke' && l.name === 'Stoke-on-Trent')) 
      && !l.parentSlug
    );

    if (!town) {
      // Don't warn for known missing ones like Leicestershire (county) if strict data isn't there
      // But we log to see coverage
      // console.warn(`ℹ️  Town not found or is county: ${townName}`);
      return;
    }

    const subLocations = locations.filter(l => l.parentSlug === town.slug);
    
    const urls = [];
    urls.push(createUrlEntry(town.slug, '0.7', 'weekly'));
    
    subLocations.forEach(sub => {
      urls.push(createUrlEntry(sub.slug, '0.6', 'weekly'));
    });

    const filename = `sitemap-town-${town.slug}.xml`;
    const filePath = path.join(PUBLIC_DIR, filename);
    
    fs.writeFileSync(filePath, generateXml(urls));
    generatedSitemaps.push(filename);
    console.log(`✅ Created ${filename} (${urls.length} URLs)`);
  });

  // 3. Generate Master Index
  let indexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SITE_URL}/sitemap-main.xml</loc>
    <lastmod>${LAST_MOD}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE_URL}/sitemap-blog.xml</loc>
    <lastmod>${LAST_MOD}</lastmod>
  </sitemap>`;

  generatedSitemaps.forEach(filename => {
    indexXml += `
  <sitemap>
    <loc>${SITE_URL}/${filename}</loc>
    <lastmod>${LAST_MOD}</lastmod>
  </sitemap>`;
  });

  indexXml += `
</sitemapindex>`;

  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap_index.xml'), indexXml);
  console.log(`✅ Created sitemap_index.xml with ${generatedSitemaps.length + 2} references`);
};

// Allow running directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateLocationSitemaps();
}