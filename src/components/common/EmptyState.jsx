import React from 'react';
import { Search } from 'lucide-react';

const EmptyState = ({ isDark, title = "No Internships Found", message = "We couldn't find any listings matching your current filter selections. Try clearing some filters or searching for keywords." }) => {
  return (
    <div className={`rounded-3xl p-10 text-center flex flex-col items-center justify-center max-w-lg mx-auto my-8 border transition-colors duration-300 ${
      isDark
        ? 'bg-gray-900/70 border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.4)]'
        : 'bg-white border-gray-200 shadow-[0_2px_16px_rgba(0,0,0,0.06)]'
    }`}>
      <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-inner border ${
        isDark ? 'bg-slate-900/60 border-white/10' : 'bg-gray-100 border-gray-200'
      }`}>
        <Search className="h-8 w-8 stroke-[1.5] text-[#007AFF]" />
      </div>
      <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
      <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>{message}</p>
    </div>
  );
};

export default EmptyState;
