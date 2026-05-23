import React from 'react';
import InternshipCard from './InternshipCard';
import Loader from '../common/Loader';
import EmptyState from '../common/EmptyState';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const InternshipList = ({ 
  internships = [], 
  totalItems = 0, 
  currentPage = 1, 
  itemsPerPage = 5, 
  onPageChange, 
  loading, 
  error, 
  isDark, 
  onApply 
}) => {
  if (loading) return <Loader isDark={isDark} message="Fetching available internships..." />;

  if (error) {
    return (
      <div className={`px-5 py-4 rounded-xl text-center shadow-lg max-w-lg mx-auto my-8 border ${
        isDark
          ? 'bg-red-950/40 border-red-500/30 text-red-300'
          : 'bg-red-50 border-red-200 text-red-600'
      }`} role="alert">
        <strong className="font-bold text-lg block mb-1">Retrieval Error</strong>
        <span className="text-sm font-medium leading-relaxed">{error}</span>
      </div>
    );
  }

  if (!internships || internships.length === 0) return <EmptyState isDark={isDark} />;

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      const isActive = i === currentPage;
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`w-9 h-9 rounded-xl text-xs font-black transition-all duration-200 cursor-pointer ${
            isActive
              ? 'bg-gradient-to-r from-[#007AFF] to-[#00C7FF] text-white shadow-md shadow-blue-500/20'
              : isDark
                ? 'bg-slate-900 border border-white/5 hover:border-[#007AFF]/30 text-gray-400 hover:text-white'
                : 'bg-white border border-gray-200 hover:border-[#007AFF]/25 text-gray-600 hover:text-gray-900 shadow-sm'
          }`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="space-y-6">

      <div className="flex flex-col gap-4 animate-fade-in">
        {internships.map((internship) => (
          <InternshipCard key={internship.id} internship={internship} isDark={isDark} onApply={onApply} />
        ))}
      </div>


      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 select-none py-2 animate-fade-in border-t border-dashed border-gray-200 dark:border-white/5 pt-5">

          <span className={`text-xs font-semibold ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
            Showing <strong className={isDark ? 'text-gray-300' : 'text-gray-700'}>{(currentPage - 1) * itemsPerPage + 1}</strong> to <strong className={isDark ? 'text-gray-300' : 'text-gray-700'}>{Math.min(currentPage * itemsPerPage, totalItems)}</strong> of <strong className={isDark ? 'text-gray-300' : 'text-gray-700'}>{totalItems}</strong> positions
          </span>


          <div className="flex items-center gap-1.5">
            <button
              onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all duration-200 cursor-pointer ${
                currentPage === 1
                  ? 'opacity-40 cursor-not-allowed border-transparent text-gray-500'
                  : isDark
                    ? 'bg-slate-900 border-white/5 hover:border-[#007AFF]/30 text-gray-300 hover:text-white'
                    : 'bg-white border-gray-200 hover:border-[#007AFF]/25 text-gray-600 hover:text-gray-900 shadow-sm'
              }`}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {renderPageNumbers()}

            <button
              onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all duration-200 cursor-pointer ${
                currentPage === totalPages
                  ? 'opacity-40 cursor-not-allowed border-transparent text-gray-500'
                  : isDark
                    ? 'bg-slate-900 border-white/5 hover:border-[#007AFF]/30 text-gray-300 hover:text-white'
                    : 'bg-white border-gray-200 hover:border-[#007AFF]/25 text-gray-600 hover:text-gray-900 shadow-sm'
              }`}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InternshipList;
