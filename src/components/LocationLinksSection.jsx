import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';

const locations = [
  'Manchester', 'Bolton', 'Salford', 'Birmingham', 'London', 'Leeds', 'Liverpool', 
  'Stockport', 'Coventry', 'Wolverhampton', 'Walsall', 'Dudley', 'Oldham', 'Rochdale', 
  'Bury', 'Tameside', 'Trafford', 'Wirral', 'St Helens', 'Warrington', 'Cheshire', 
  'Stoke-on-Trent', 'Derby', 'Nottingham', 'Leicester', 'Northampton', 'Bristol', 
  'Cardiff', 'Edinburgh', 'Glasgow'
];

const LocationLinksSection = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-zinc-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 font-montserrat">
            Shop by <span className="text-brand-yellow">Location</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Find professional scaffolding supplies and equipment near you. We deliver nationwide to all major UK cities and towns.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {locations.map((city, index) => {
            const slug = city.toLowerCase().replace(/\s+/g, '-');
            return (
              <motion.div
                key={city}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.02 }}
              >
                <Link 
                  to={`/locations/${slug}`}
                  className="group block p-4 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md hover:border-brand-yellow/50 transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-brand-yellow/10 p-2 rounded-full text-brand-black group-hover:bg-brand-yellow group-hover:text-black transition-colors">
                        <MapPin size={18} />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-brand-yellow transition-colors">
                          {city}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Supplies & Services
                        </p>
                      </div>
                    </div>
                    <ArrowRight size={16} className="text-gray-300 group-hover:text-brand-yellow transform group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
        
        <div className="mt-10 text-center">
          <Link to="/locations">
            <button className="text-brand-black dark:text-white font-semibold hover:text-brand-yellow transition-colors inline-flex items-center gap-2">
              View All Coverage Areas <ArrowRight size={16} />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LocationLinksSection;