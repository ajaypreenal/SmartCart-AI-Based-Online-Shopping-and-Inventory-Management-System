import { Activity, Code, Cpu } from "lucide-react";

export default function DAAStats({ stats }) {
  if (!stats) return null;

  return (
    <div className="max-w-3xl mx-auto mt-6 glass-panel rounded-2xl p-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
      <div className="flex items-center gap-3 mb-4 border-b border-primary-200 dark:border-primary-800/50 pb-3">
        <Activity className="w-5 h-5 text-accent-500" />
        <h3 className="font-bold text-lg">DAA Search Analysis</h3>
      </div>
      
      <p className="text-sm text-text-muted dark:text-dark-text-muted mb-5">
        {stats.note}
      </p>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-4 border border-primary-100 dark:border-primary-800/50">
          <div className="flex items-center gap-2 mb-2">
            <Cpu className="w-4 h-4 text-primary-500" />
            <span className="font-semibold text-sm">Linear Search <span className="text-text-muted font-normal">O(n)</span></span>
          </div>
          <p className="text-2xl font-black text-primary-700 dark:text-primary-400">
            {stats.linear} <span className="text-sm font-medium text-text-muted">checks</span>
          </p>
        </div>
        
        <div className="bg-accent-50 dark:bg-accent-900/20 rounded-xl p-4 border border-accent-100 dark:border-accent-800/50">
          <div className="flex items-center gap-2 mb-2">
            <Code className="w-4 h-4 text-accent-500" />
            <span className="font-semibold text-sm">Binary Search <span className="text-text-muted font-normal">O(log n)</span></span>
          </div>
          <p className="text-2xl font-black text-accent-700 dark:text-accent-400">
            {stats.binary} <span className="text-sm font-medium text-text-muted">checks</span>
          </p>
        </div>
      </div>
    </div>
  );
}
