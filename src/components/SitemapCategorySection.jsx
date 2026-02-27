import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Download, ExternalLink, FileText, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SITE_URL } from '@/lib/seoHelpers';

const SitemapCategorySection = ({ title, sitemaps, onDownload, type }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [search, setSearch] = useState('');

  const filteredSitemaps = sitemaps.filter(map => 
    map.filename.toLowerCase().includes(search.toLowerCase()) ||
    (map.name && map.name.toLowerCase().includes(search.toLowerCase()))
  );

  const downloadFile = (filename, content) => {
    const blob = new Blob([content], { type: 'text/xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-900 mb-6 shadow-sm">
      <div 
        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-zinc-800/50 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          <div className={`w-2 h-8 rounded-full ${
            type === 'main' ? 'bg-blue-500' : 
            type === 'city' ? 'bg-purple-500' : 'bg-brand-yellow'
          }`} />
          <h3 className="font-bold text-lg text-gray-900 dark:text-white">
            {title} <span className="text-gray-500 text-sm ml-2">({filteredSitemaps.length})</span>
          </h3>
        </div>
        <div className="flex items-center gap-4">
          {isOpen ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
        </div>
      </div>

      {isOpen && (
        <div className="p-4">
          <div className="mb-4 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder={`Search ${title.toLowerCase()}...`}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-black text-sm focus:outline-none focus:ring-2 focus:ring-brand-yellow"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {filteredSitemaps.map((map) => (
              <div 
                key={map.filename} 
                className="flex items-center justify-between p-3 rounded-lg border border-gray-100 dark:border-gray-800 hover:border-brand-yellow/30 transition-all bg-gray-50/50 dark:bg-zinc-800/20"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <FileText className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <div className="flex flex-col overflow-hidden">
                    <span className="font-mono text-xs font-medium text-gray-700 dark:text-gray-300 truncate" title={map.filename}>
                      {map.filename}
                    </span>
                    <span className="text-[10px] text-gray-400">
                      {map.urlCount} URLs • Last Mod: {map.lastmod}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <a 
                    href={`/${map.filename}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors"
                    title="View XML"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      downloadFile(map.filename, map.content);
                    }}
                    className="p-2 text-gray-400 hover:text-brand-yellow hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded-md transition-colors"
                    title="Download XML"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
            
            {filteredSitemaps.length === 0 && (
              <div className="text-center py-8 text-gray-400 text-sm">
                No sitemaps found matching "{search}"
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SitemapCategorySection;