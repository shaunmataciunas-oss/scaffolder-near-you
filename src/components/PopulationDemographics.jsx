import React from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, Home, Briefcase, ExternalLink, Info } from 'lucide-react';

const PopulationDemographics = ({ data, locationName }) => {
  if (!data) return null;

  const isPositiveGrowth = data.populationGrowth >= 0;

  return (
    <section className="py-12 bg-white dark:bg-black border-t border-gray-100 dark:border-gray-800">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold font-montserrat text-gray-900 dark:text-white">
              Population & Demographics
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Latest census insights and demographic trends for {locationName}.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Total Population */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="p-6 bg-gray-50 dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Population</span>
              <Users className="w-5 h-5 text-indigo-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {data.totalPopulation}
            </div>
            <p className="text-xs text-gray-400">
              Residents (2021 Census)
            </p>
          </motion.div>

          {/* Population Growth */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="p-6 bg-gray-50 dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Growth Trend</span>
              <TrendingUp className={`w-5 h-5 ${isPositiveGrowth ? 'text-green-500' : 'text-amber-500'}`} />
            </div>
            <div className={`text-3xl font-bold mb-1 ${isPositiveGrowth ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'}`}>
              {isPositiveGrowth ? '+' : ''}{data.populationGrowth}%
            </div>
            <p className="text-xs text-gray-400">
              Since previous census
            </p>
          </motion.div>

          {/* Households */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="p-6 bg-gray-50 dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Households</span>
              <Home className="w-5 h-5 text-indigo-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {data.householdCount}
            </div>
            <p className="text-xs text-gray-400">
              Occupied households
            </p>
          </motion.div>

          {/* Working Age */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="p-6 bg-gray-50 dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Working Age</span>
              <Briefcase className="w-5 h-5 text-indigo-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {data.workingAgePercentage}%
            </div>
            <p className="text-xs text-gray-400">
              Aged 16-64 years
            </p>
          </motion.div>

        </div>

        {/* Footer / Source */}
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs text-gray-500 border-t border-gray-100 dark:border-gray-800 pt-4">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4" />
            <span>
              Population density: <strong>{data.populationDensity}</strong> people per km²
            </span>
          </div>
          
          <div className="flex gap-4">
            {data.sourceLinks?.ons && (
              <a 
                href={data.sourceLinks.ons}
                target="_blank" 
                rel="noopener noreferrer nofollow"
                className="flex items-center gap-1 hover:text-indigo-600 transition-colors"
              >
                ONS Data Source
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
            {data.sourceLinks?.council && (
              <a 
                href={data.sourceLinks.council}
                target="_blank" 
                rel="noopener noreferrer nofollow"
                className="flex items-center gap-1 hover:text-indigo-600 transition-colors"
              >
                Local Authority
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};

export default PopulationDemographics;