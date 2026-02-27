import React from 'react';
import { formatDate } from '@/utils/sitemapGenerator'; // Using V1 util for simple date format
import { CheckCircle2, AlertTriangle, FileText, RefreshCw, BarChart3, Globe } from 'lucide-react';

const SitemapStatusWidget = ({ stats, lastUpdated }) => {
  const isHealthy = stats.totalUrls > 0;
  
  return (
    <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="font-bold text-lg text-gray-900 dark:text-white">Sitemap Health</h3>
          <p className="text-sm text-gray-500">Live Generation Status</p>
        </div>
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${
          isHealthy 
            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
            : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
        }`}>
          {isHealthy ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
          {isHealthy ? 'Healthy' : 'Needs Generation'}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-gray-50 dark:bg-zinc-800/50 rounded-lg">
          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stats.totalUrls.toLocaleString()}</div>
          <div className="text-xs text-gray-500 uppercase font-semibold flex items-center gap-1">
            <Globe className="w-3 h-3" /> Indexed URLs
          </div>
        </div>
        <div className="p-4 bg-gray-50 dark:bg-zinc-800/50 rounded-lg">
          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stats.totalSitemaps}</div>
          <div className="text-xs text-gray-500 uppercase font-semibold flex items-center gap-1">
            <FileText className="w-3 h-3" /> Files
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center text-sm">
          <span className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            Main Pages
          </span>
          <span className="font-mono font-bold">{stats.mainCount || 0}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
             <div className="w-2 h-2 rounded-full bg-purple-500"></div>
            City Sitemaps
          </span>
          <span className="font-mono font-bold">{stats.cityCount || 0}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <div className="w-2 h-2 rounded-full bg-brand-yellow"></div>
            Town Sitemaps
          </span>
          <span className="font-mono font-bold">{stats.townCount || 0}</span>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
        <div className="text-xs text-gray-400">
           Last Generated:
        </div>
        <div className="text-xs font-mono text-gray-600 dark:text-gray-300">
          {lastUpdated ? formatDate(lastUpdated) : 'Never'}
        </div>
      </div>
    </div>
  );
};

export default SitemapStatusWidget;