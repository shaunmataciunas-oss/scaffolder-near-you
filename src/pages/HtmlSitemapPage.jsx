import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Globe } from 'lucide-react';
import { locations } from '@/data/locations';
import { getAllRegions, formatLocationHierarchy, slugifyRegion } from '@/lib/linkingUtils';
import Breadcrumb from '@/components/Breadcrumb';
import { SITE_URL } from '@/lib/seoHelpers';

const HtmlSitemapPage = () => {
  const regions = useMemo(() => getAllRegions(locations), []);
  
  // Use hierarchy helper
  const hierarchy = useMemo(() => formatLocationHierarchy(locations), []);

  const pageTitle = "HTML Sitemap - All Locations | Scaffolders Near You";
  const metaDescription = "Browse our complete index of over 800 scaffolding service locations across the UK. Find local scaffolders in your region.";
  const canonicalUrl = `${SITE_URL}/html-sitemap`;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <div className="bg-gray-50 dark:bg-zinc-900 min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Breadcrumb items={[{ label: 'HTML Sitemap' }]} />
          </div>

          <div className="bg-white dark:bg-brand-black rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-yellow/10 mb-4">
                <Globe className="w-8 h-8 text-brand-yellow" />
              </div>
              <h1 className="text-4xl font-bold mb-4 font-montserrat text-gray-900 dark:text-white">
                HTML Sitemap
              </h1>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                A complete directory of all {locations.length} locations we serve across the UK. 
                Organized by region and city for easy navigation.
              </p>
            </div>

            {/* Region Links */}
            <div className="flex flex-wrap justify-center gap-4 mb-16 border-b border-gray-100 dark:border-gray-800 pb-8">
              {regions.map((region) => (
                <a 
                  key={region}
                  href={`#${slugifyRegion(region)}`}
                  className="px-4 py-2 bg-gray-100 dark:bg-zinc-800 rounded-lg text-sm font-medium hover:bg-brand-yellow hover:text-brand-black transition-colors text-gray-700 dark:text-gray-300"
                >
                  {region}
                </a>
              ))}
            </div>

            {/* Grid of Regions */}
            <div className="space-y-16">
              {regions.map((region) => (
                <section key={region} id={slugifyRegion(region)} className="scroll-mt-24">
                  <div className="flex items-center justify-between mb-6 border-l-4 border-brand-yellow pl-4">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      <Link to={`/region/${slugifyRegion(region)}`} className="hover:text-brand-yellow transition-colors">
                        {region}
                      </Link>
                    </h2>
                    <span className="text-xs font-mono text-gray-500 bg-gray-100 dark:bg-zinc-800 px-2 py-1 rounded">
                      {hierarchy[region].length} MAJOR CITIES
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {hierarchy[region].map((loc) => (
                      <div key={loc.id} className="break-inside-avoid">
                        <Link
                          to={`/locations/${loc.slug}`}
                          className="font-bold text-gray-900 dark:text-white hover:text-brand-yellow dark:hover:text-brand-yellow hover:underline block mb-1"
                        >
                          {loc.name}
                        </Link>
                        
                        {/* Sub-locations list */}
                        {loc.children && loc.children.length > 0 && (
                          <ul className="pl-4 border-l border-gray-200 dark:border-gray-700 space-y-1 mt-1">
                            {loc.children.map(child => (
                              <li key={child.id}>
                                <Link 
                                  to={`/locations/${child.slug}`}
                                  className="text-sm text-gray-500 hover:text-brand-yellow transition-colors"
                                >
                                  {child.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HtmlSitemapPage;