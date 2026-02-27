import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { FileCode, ArrowRight, Download, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getAllSitemapMetadata } from '@/utils/sitemapGeneratorV2';
import { SITE_URL } from '@/lib/seoHelpers';

const SitemapDownloadPage = () => {
  const [metadata, setMetadata] = useState(null);

  useEffect(() => {
    setMetadata(getAllSitemapMetadata());
  }, []);

  const handleDownload = (filename, content) => {
    const blob = new Blob([content], { type: 'text/xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (!metadata) return null;

  return (
    <>
      <Helmet>
        <title>Sitemaps | Scaffolders Near You</title>
        <meta name="description" content="Access our XML sitemaps for SEO crawling and indexing." />
      </Helmet>

      <div className="min-h-screen bg-gray-50 dark:bg-black pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 font-montserrat">
              XML Sitemaps
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Comprehensive list of all XML sitemaps generated for this website. 
              Search engines should use the Sitemap Index file.
            </p>
          </div>

          {/* Master Index Card */}
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-xl border border-brand-yellow/50 shadow-md mb-12 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-2 h-full bg-brand-yellow"></div>
             <div className="flex flex-col md:flex-row justify-between items-center gap-6">
               <div className="flex items-center gap-4">
                 <div className="p-4 bg-brand-yellow text-brand-black rounded-lg">
                   <Package className="w-8 h-8" />
                 </div>
                 <div>
                   <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Sitemap Index</h2>
                   <p className="text-gray-500 dark:text-gray-400 text-sm">
                     The master file containing references to all {metadata.index.urlCount} sitemaps.
                   </p>
                 </div>
               </div>
               <div className="flex gap-3 w-full md:w-auto">
                 <Button asChild variant="outline" className="flex-1 md:flex-none">
                   <a href={`/${metadata.index.filename}`} target="_blank" rel="noreferrer">View</a>
                 </Button>
                 <Button 
                   onClick={() => handleDownload(metadata.index.filename, metadata.index.content)}
                   className="flex-1 md:flex-none bg-brand-yellow text-brand-black hover:bg-yellow-400"
                 >
                   <Download className="w-4 h-4 mr-2" /> Download Index
                 </Button>
               </div>
             </div>
          </div>

          <div className="grid gap-12">
            {/* Main Sitemaps */}
            <section>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div> Main Pages
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {metadata.groups.main.map(map => (
                  <SitemapCard key={map.filename} map={map} onDownload={handleDownload} />
                ))}
              </div>
            </section>

            {/* City Sitemaps */}
            <section>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500"></div> City Sitemaps
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {metadata.groups.cities.map(map => (
                  <SitemapCard key={map.filename} map={map} onDownload={handleDownload} />
                ))}
              </div>
            </section>

             {/* Town Sitemaps */}
            <section>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-brand-yellow"></div> Town Sitemaps
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {metadata.groups.towns.map(map => (
                  <SitemapCard key={map.filename} map={map} onDownload={handleDownload} />
                ))}
              </div>
            </section>
          </div>

          <div className="mt-16 text-center p-8 bg-gray-50 dark:bg-zinc-800/50 rounded-xl">
            <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Looking for visual navigation?</h3>
            <Button asChild variant="link">
              <Link to="/html-sitemap" className="text-brand-yellow">
                Visit HTML Sitemap <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

const SitemapCard = ({ map, onDownload }) => (
  <div className="bg-white dark:bg-zinc-900 p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all">
    <div className="flex justify-between items-start mb-3">
      <FileCode className="w-5 h-5 text-gray-400" />
      <span className="text-xs font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-gray-500">
        {map.urlCount} URLs
      </span>
    </div>
    <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-1 truncate" title={map.filename}>
      {map.filename}
    </h4>
    <p className="text-xs text-gray-500 mb-4">{map.lastmod}</p>
    <div className="flex gap-2">
      <a 
        href={`/${map.filename}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs font-medium text-blue-500 hover:underline flex-1 text-center"
      >
        View
      </a>
      <button 
        onClick={() => onDownload(map.filename, map.content)}
        className="text-xs font-medium text-brand-yellow hover:text-yellow-600 flex-1 text-center"
      >
        Download
      </button>
    </div>
  </div>
);

export default SitemapDownloadPage;