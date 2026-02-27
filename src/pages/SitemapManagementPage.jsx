import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { RefreshCw, ShieldCheck, Download, AlertCircle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import SitemapStatusWidget from '@/components/SitemapStatusWidget';
import SitemapCategorySection from '@/components/SitemapCategorySection';
import GSCSubmissionGuide from '@/components/GSCSubmissionGuide';
import { getAllSitemapMetadata } from '@/utils/sitemapGeneratorV2';
import { downloadAllLocationSitemaps } from '@/utils/generateStaticLocationSitemaps';

const SitemapManagementPage = () => {
  const { toast } = useToast();
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [metadata, setMetadata] = useState(null);

  useEffect(() => {
    // Load initial data
    const data = getAllSitemapMetadata();
    setMetadata(data);
  }, [lastUpdated]);

  const handleRegenerateAll = () => {
    setIsRegenerating(true);
    
    // Simulate API call / processing time
    setTimeout(() => {
      const stats = downloadAllLocationSitemaps();
      setLastUpdated(new Date());
      setIsRegenerating(false);
      
      toast({
        title: "Sitemaps Generated Successfully",
        description: `${stats.count} files prepared. Downloading started...`,
        duration: 5000,
      });
    }, 2000);
  };

  const getStats = () => {
    if (!metadata) return { totalUrls: 0, totalSitemaps: 0 };
    const { groups } = metadata;
    const totalUrls = [...groups.main, ...groups.cities, ...groups.towns].reduce((acc, map) => acc + map.urlCount, 0);
    return {
      totalUrls,
      totalSitemaps: groups.main.length + groups.cities.length + groups.towns.length + 1, // + index
      mainCount: groups.main.length,
      cityCount: groups.cities.length,
      townCount: groups.towns.length
    };
  };

  return (
    <>
      <Helmet>
        <title>Sitemap Management | Admin Dashboard</title>
      </Helmet>

      <div className="min-h-screen bg-gray-50 dark:bg-black pb-20 pt-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-montserrat flex items-center gap-3">
                <ShieldCheck className="text-brand-yellow w-8 h-8" />
                SEO & Sitemap Management
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                Manage location-based XML sitemaps and GSC submission.
              </p>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={handleRegenerateAll} 
                disabled={isRegenerating}
                className="bg-brand-yellow text-brand-black hover:bg-yellow-400 font-bold shadow-sm"
              >
                {isRegenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Regenerate All
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Sidebar Column */}
            <div className="lg:col-span-1 space-y-6">
              <SitemapStatusWidget stats={getStats()} lastUpdated={lastUpdated} />
              
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-5">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-blue-900 dark:text-blue-300 text-sm mb-1">Static Generation Mode</h4>
                    <p className="text-xs text-blue-800 dark:text-blue-200 leading-relaxed">
                      Sitemaps are generated in the browser. Clicking "Regenerate" will download the XML files. You must upload these to your hosting <code>/public</code> folder for them to be live.
                    </p>
                  </div>
                </div>
              </div>

               <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
                 <h3 className="font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
                 <div className="space-y-3">
                   <Button variant="outline" className="w-full justify-start" asChild>
                     <a href="/sitemap_index.xml" target="_blank" rel="noreferrer">
                       <ExternalLink className="w-4 h-4 mr-2" />
                       View Master Index
                     </a>
                   </Button>
                   <Button variant="outline" className="w-full justify-start" asChild>
                     <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer">
                       <ExternalLink className="w-4 h-4 mr-2" />
                       Open Search Console
                     </a>
                   </Button>
                 </div>
               </div>
            </div>

            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-8">
              {metadata && (
                <>
                  <SitemapCategorySection 
                    title="Main Sitemaps" 
                    sitemaps={metadata.groups.main}
                    type="main"
                  />
                  
                  <SitemapCategorySection 
                    title="City Sitemaps" 
                    sitemaps={metadata.groups.cities}
                    type="city"
                  />
                  
                  <SitemapCategorySection 
                    title="Town Sitemaps" 
                    sitemaps={metadata.groups.towns}
                    type="town"
                  />
                </>
              )}

              <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-gray-800 rounded-xl p-8">
                 <GSCSubmissionGuide />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SitemapManagementPage;