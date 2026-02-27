import React from 'react';
import { Search, X } from 'lucide-react';
import { motion } from 'framer-motion';

const FAQSearch = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative max-w-2xl mx-auto mb-12">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-12 pr-12 py-4 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-gray-700 rounded-full text-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all"
          placeholder="Search for answers (e.g., 'cost', 'permit', 'safety')..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-brand-yellow transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
      
      {/* Search Hints */}
      <motion.p 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        className="text-center text-sm text-gray-500 mt-3"
      >
        Common topics: <button onClick={() => setSearchTerm('cost')} className="text-brand-yellow hover:underline mx-1">Costs</button> • 
        <button onClick={() => setSearchTerm('insurance')} className="text-brand-yellow hover:underline mx-1">Insurance</button> • 
        <button onClick={() => setSearchTerm('areas')} className="text-brand-yellow hover:underline mx-1">Areas Covered</button>
      </motion.p>
    </div>
  );
};

export default FAQSearch;