import React, { useMemo, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { MapPin, Building2 } from 'lucide-react';
import { locations } from '@/data/locations';
import { getLocationsByRegion, getAllRegions, deslugifyRegion, slugifyRegion } from '@/lib/linkingUtils';
import Breadcrumb from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { SITE_URL, DEFAULT_IMAGE } from '@/lib/seoHelpers';

const RegionalHubPage = () => {
  const { regionSlug } = useParams();
  const navigate = useNavigate();

  // Handle case where regionSlug might be undefined or encoded
  const regionName = useMemo(() => deslugifyRegion(regionSlug || ''), [regionSlug]);
  const regionLocations = useMemo(() => getLocationsByRegion(regionName, locations), [regionName]);
  const allRegions = useMemo(() => getAllRegions(locations), []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [regionSlug]);

  // If region doesn't exist (array empty), straightforward 404 handling or redirect
  if (regionLocations.length === 0) {
    return (
      <div className="min-h-screen bg-brand-black flex flex-col items-center justify-center p-4">
        <h1 className="text-white text-3xl font-bold mb-4">Region Not Found</h1>
        <Button onClick={() => navigate('/locations')} variant="outline" className="text-black bg-white">
          View All Locations
        </Button>
      </div>
    );
  }

  const pageTitle = `Scaffolding Companies in ${regionName} | Scaffolders Near You`;
  const metaDescription = `Find professional scaffolding services across ${regionName}. Browse ${regionLocations.length} local providers offering residential and commercial scaffolding solutions.`;
  const canonicalUrl = `${SITE_URL}/region/${regionSlug}`;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={DEFAULT_IMAGE} />
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-brand-black py-20 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="mb-8">
            <Breadcrumb items={[
              { label: 'Locations', href: '/locations' },
              { label: regionName }
            ]} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-yellow/10 border border-brand-yellow/20 text-brand-yellow text-sm font-bold mb-4">
              <Building2 className="w-4 h-4" />
              Regional Hub
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-montserrat">
              Scaffolders in <span className="text-brand-yellow">{regionName}</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mb-8 leading-relaxed">
              We have {regionLocations.length} trusted scaffolding partners operating throughout {regionName}. 
              Select your local area below to get a free, no-obligation quote for your project.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="py-16 bg-gray-50 dark:bg-zinc-900">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Areas Covered in {regionName}
            </h2>
            <span className="text-sm font-medium text-gray-500 bg-white dark:bg-black px-3 py-1 rounded-full border border-gray-200 dark:border-gray-800">
              {regionLocations.length} Locations
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {regionLocations.map((loc) => (
              <motion.div
                key={loc.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white dark:bg-brand-secondary p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800 hover:border-brand-yellow/50 transition-colors"
              >
                <Link 
                  to={`/locations/${loc.slug}`}
                  className="flex items-start gap-3 group"
                >
                  <MapPin className="w-5 h-5 text-brand-yellow mt-1 flex-shrink-0 group-hover:text-brand-black dark:group-hover:text-white transition-colors" />
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-brand-yellow transition-colors">
                      {loc.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">{loc.county}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Regions Navigation */}
      <section className="py-16 bg-white dark:bg-black border-t border-gray-100 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center text-gray-900 dark:text-white">
            Browse Other Regions
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {allRegions.filter(r => r !== regionName).map((r) => (
              <Button
                key={r}
                variant="outline"
                asChild
                className="border-gray-200 dark:border-gray-800 hover:border-brand-yellow hover:bg-brand-yellow/5 text-gray-700 dark:text-gray-300"
              >
                <Link to={`/region/${slugifyRegion(r)}`}>
                  {r}
                </Link>
              </Button>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/html-sitemap" className="text-brand-yellow hover:underline text-sm font-bold">
              View Full Location Index
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default RegionalHubPage;