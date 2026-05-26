import { Search, SlidersHorizontal } from "lucide-react";

export default function Controls({ search, setSearch, sort, setSort, handleSearch }) {
  return (
    <div className="glass-panel p-4 rounded-2xl max-w-3xl mx-auto flex flex-col sm:flex-row gap-4 relative z-20 -mt-10 animate-fade-in-up">
      <form onSubmit={handleSearch} className="flex-1 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-text-muted dark:text-dark-text-muted" />
        </div>
        <input
          type="text"
          placeholder="Search products (Linear vs Binary)..."
          className="block w-full pl-10 pr-3 py-3 rounded-xl bg-surface/50 dark:bg-dark-surface/50 border border-primary-200 dark:border-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all placeholder:text-text-muted/70 dark:placeholder:text-dark-text-muted/70"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          type="submit"
          className="absolute inset-y-1.5 right-1.5 bg-primary-600 hover:bg-primary-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors"
        >
          Search
        </button>
      </form>
      
      <div className="relative shrink-0">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SlidersHorizontal className="h-4 w-4 text-text-muted dark:text-dark-text-muted" />
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="block w-full sm:w-48 pl-9 pr-8 py-3 rounded-xl bg-surface/50 dark:bg-dark-surface/50 border border-primary-200 dark:border-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none cursor-pointer text-sm font-medium transition-all"
        >
          <option value="">Sort: Default</option>
          <option value="price">Price (Quick Sort)</option>
          <option value="rating">Rating (Merge Sort)</option>
        </select>
        {/* Custom select arrow */}
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <svg className="h-4 w-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </div>
      </div>
    </div>
  );
}
