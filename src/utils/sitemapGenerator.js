import { locations } from '@/data/locations';
import { blogPosts } from '@/data/blogPosts';
import { SITE_URL } from '@/lib/seoHelpers';

// Helper to format date to ISO 8601 (YYYY-MM-DD)
export const formatDate = (date) => {
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
};

// Calculate priority based on page type
export const getPriority = (type) => {
  switch (type) {
    case 'home': return '1.0';
    case 'main': return '0.8';
    case 'location': return '0.9';
    case 'sub-location': return '0.7';
    case 'blog': return '0.6';
    default: return '0.5';
  }
};

// Determine change frequency
export const getChangeFreq = (type) => {
  switch (type) {
    case 'home': return 'daily';
    case 'location': return 'weekly';
    case 'blog': return 'monthly';
    default: return 'monthly';
  }
};

// Build location URL
export const buildLocationUrl = (slug) => {
  return `${SITE_URL}/locations/${slug}`;
};

// Generate standard XML Sitemap
export const generateSitemapXml = (urls) => {
  const xmlBody = urls.map(url => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlBody}
</urlset>`;
};

// Generate Sitemap Index XML
export const generateSitemapIndex = (sitemaps) => {
  const xmlBody = sitemaps.map(sitemap => `
  <sitemap>
    <loc>${sitemap}</loc>
    <lastmod>${formatDate(new Date())}</lastmod>
  </sitemap>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlBody}
</sitemapindex>`;
};

// Data aggregators
export const getSitemapData = () => {
  const today = formatDate(new Date());

  // Main Pages
  const mainPages = [
    { loc: `${SITE_URL}/`, lastmod: today, changefreq: getChangeFreq('home'), priority: getPriority('home') },
    { loc: `${SITE_URL}/services`, lastmod: today, changefreq: getChangeFreq('main'), priority: getPriority('main') },
    { loc: `${SITE_URL}/locations`, lastmod: today, changefreq: getChangeFreq('main'), priority: getPriority('main') },
    { loc: `${SITE_URL}/blog`, lastmod: today, changefreq: getChangeFreq('main'), priority: getPriority('main') },
    { loc: `${SITE_URL}/contact`, lastmod: today, changefreq: getChangeFreq('main'), priority: getPriority('main') },
    { loc: `${SITE_URL}/faq`, lastmod: today, changefreq: getChangeFreq('main'), priority: getPriority('main') },
  ];

  // Location Pages (Top Level)
  const locationPages = locations
    .filter(loc => !loc.parentSlug)
    .map(loc => ({
      loc: buildLocationUrl(loc.slug),
      lastmod: today,
      changefreq: getChangeFreq('location'),
      priority: getPriority('location')
    }));

  // Sub-Location Pages
  const subLocationPages = locations
    .filter(loc => loc.parentSlug)
    .map(loc => ({
      loc: buildLocationUrl(loc.slug),
      lastmod: today,
      changefreq: getChangeFreq('sub-location'),
      priority: getPriority('sub-location')
    }));

  // Blog Posts
  const blogPostPages = blogPosts.map(post => ({
    loc: `${SITE_URL}/blog/${post.slug}`,
    lastmod: formatDate(post.publishDate || new Date()),
    changefreq: getChangeFreq('blog'),
    priority: getPriority('blog')
  }));

  return {
    main: mainPages,
    locations: locationPages,
    subLocations: subLocationPages,
    blog: blogPostPages
  };
};