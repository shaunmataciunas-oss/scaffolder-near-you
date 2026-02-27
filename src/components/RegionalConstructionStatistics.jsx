import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, ExternalLink, HardHat, TrendingUp } from 'lucide-react';
import { getRegionalStatistics } from '@/data/regionalConstructionStatistics';

const RegionalConstructionStatistics = ({ regionName }) => {
  const data = getRegionalStatistics(regionName);

  if (!data || !data.statistics || data.statistics.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-gray-50 dark:bg-zinc-900 border-t border-gray-100 dark:border-gray-800">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold font-montserrat text-gray-900 dark:text-white">
                Construction Statistics: {regionName}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Key performance indicators and market data for the local construction sector.
              </p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-2 text-sm text-gray-500 bg-white dark:bg-black px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span>Updated: 2023-2024 Reporting Period</span>
          </div>
        </div>

        {/* Statistics Table */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-black rounded-xl shadow-md border border-gray-200 dark:border-gray-800 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-zinc-800/50 text-gray-600 dark:text-gray-300 text-sm uppercase tracking-wider font-semibold border-b border-gray-200 dark:border-gray-700">
                  <th className="p-4 md:p-6 w-1/3">Statistic</th>
                  <th className="p-4 md:p-6 w-1/4">Value (Year)</th>
                  <th className="p-4 md:p-6 w-1/3 text-right">Source</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {data.statistics.map((stat, index) => (
                  <tr 
                    key={index} 
                    className="hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors group"
                  >
                    <td className="p-4 md:p-6">
                      <div className="flex items-center gap-3">
                        <HardHat className="w-4 h-4 text-gray-400 group-hover:text-brand-yellow transition-colors" />
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                          {stat.statistic}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 md:p-6">
                      <div className="flex flex-col">
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                          {stat.value}
                        </span>
                        <span className="text-xs text-gray-500">
                          {stat.year}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 md:p-6 text-right">
                      <a 
                        href={stat.sourceUrl} 
                        target="_blank" 
                        rel="noopener noreferrer nofollow"
                        className="inline-flex items-center gap-1.5 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
                      >
                        {stat.source}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="bg-gray-50 dark:bg-zinc-900/50 p-4 border-t border-gray-200 dark:border-gray-800 text-xs text-center text-gray-500">
            * Data aggregated from ONS, HSE, and regional government reports. Figures are estimates based on latest available publications.
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default RegionalConstructionStatistics;