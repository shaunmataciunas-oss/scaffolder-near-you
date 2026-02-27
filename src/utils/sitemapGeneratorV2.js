import { locations } from '@/data/locations';
import { blogPosts } from '@/data/blogPosts';
import { SITE_URL } from '@/lib/seoHelpers';
import { categorizeCitiesAndTowns, getSitemapSlug, getSubLocationUrls } from '@/lib/sitemapHelpers';

const formatDate = (date) => {
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
};

const generateXml = (urls) => {
  const xmlBody = urls.map(url => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${formatDate(new Date())}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlBody}
</urlset>`;
};

export const generateMainSitemap = () => {
  const mainUrls = [
    { loc: `${SITE_URL}/`, changefreq: 'daily', priority: '1.0' },
    { loc: `${SITE_URL}/services`, changefreq: 'weekly', priority: '0.9' },
    { loc: `${SITE_URL}/locations`, changefreq: 'weekly', priority: '0.9' },
    { loc: `${SITE_URL}/contact`, changefreq: 'monthly', priority: '0.8' },
    { loc: `${SITE_URL}/blog`, changefreq: 'daily', priority: '0.8' },
    { loc: `${SITE_URL}/faq`, changefreq: 'monthly', priority: '0.5' },
    ...blogPosts.map(post => ({
      loc: `${SITE_URL}/blog/${post.slug}`,
      changefreq: 'monthly',
      priority: '0.6'
    }))
  ];

  return {
    filename: 'sitemap-main.xml',
    content: generateXml(mainUrls),
    urlCount: mainUrls.length,
    lastmod: formatDate(new Date())
  };
};

export const generateLocationSitemaps = () => {
  const { cities, towns } = categorizeCitiesAndTowns();
  const sitemaps = [];

  // Generate City Sitemaps
  cities.forEach(city => {
    const urls = [
      { loc: `${SITE_URL}/locations/${city.slug}`, changefreq: 'weekly', priority: '0.8' },
      ...getSubLocationUrls(city.slug)
    ];
    
    sitemaps.push({
      filename: getSitemapSlug(city, 'city'),
      content: generateXml(urls),
      urlCount: urls.length,
      type: 'city',
      name: city.name,
      lastmod: formatDate(new Date())
    });
  });

  // Generate Town Sitemaps
  towns.forEach(town => {
    const urls = [
      { loc: `${SITE_URL}/locations/${town.slug}`, changefreq: 'weekly', priority: '0.7' },
      ...getSubLocationUrls(town.slug)
    ];

    sitemaps.push({
      filename: getSitemapSlug(town, 'town'),
      content: generateXml(urls),
      urlCount: urls.length,
      type: 'town',
      name: town.name,
      lastmod: formatDate(new Date())
    });
  });

  return sitemaps;
};

export const generateSitemapIndex = (allSitemaps) => {
  const xmlBody = allSitemaps.map(map => `
  <sitemap>
    <loc>${SITE_URL}/${map.filename}</loc>
    <lastmod>${map.lastmod}</lastmod>
  </sitemap>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlBody}
</sitemapindex>`;
};

export const generateAllLocationSitemaps = () => {
  const mainMap = generateMainSitemap();
  const locationMaps = generateLocationSitemaps();
  
  const allMaps = [mainMap, ...locationMaps];
  const indexContent = generateSitemapIndex(allMaps);

  return {
    index: {
      filename: 'sitemap_index.xml',
      content: indexContent,
      urlCount: allMaps.length, // Count of sitemaps in index
      lastmod: formatDate(new Date())
    },
    maps: allMaps
  };
};

export const getAllSitemapMetadata = () => {
  const { maps, index } = generateAllLocationSitemaps();
  
  const cities = maps.filter(m => m.type === 'city');
  const towns = maps.filter(m => m.type === 'town');
  const main = maps.filter(m => !m.type); // Main sitemap has no type property assigned in loop above or separate

  return {
    index,
    groups: {
      main,
      cities,
      towns
    }
  };
};