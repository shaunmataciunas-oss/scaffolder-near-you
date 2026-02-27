import React, { useState } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';
import { Button } from '@/components/ui/button';
import { X, CheckCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const TaskForm = ({ task, onClose, onUpdate }) => {
  const { user } = useSupabaseAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(task.status);
  const [assignedTo, setAssignedTo] = useState(task.assigned_to || '');
  const [notes, setNotes] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const now = new Date().toISOString();
      const action = status === 'completed' ? 'Completed Task' : `Updated status to ${status}`;

      // 1. Update task
      const { error: taskError } = await supabase
        .from('maintenance_tasks')
        .update({
          status,
          assigned_to: assignedTo,
          last_completed: status === 'completed' ? now : task.last_completed,
          notes: notes ? `${task.notes || ''}\n[${now}] ${notes}` : task.notes,
          updated_at: now
        })
        .eq('id', task.id);

      if (taskError) throw taskError;

      // 2. Create audit log
      const { error: logError } = await supabase
        .from('audit_logs')
        .insert({
          task_id: task.id,
          action: action,
          completed_by: user?.id,
          completed_date: now,
          notes: notes
        });

      if (logError) throw logError;

      toast({
        title: "Task Updated",
        description: "Maintenance task has been updated successfully.",
      });

      onUpdate();
      onClose();
    } catch (error) {
      console.error('Error updating task:', error);
      toast({
        title: "Error",
        description: "Failed to update task. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl w-full max-w-lg border border-gray-200 dark:border-gray-800">
        <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-800">
          <h3 className="text-xl font-bold font-montserrat text-gray-900 dark:text-white">
            Update Task: {task.task_name}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
            <div className="grid grid-cols-3 gap-3">
              {['not_started', 'in_progress', 'completed'].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStatus(s)}
                  className={`py-2 px-4 rounded-lg text-sm font-medium border transition-all ${
                    status === s
                      ? 'bg-brand-yellow text-brand-black border-brand-yellow'
                      : 'bg-gray-50 dark:bg-zinc-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-brand-yellow/50'
                  }`}
                >
                  {s.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Assigned To</label>
            <input
              type="text"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              placeholder="Enter name or email"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-black focus:ring-2 focus:ring-brand-yellow outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Notes / Comments</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add details about the work done..."
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-black focus:ring-2 focus:ring-brand-yellow outline-none min-h-[100px]"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-brand-yellow text-brand-black hover:bg-yellow-400"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;