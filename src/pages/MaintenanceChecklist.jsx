import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { supabase } from '@/lib/customSupabaseClient';
import { format, addDays, isPast } from 'date-fns';
import { Search, Filter, Plus, AlertTriangle, CheckCircle, Clock, Calendar } from 'lucide-react';
import TaskCard from '@/components/TaskCard';
import { Button } from '@/components/ui/button';
import { useAnalytics } from '@/hooks/useAnalytics';

const MaintenanceChecklist = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showOverdueOnly, setShowOverdueOnly] = useState(false);
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    fetchTasks();
    trackEvent('view_maintenance_dashboard');
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('maintenance_tasks')
      .select('*')
      .order('due_date', { ascending: true });

    if (!error && data) {
      setTasks(data);
    }
    setLoading(false);
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.task_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = filterType === 'all' || task.task_type === filterType;
    const isOverdue = task.due_date && isPast(new Date(task.due_date)) && task.status !== 'completed';
    const matchesOverdue = !showOverdueOnly || isOverdue;

    return matchesSearch && matchesType && matchesOverdue;
  });

  const getStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'completed').length;
    const overdue = tasks.filter(t => t.due_date && isPast(new Date(t.due_date)) && t.status !== 'completed').length;
    const upcoming = tasks.filter(t => t.due_date && !isPast(new Date(t.due_date)) && new Date(t.due_date) <= addDays(new Date(), 30)).length;
    
    return {
      completionRate: total === 0 ? 0 : Math.round((completed / total) * 100),
      overdue,
      upcoming,
      lastAudit: tasks.map(t => t.last_completed).sort().reverse()[0]
    };
  };

  const stats = getStats();

  const sections = [
    { id: 'monthly', title: 'Monthly Tasks' },
    { id: 'quarterly', title: 'Quarterly Tasks' },
    { id: 'annual', title: 'Annual Tasks' }
  ];

  return (
    <>
      <Helmet>
        <title>Maintenance Checklist | Admin Dashboard</title>
      </Helmet>

      <div className="bg-gray-50 dark:bg-black min-h-screen pb-20 pt-24">
        <div className="container mx-auto px-4">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <h1 className="text-3xl font-bold font-montserrat text-gray-900 dark:text-white mb-2">
                Maintenance Checklist
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                Manage and track all system maintenance tasks and audits.
              </p>
            </div>
            <div className="flex gap-3">
              <Button onClick={() => fetchTasks()} variant="outline">Refresh</Button>
              {/* Add New Task button would go here in full implementation */}
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-gray-500">Completion Rate</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.completionRate}%</p>
            </div>
            
            <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg text-red-600">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-gray-500">Overdue Tasks</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.overdue}</p>
            </div>

            <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg text-yellow-600">
                  <Calendar className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-gray-500">Upcoming (30 Days)</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.upcoming}</p>
            </div>

            <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600">
                  <Clock className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-gray-500">Last Audit</span>
              </div>
              <p className="text-sm font-bold text-gray-900 dark:text-white pt-1">
                {stats.lastAudit ? format(new Date(stats.lastAudit), 'MMM d, yyyy') : 'No history'}
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm mb-8 flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-grow w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-black focus:ring-2 focus:ring-brand-yellow outline-none"
              />
            </div>
            
            <div className="flex gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-black outline-none cursor-pointer"
              >
                <option value="all">All Types</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="annual">Annual</option>
              </select>

              <label className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer bg-white dark:bg-black select-none whitespace-nowrap">
                <input 
                  type="checkbox" 
                  checked={showOverdueOnly} 
                  onChange={(e) => setShowOverdueOnly(e.target.checked)}
                  className="rounded text-brand-yellow focus:ring-brand-yellow" 
                />
                <span className="text-sm font-medium">Overdue Only</span>
              </label>
            </div>
          </div>

          {/* Task Lists */}
          <div className="space-y-8">
            {sections.map(section => {
              const sectionTasks = filteredTasks.filter(t => t.task_type === section.id);
              if (sectionTasks.length === 0 && filterType === 'all' && !searchQuery) return null;
              if (sectionTasks.length === 0 && (filterType === section.id || filterType === 'all')) {
                  return (
                     <div key={section.id} className="opacity-50">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 pl-2 border-l-4 border-brand-yellow">
                          {section.title}
                        </h2>
                        <p className="text-gray-500 italic">No tasks found.</p>
                     </div>
                  )
              }
              if (sectionTasks.length === 0) return null;

              return (
                <div key={section.id}>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 pl-2 border-l-4 border-brand-yellow">
                    {section.title}
                  </h2>
                  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {sectionTasks.map(task => (
                      <TaskCard key={task.id} task={task} onUpdate={fetchTasks} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </>
  );
};

export default MaintenanceChecklist;