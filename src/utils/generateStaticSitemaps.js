import { getSitemapData, generateSitemapXml, generateSitemapIndex } from '@/utils/sitemapGenerator';

/**
 * Utility to generate static sitemap content.
 * In a Node.js environment, this would write to disk.
 * In a browser/client environment, this returns the content for download or display.
 */
export const generateAllSitemaps = () => {
  const data = getSitemapData();
  
  const sitemaps = {
    'sitemap_index.xml': generateSitemapIndex([
      'https://scaffoldersnearyou.co.uk/sitemap-main.xml',
      'https://scaffoldersnearyou.co.uk/sitemap-locations.xml',
      'https://scaffoldersnearyou.co.uk/sitemap-sub-locations.xml',
      'https://scaffoldersnearyou.co.uk/sitemap-blog.xml'
    ]),
    'sitemap-main.xml': generateSitemapXml(data.main),
    'sitemap-locations.xml': generateSitemapXml(data.locations),
    'sitemap-sub-locations.xml': generateSitemapXml(data.subLocations),
    'sitemap-blog.xml': generateSitemapXml(data.blog)
  };

  return sitemaps;
};

// Helper to trigger download of all sitemaps (for Admin usage)
export const downloadAllSitemaps = () => {
  const maps = generateAllSitemaps();
  
  Object.entries(maps).forEach(([filename, content]) => {
    const blob = new Blob([content], { type: 'text/xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  });
};