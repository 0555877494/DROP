import { useState } from 'react';

interface Task {
  id: number;
  title: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  category: string;
  time: string;
}

const initialTasks: Task[] = [
  { id: 1, title: 'Review design mockups', completed: false, priority: 'high', category: 'Work', time: '09:00' },
  { id: 2, title: 'Morning meditation', completed: true, priority: 'medium', category: 'Health', time: '07:00' },
  { id: 3, title: 'Reply to emails', completed: false, priority: 'medium', category: 'Work', time: '10:00' },
  { id: 4, title: 'Grocery shopping', completed: false, priority: 'low', category: 'Personal', time: '17:00' },
  { id: 5, title: 'Read 30 pages', completed: true, priority: 'low', category: 'Personal', time: '21:00' },
  { id: 6, title: 'Team sync meeting', completed: false, priority: 'high', category: 'Work', time: '14:00' },
  { id: 7, title: 'Evening workout', completed: false, priority: 'medium', category: 'Health', time: '18:30' },
];

const categories = ['All', 'Work', 'Health', 'Personal'];

export default function TasksScreen() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activeFilter, setActiveFilter] = useState('All');
  const [showCompleted, setShowCompleted] = useState(true);

  const toggleTask = (id: number) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const filteredTasks = tasks.filter(t => {
    if (activeFilter !== 'All' && t.category !== activeFilter) return false;
    if (!showCompleted && t.completed) return false;
    return true;
  });

  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-400';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'low': return 'bg-green-500/20 text-green-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="h-full overflow-y-auto no-scrollbar px-5 pt-4 pb-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Tasks</h1>
          <p className="text-gray-400 text-sm">{completedCount}/{totalCount} completed</p>
        </div>
        <button className="w-10 h-10 rounded-full bg-violet-500/20 flex items-center justify-center active:scale-95 transition-transform">
          <i className="fa-solid fa-plus text-violet-400" />
        </button>
      </div>

      {/* Progress Ring */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-24 h-24">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
            <circle
              cx="50" cy="50" r="42" fill="none"
              stroke="url(#gradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${(completedCount / totalCount) * 264} 264`}
              className="transition-all duration-700"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-bold">{Math.round((completedCount / totalCount) * 100)}%</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar pb-1">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
              activeFilter === cat
                ? 'bg-violet-500 text-white'
                : 'bg-gray-800/80 text-gray-400 border border-white/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Toggle completed */}
      <div className="flex items-center justify-between mb-4 px-1">
        <span className="text-sm text-gray-400">Show completed</span>
        <button
          onClick={() => setShowCompleted(!showCompleted)}
          className={`w-11 h-6 rounded-full transition-all duration-300 relative ${
            showCompleted ? 'bg-violet-500' : 'bg-gray-700'
          }`}
        >
          <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all duration-300 shadow-md ${
            showCompleted ? 'left-[22px]' : 'left-0.5'
          }`} />
        </button>
      </div>

      {/* Task List */}
      <div className="space-y-2">
        {filteredTasks.map((task, i) => (
          <div
            key={task.id}
            onClick={() => toggleTask(task.id)}
            className={`flex items-center gap-3 p-4 rounded-2xl border transition-all duration-300 active:scale-[0.98] cursor-pointer ${
              task.completed
                ? 'bg-gray-900/40 border-white/5 opacity-60'
                : 'bg-gray-900/80 border-white/5'
            }`}
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
              task.completed
                ? 'bg-violet-500 border-violet-500'
                : 'border-gray-600'
            }`}>
              {task.completed && <i className="fa-solid fa-check text-xs text-white" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium transition-all duration-300 ${
                task.completed ? 'line-through text-gray-500' : 'text-white'
              }`}>
                {task.title}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-gray-500">{task.time}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </span>
              </div>
            </div>
            <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded-lg">{task.category}</span>
          </div>
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <span className="text-4xl mb-3">🎉</span>
          <p className="text-gray-400 text-sm">All caught up!</p>
        </div>
      )}
    </div>
  );
}
