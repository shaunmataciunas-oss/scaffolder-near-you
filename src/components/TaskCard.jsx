import React, { useState } from 'react';
import { format, formatDistanceToNow, isPast } from 'date-fns';
import { Calendar, User, Clock, CheckCircle2, AlertCircle, PlayCircle, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TaskForm from './TaskForm';
import AuditLog from './AuditLog';
import { supabase } from '@/lib/customSupabaseClient';

const TaskCard = ({ task, onUpdate }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLogOpen, setIsLogOpen] = useState(false);
  const [logs, setLogs] = useState([]);
  const [loadingLogs, setLoadingLogs] = useState(false);

  const fetchLogs = async () => {
    if (isLogOpen) {
      setIsLogOpen(false);
      return;
    }

    setLoadingLogs(true);
    const { data } = await supabase
      .from('audit_logs')
      .select('*')
      .eq('task_id', task.id)
      .order('completed_date', { ascending: false });
    
    setLogs(data || []);
    setLoadingLogs(false);
    setIsLogOpen(true);
  };

  const statusColors = {
    not_started: 'bg-gray-100 text-gray-600 dark:bg-zinc-800 dark:text-gray-400',
    in_progress: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    completed: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
  };

  const statusIcons = {
    not_started: AlertCircle,
    in_progress: PlayCircle,
    completed: CheckCircle2
  };

  const StatusIcon = statusIcons[task.status];
  const isOverdue = task.due_date && isPast(new Date(task.due_date)) && task.status !== 'completed';

  return (
    <>
      <div className={`bg-white dark:bg-zinc-900 rounded-xl border p-5 transition-all ${
        isOverdue 
          ? 'border-red-200 dark:border-red-900/50 shadow-sm' 
          : 'border-gray-200 dark:border-gray-800 hover:border-brand-yellow/50'
      }`}>
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold flex items-center gap-1.5 ${statusColors[task.status]}`}>
                <StatusIcon className="w-3.5 h-3.5" />
                {task.status.replace('_', ' ').toUpperCase()}
              </span>
              {isOverdue && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 flex items-center gap-1">
                  OVERDUE
                </span>
              )}
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white font-montserrat">
              {task.task_name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
              {task.description}
            </p>
          </div>
          
          <Button 
            size="sm" 
            variant="outline"
            className="shrink-0 ml-4 hover:bg-brand-yellow hover:text-black border-gray-300 dark:border-gray-700"
            onClick={() => setIsFormOpen(true)}
          >
            Update
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm mb-4">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <Calendar className="w-4 h-4 text-brand-yellow" />
            <span>Due: {task.due_date ? format(new Date(task.due_date), 'MMM d, yyyy') : 'No date'}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <User className="w-4 h-4 text-brand-yellow" />
            <span>{task.assigned_to || 'Unassigned'}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 col-span-2">
            <Clock className="w-4 h-4 text-brand-yellow" />
            <span>
              Last completed: {task.last_completed 
                ? formatDistanceToNow(new Date(task.last_completed), { addSuffix: true })
                : 'Never'}
            </span>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
          <button 
            onClick={fetchLogs}
            className="text-xs font-medium text-gray-500 hover:text-brand-yellow flex items-center gap-1 transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            {isLogOpen ? 'Hide History' : 'View History'}
          </button>
          
          {task.location_slug && (
            <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-gray-500">
              {task.location_slug}
            </span>
          )}
        </div>

        {isLogOpen && (
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 animate-in slide-in-from-top-2">
            {loadingLogs ? (
              <p className="text-center text-xs text-gray-500 py-4">Loading logs...</p>
            ) : (
              <AuditLog logs={logs} taskName={task.task_name} />
            )}
          </div>
        )}
      </div>

      {isFormOpen && (
        <TaskForm 
          task={task} 
          onClose={() => setIsFormOpen(false)} 
          onUpdate={onUpdate}
        />
      )}
    </>
  );
};

export default TaskCard;