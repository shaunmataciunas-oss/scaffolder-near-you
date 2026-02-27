import React, { useState, useMemo, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Search, MapPin, ChevronRight, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { locations, getAllRegions, sortLocationsByName } from '@/data/locations';
import { formatLocationHierarchy } from '@/lib/linkingUtils';
import Breadcrumb from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { SITE_URL, DEFAULT_IMAGE } from '@/lib/seoHelpers';
import { motion, AnimatePresence } from 'framer-motion';
import { useAnalytics } from '@/hooks/useAnalytics';

const LocationsIndexPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [expandedRegions, setExpandedRegions] = useState({});
  const [expandedCities, setExpandedCities] = useState({}); // To expand/collapse major cities
  const { trackEvent } = useAnalytics();
  
  const regions = ['All', ...getAllRegions()];
  const allLocations = useMemo(() => sortLocationsByName(), []);
  
  const pageTitle = "Scaffolders Near You - National Scaffolding Database";
  const pageDescription = "Search our national scaffolding database to find local scaffolders in your area. Connect with verified scaffolding professionals.";

  // Filter locations first (both parents and children)
  const filteredLocations = useMemo(() => {
    return allLocations.filter(loc => {
      const q = searchQuery.toLowerCase();
      const matchesSearch = !q || loc.name.toLowerCase().includes(q) || loc.county.toLowerCase().includes(q);
      const matchesRegion = selectedRegion === 'All' || loc.region === selectedRegion;
      return matchesSearch && matchesRegion;
    });
  }, [searchQuery, selectedRegion, allLocations]);

  // Then reconstruct hierarchy for display
  const hierarchicalData = useMemo(() => {
    return formatLocationHierarchy(filteredLocations);
  }, [filteredLocations]);

  const sortedRegions = useMemo(() => Object.keys(hierarchicalData).sort(), [hierarchicalData]);

  // Handle auto-expansion logic
  useEffect(() => {
    if (selectedRegion !== 'All') {
       setExpandedRegions({ [selectedRegion]: true });
    } else if (searchQuery) {
       // Expand all regions if searching
       const allExpanded = {};
       const allCitiesExpanded = {};
       sortedRegions.forEach(r => allExpanded[r] = true);
       // Also expand all parents that have matches
       filteredLocations.forEach(loc => {
           if (loc.parentSlug) setExpandedCities(prev => ({...prev, [loc.parentSlug]: true}));
           if (!loc.parentSlug) setExpandedCities(prev => ({...prev, [loc.slug]: true}));
       });
       setExpandedRegions(allExpanded);
       
       trackEvent('location_search', {
         query: searchQuery,
         results_count: filteredLocations.length
       });
    } else {
       // Default state: Expand all regions
       const allExpanded = {};
       sortedRegions.forEach(r => allExpanded[r] = true);
       setExpandedRegions(allExpanded);
    }
  }, [selectedRegion, searchQuery, sortedRegions.length]); 

  const toggleRegion = (region) => {
    setExpandedRegions(prev => ({
      ...prev,
      [region]: !prev[region]
    }));
  };

  const toggleCity = (e, slug) => {
      e.preventDefault(); // Prevent link navigation if clicking toggle
      e.stopPropagation();
      setExpandedCities(prev => ({
          ...prev,
          [slug]: !prev[slug]
      }));
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="scaffolding database, find scaffolders, local scaffolders, scaffolding companies, national scaffolding directory, scaffolders UK" />
        <link rel="canonical" href={`${SITE_URL}/locations`} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/locations`} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={DEFAULT_IMAGE} />
      </Helmet>

      <div className="bg-brand-black text-white pt-24 pb-8">
        <div className="container mx-auto px-4">
          <Breadcrumb items={[{ label: 'Locations', href: '/locations' }]} />
          
          <div className="mt-8 max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-montserrat">
              Find Scaffolding Services <span className="text-brand-yellow">Near You</span>
            </h1>
            <p className="text-gray-300 text-lg mb-8">
              We provide professional scaffolding solutions across the UK. Browse our complete directory of {allLocations.length} locations to find local scaffolders in your area.
            </p>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 py-8">
        <div className="container mx-auto px-4">
          
          {/* Search and Filter Controls */}
          <div className="bg-white dark:bg-brand-secondary rounded-xl shadow-lg p-4 md:p-6 mb-8 border border-gray-100 dark:border-gray-800 shrink-0 z-20 sticky top-24">
            <div className="flex flex-col md:flex-row gap-4 md:gap-6">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search city, town, or county..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-black text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-yellow focus:border-transparent outline-none transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="relative min-w-[200px]">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select 
                  className="w-full pl-10 pr-8 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-black text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-yellow focus:border-transparent outline-none appearance-none cursor-pointer"
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                >
                  {regions.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <ChevronRight className="w-4 h-4 text-gray-400 rotate-90" />
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
               <p>Showing {filteredLocations.length} locations</p>
               {searchQuery && (
                 <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => { setSearchQuery(''); setSelectedRegion('All'); }}
                    className="h-auto p-0 text-brand-yellow hover:text-brand-yellow/80 hover:bg-transparent"
                 >
                   Clear Filters
                 </Button>
               )}
            </div>
          </div>

          {/* Locations List */}
          <div className="space-y-6">
             {sortedRegions.length > 0 ? (
                sortedRegions.map(region => (
                  <div key={region} className="bg-white dark:bg-brand-secondary rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
                    <button 
                      onClick={() => toggleRegion(region)}
                      className="w-full flex items-center justify-between bg-gray-50 dark:bg-zinc-800/50 px-6 py-4 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                          <MapPin className="text-brand-yellow w-5 h-5" />
                          <h2 className="text-lg md:text-xl font-bold text-brand-black dark:text-white font-montserrat">{region}</h2>
                          <span className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs px-2 py-0.5 rounded-full font-medium">
                              {hierarchicalData[region].length} cities
                          </span>
                      </div>
                      {expandedRegions[region] ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                    </button>
                    
                    {expandedRegions[region] && (
                       <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                          {hierarchicalData[region].map(loc => (
                            <div key={loc.id} className="relative">
                                {/* Main Location Card */}
                                <div className={`group flex flex-col p-3 rounded-lg bg-gray-50 dark:bg-zinc-900 hover:bg-white dark:hover:bg-gray-800 border transition-all shadow-sm hover:shadow-md ${loc.children && loc.children.length > 0 ? 'border-brand-yellow/20' : 'border-transparent'}`}>
                                    <div className="flex items-center justify-between">
                                        <Link to={`/locations/${loc.slug}`} className="flex items-center flex-grow">
                                            <div className="w-2 h-2 rounded-full bg-gray-300 group-hover:bg-brand-yellow mr-3 transition-colors shrink-0"></div>
                                            <span className="font-bold text-gray-900 dark:text-gray-200 group-hover:text-brand-yellow transition-colors truncate">
                                                {loc.name}
                                            </span>
                                        </Link>
                                        
                                        {/* Expand Toggle for Children */}
                                        {loc.children && loc.children.length > 0 && (
                                            <button 
                                                onClick={(e) => toggleCity(e, loc.slug)}
                                                className="ml-2 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                                            >
                                                {expandedCities[loc.slug] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                            </button>
                                        )}
                                    </div>
                                    <span className="text-xs text-gray-500 dark:text-gray-500 truncate block ml-5">
                                        {loc.county}
                                    </span>
                                </div>

                                {/* Nested Children */}
                                {expandedCities[loc.slug] && loc.children && (
                                    <div className="ml-5 border-l-2 border-gray-200 dark:border-gray-700 pl-3 mt-2 space-y-1">
                                        {loc.children.map(child => (
                                            <Link 
                                                key={child.id}
                                                to={`/locations/${child.slug}`}
                                                className="block text-sm text-gray-600 dark:text-gray-400 hover:text-brand-yellow py-1"
                                            >
                                                {child.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                          ))}
                       </div>
                    )}
                  </div>
                ))
             ) : (
                <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-brand-secondary rounded-xl border border-gray-100 dark:border-gray-800">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No locations found</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">
                    Try adjusting your search terms or selecting a different region.
                  </p>
                  <Button 
                    variant="outline"
                    onClick={() => { setSearchQuery(''); setSelectedRegion('All'); }}
                  >
                    Reset All Filters
                  </Button>
                </div>
             )}
          </div>

        </div>
      </div>
    </>
  );
};

export default LocationsIndexPage;