import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={`
        relative w-14 h-7 rounded-full border transition-all duration-500 ease-in-out
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[#007AFF]/60 focus-visible:ring-offset-2
        ${isDark
          ? 'bg-[#007AFF]/20 border-[#007AFF]/30'
          : 'bg-amber-100 border-amber-300'
        }
      `}
    >
      <span
        className={`
          absolute inset-0 rounded-full transition-all duration-500
          ${isDark ? 'bg-[#007AFF]/10' : 'bg-amber-50'}
        `}
      />

      <span
        className={`
          absolute top-[3px] w-[22px] h-[22px] rounded-full flex items-center justify-center
          shadow-md transition-all duration-500 ease-in-out
          ${isDark
            ? 'left-[3px] bg-gray-900 shadow-blue-500/20'
            : 'left-[calc(100%-25px)] bg-white shadow-amber-500/30'
          }
        `}
      >
        {isDark ? (
          <Moon className="h-3.5 w-3.5 text-[#007AFF]" strokeWidth={2} />
        ) : (
          <Sun className="h-3.5 w-3.5 text-amber-500" strokeWidth={2} />
        )}
      </span>
    </button>
  );
};

export default ThemeToggle;
