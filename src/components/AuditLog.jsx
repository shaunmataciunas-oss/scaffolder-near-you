import React, { useState } from 'react';
import { format } from 'date-fns';
import { Download, History, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AuditLog = ({ logs = [], taskName }) => {
  const handleExportCSV = () => {
    const headers = ['Date', 'Action', 'Completed By', 'Notes'];
    const csvContent = [
      headers.join(','),
      ...logs.map(log => [
        format(new Date(log.completed_date), 'yyyy-MM-dd HH:mm'),
        `"${log.action}"`,
        `"${log.completed_by || 'Unknown'}"`,
        `"${log.notes || ''}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `audit_log_${taskName.replace(/\s+/g, '_')}_${format(new Date(), 'yyyyMMdd')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (logs.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <History className="w-12 h-12 mx-auto mb-2 opacity-20" />
        <p>No audit history available for this task.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <History className="w-5 h-5" />
          Audit History
        </h3>
        <Button variant="outline" size="sm" onClick={handleExportCSV}>
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 dark:bg-zinc-800 border-b dark:border-zinc-700">
            <tr>
              <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Date</th>
              <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Action</th>
              <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">User</th>
              <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-zinc-700">
            {logs.map((log) => (
              <tr key={log.id} className="bg-white dark:bg-zinc-900">
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400 whitespace-nowrap">
                  {format(new Date(log.completed_date), 'MMM d, yyyy HH:mm')}
                </td>
                <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-200">
                  {log.action}
                </td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                  <span className="flex items-center gap-1.5">
                    <User className="w-3 h-3" />
                    {log.completed_by ? log.completed_by.slice(0, 8) + '...' : 'System'}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400 truncate max-w-xs">
                  {log.notes || '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditLog;