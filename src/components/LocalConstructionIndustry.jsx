import React from 'react';
import { motion } from 'framer-motion';
import { Building2, ExternalLink, FileText, Landmark, Map } from 'lucide-react';

const LocalConstructionIndustry = ({ content, locationName }) => {
  if (!content) return null;

  const { overview, authorities, region } = content;

  return (
    <section className="py-16 bg-white dark:bg-brand-black border-t border-gray-100 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg bg-brand-yellow/10">
                  <Building2 className="w-6 h-6 text-brand-yellow" />
                </div>
                <h2 className="text-3xl font-bold font-montserrat text-gray-900 dark:text-white">
                  Local Construction & Scaffolding Industry
                </h2>
              </div>
              
              <div className="prose dark:prose-invert prose-lg max-w-none mb-8">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {overview}
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-zinc-900 p-6 rounded-xl border border-gray-100 dark:border-gray-800">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Map className="w-5 h-5 text-gray-400" />
                  Regional Context
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {locationName} is a key location within the <strong>{region}</strong> region. 
                  Our scaffolding network covers this entire area, ensuring that whether you are in {locationName} center 
                  or the surrounding boroughs, professional access solutions are always within reach.
                </p>
              </div>
            </div>

            {/* Sidebar Resources */}
            <div className="lg:col-span-1">
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-brand-secondary to-brand-black p-8 rounded-2xl shadow-xl border border-gray-700 text-white relative overflow-hidden"
              >
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-yellow/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
                
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2 relative z-10">
                  <Landmark className="w-5 h-5 text-brand-yellow" />
                  Local Resources
                </h3>
                
                <ul className="space-y-4 relative z-10">
                  <li>
                    <a 
                      href={authorities.council} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
                    >
                      <div className="flex items-center gap-3">
                        <Landmark className="w-4 h-4 text-gray-400 group-hover:text-brand-yellow" />
                        <span className="text-sm font-medium">Local Council</span>
                      </div>
                      <ExternalLink className="w-3 h-3 text-gray-500 group-hover:text-white" />
                    </a>
                  </li>
                  <li>
                    <a 
                      href={authorities.planning} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
                    >
                      <div className="flex items-center gap-3">
                        <Map className="w-4 h-4 text-gray-400 group-hover:text-brand-yellow" />
                        <span className="text-sm font-medium">Planning Portal</span>
                      </div>
                      <ExternalLink className="w-3 h-3 text-gray-500 group-hover:text-white" />
                    </a>
                  </li>
                  <li>
                    <a 
                      href={authorities.buildingControl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4 text-gray-400 group-hover:text-brand-yellow" />
                        <span className="text-sm font-medium">Building Control</span>
                      </div>
                      <ExternalLink className="w-3 h-3 text-gray-500 group-hover:text-white" />
                    </a>
                  </li>
                </ul>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <p className="text-xs text-gray-400">
                    Always check with your local planning authority regarding scaffolding permits for public highways in {locationName}.
                  </p>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default LocalConstructionIndustry;