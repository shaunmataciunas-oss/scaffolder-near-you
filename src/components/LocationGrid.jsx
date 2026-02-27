import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Search } from 'lucide-react';
import { locations, getAllRegions } from '@/data/locations';

const LocationGrid = () => {
  const [search, setSearch] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');

  // Use regions instead of boroughs for the filter since the dataset is now national
  const regions = useMemo(() => ['All', ...getAllRegions()], []);

  // Limit initial locations for performance
  const filteredLocations = useMemo(() => {
    let results = locations.filter(location => {
      const matchesSearch = location.name.toLowerCase().includes(search.toLowerCase());
      const matchesRegion = selectedRegion === 'All' || location.region === selectedRegion;
      return matchesSearch && matchesRegion;
    });

    // If searching, show more results, otherwise limit to keep the grid clean
    if (!search && selectedRegion === 'All') {
      return results.slice(0, 20); // Show top 20 default
    }
    return results.slice(0, 30); // Cap at 30 to prevent massive re-renders in grid
  }, [search, selectedRegion]);

  return (
    <section id="locations" className="py-20 bg-brand-black relative">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4 font-montserrat text-white"
          >
            Areas We <span className="text-brand-yellow">Cover</span>
          </motion.h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
            Professional scaffolding services available in over {locations.length} locations across the UK.
          </p>

          <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-center">
            {/* Search Input */}
            <div className="relative w-full md:w-1/2">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search your town..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-brand-secondary border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-yellow shadow-lg text-white placeholder-gray-500 transition-all"
              />
            </div>
            
            {/* Region Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto md:pb-0 custom-scrollbar">
              {regions.map(region => (
                <button
                  key={region}
                  onClick={() => setSelectedRegion(region)}
                  className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                    selectedRegion === region 
                      ? 'bg-brand-yellow text-brand-black shadow-md' 
                      : 'bg-brand-secondary text-gray-400 border border-gray-700 hover:border-brand-yellow hover:text-white'
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
        >
          {filteredLocations.map((location) => (
            <motion.div
              layout
              key={location.slug}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                to={`/locations/${location.slug}`}
                className="block p-4 bg-brand-secondary rounded-xl shadow-md hover:shadow-xl transition-all hover:-translate-y-1 group border border-gray-800 hover:border-brand-yellow/50 h-full"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-brand-yellow/10 flex items-center justify-center group-hover:bg-brand-yellow transition-colors">
                    <MapPin className="w-4 h-4 text-brand-yellow group-hover:text-brand-black transition-colors" />
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-white group-hover:text-brand-yellow transition-colors line-clamp-1">
                      {location.name}
                    </span>
                    <span className="block text-xs text-gray-500 group-hover:text-gray-400">
                      {location.region}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {filteredLocations.length === 0 && (
          <div className="text-center py-16 bg-brand-secondary/30 rounded-xl border border-gray-800 border-dashed">
            <p className="text-gray-400 text-lg">No locations found matching "{search}" in {selectedRegion}</p>
            <button 
              onClick={() => { setSearch(''); setSelectedRegion('All'); }}
              className="mt-4 text-brand-yellow hover:underline font-bold"
            >
              Clear filters
            </button>
          </div>
        )}

        <div className="mt-12 text-center">
          <Link to="/locations" className="inline-flex items-center justify-center px-8 py-3 border border-gray-600 text-base font-medium rounded-md text-white hover:bg-gray-800 hover:border-brand-yellow transition-all">
            View All {locations.length} Locations
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LocationGrid;