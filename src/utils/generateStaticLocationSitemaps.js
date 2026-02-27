import { generateAllLocationSitemaps } from './sitemapGeneratorV2';

/**
 * Triggers browser download for all sitemaps.
 * Since we are in a client-side environment, we can't write to disk directly
 * without a Node.js backend or build step. 
 * This function simulates the "generation" by preparing the files for download.
 */
export const downloadAllLocationSitemaps = () => {
  const { index, maps } = generateAllLocationSitemaps();
  const allFiles = [index, ...maps];
  
  // Helper to download a single file with a slight delay to prevent browser blocking
  const downloadFile = (file, delay) => {
    setTimeout(() => {
      const blob = new Blob([file.content], { type: 'text/xml' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = file.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, delay);
  };

  // Download Index first
  downloadFile(index, 0);

  // Then download main
  const main = maps.find(m => m.filename === 'sitemap-main.xml');
  if (main) downloadFile(main, 500);

  // Download first 5 location maps as example/priority to avoid flooding 
  // (In a real app, you'd likely zip these or use a backend script)
  maps.filter(m => m.filename !== 'sitemap-main.xml').slice(0, 5).forEach((map, i) => {
    downloadFile(map, 1000 + (i * 500));
  });

  return {
    count: allFiles.length,
    totalUrls: maps.reduce((acc, m) => acc + m.urlCount, 0)
  };
};

/**
 * Returns data for admin dashboard view
 */
export const getSitemapGenerationStats = () => {
  const { index, maps } = generateAllLocationSitemaps();
  return {
    lastGenerated: new Date(),
    totalSitemaps: maps.length + 1, // maps + index
    totalUrls: maps.reduce((acc, m) => acc + m.urlCount, 0),
    files: [index, ...maps]
  };
};