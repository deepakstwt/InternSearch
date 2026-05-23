import React from 'react';
import { Search, X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const SearchBar = ({ searchTerm, onSearchChange }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`p-3 rounded-2xl border flex items-center gap-3 transition-all duration-200 ${
      isDark 
        ? 'bg-slate-900 border-white/5 focus-within:border-[#007AFF]/40 focus-within:shadow-[0_0_15px_rgba(0,122,255,0.06)]' 
        : 'bg-white border-gray-200/80 focus-within:border-[#007AFF]/35 focus-within:shadow-[0_4px_16px_rgba(0,0,0,0.02)] shadow-sm'
    }`}>
      <Search className={`h-5 w-5 shrink-0 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
      
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search by job title, company, skills, or location..."
        className={`w-full bg-transparent text-sm font-semibold outline-none border-none placeholder-gray-400 focus:ring-0 ${
          isDark ? 'text-white' : 'text-slate-800'
        }`}
      />

      {searchTerm && (
        <button
          onClick={() => onSearchChange('')}
          className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer text-gray-400 shrink-0"
        >
          <X className="h-4 w-4" />
        </button>
      )}

      <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-full text-[9px] font-black border uppercase tracking-wider bg-[#007AFF]/10 border-[#007AFF]/20 text-[#007AFF] select-none shrink-0">
        Search
      </span>
    </div>
  );
};

export default SearchBar;
