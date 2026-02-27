import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Search } from 'lucide-react';
import { locations } from '@/data/locations';

const LocationSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  // Optimized search that respects hierarchy
  const filteredLocations = useMemo(() => {
    if (!search) return [];
    const q = search.toLowerCase();
    
    return locations.filter(location => {
        // Match name matches
        const nameMatch = location.name.toLowerCase().includes(q);
        // Also match if parent name matches (e.g. searching "Bolton" shows "Halliwell")
        const parentMatch = location.parentName && location.parentName.toLowerCase().includes(q);
        return nameMatch || parentMatch;
    }).sort((a, b) => {
        // Prioritize parent locations (no parentSlug)
        if (!a.parentSlug && b.parentSlug) return -1;
        if (a.parentSlug && !b.parentSlug) return 1;
        return a.name.localeCompare(b.name);
    }).slice(0, 50); // Limit results for performance
  }, [search]);

  const handleLocationSelect = (slug) => {
    navigate(`/locations/${slug}`);
    setIsOpen(false);
    setSearch('');
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 border border-gray-700 rounded-lg hover:border-brand-yellow transition-colors bg-brand-secondary text-white hover:text-brand-yellow"
      >
        <MapPin className="w-4 h-4" />
        <span className="text-sm font-medium">Find Your Area</span>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full mt-2 right-0 w-80 bg-brand-secondary rounded-lg shadow-2xl border border-gray-700 z-50 max-h-96 flex flex-col overflow-hidden">
            <div className="p-3 border-b border-gray-700 bg-brand-black/50">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search city, town, or area..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-brand-black border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-yellow text-white placeholder-gray-500 text-sm"
                  autoFocus
                />
              </div>
            </div>
            <div className="overflow-y-auto custom-scrollbar flex-1 bg-brand-secondary">
              {filteredLocations.length > 0 ? (
                <div className="p-1">
                  {filteredLocations.map((location) => (
                    <button
                      key={location.slug}
                      onClick={() => handleLocationSelect(location.slug)}
                      className="w-full text-left px-3 py-2.5 hover:bg-brand-yellow hover:text-brand-black rounded-md transition-all text-sm text-gray-200 flex flex-col items-start group border-b border-gray-800 last:border-0"
                    >
                      <div className="flex justify-between w-full items-center">
                        <span className="font-medium">{location.name}</span>
                        {location.parentName && (
                           <span className="text-[10px] bg-gray-700 text-gray-300 px-1.5 rounded group-hover:bg-black/20 group-hover:text-black">
                               in {location.parentName}
                           </span>
                        )}
                      </div>
                      {!location.parentName && (
                          <span className="text-xs text-gray-500 group-hover:text-black/60">{location.county}</span>
                      )}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-gray-500 text-sm">
                  {search ? 'No locations found' : 'Type to search...'}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LocationSelector;