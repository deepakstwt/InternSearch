import React from 'react';

const Loader = ({ isDark, message = "Loading internships..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="relative flex items-center justify-center">
        <div className="absolute w-12 h-12 bg-[#007AFF]/20 rounded-full blur-md" />
        <div className={`animate-spin rounded-full h-12 w-12 border-4 border-t-[#007AFF] ${isDark ? 'border-white/5' : 'border-gray-200'}`} />
      </div>
      <p className="mt-5 text-[#007AFF] text-xs font-bold uppercase tracking-widest animate-pulse">
        {message}
      </p>
    </div>
  );
};

export default Loader;
