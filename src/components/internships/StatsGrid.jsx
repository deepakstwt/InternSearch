import React from 'react';
import { Briefcase, Home, Banknote, Building2 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const StatsGrid = ({ stats }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  if (!stats) return null;

  const cardsData = [
    {
      label: 'Active Positions',
      value: stats.total,
      icon: Briefcase,
      colorClass: isDark ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600',
      hoverBorder: isDark ? 'hover:border-blue-500/35' : 'hover:border-blue-500/25',
    },
    {
      label: 'Remote Work',
      value: stats.wfhCount,
      icon: Home,
      colorClass: isDark ? 'bg-purple-500/10 text-purple-400' : 'bg-purple-50 text-purple-600',
      hoverBorder: isDark ? 'hover:border-purple-500/35' : 'hover:border-purple-500/25',
    },
    {
      label: 'Avg. Stipend',
      value: stats.avgStipend,
      icon: Banknote,
      colorClass: isDark ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-50 text-emerald-600',
      hoverBorder: isDark ? 'hover:border-emerald-500/35' : 'hover:border-emerald-500/25',
    },
    {
      label: 'Top Employers',
      value: stats.uniqueCompanies,
      icon: Building2,
      colorClass: isDark ? 'bg-amber-500/10 text-amber-400' : 'bg-amber-50 text-amber-600',
      hoverBorder: isDark ? 'hover:border-amber-500/35' : 'hover:border-amber-500/25',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 animate-fade-in select-none">
      {cardsData.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className={`p-4 rounded-2xl border flex items-center gap-3 transition-all duration-200 ${
              isDark
                ? `bg-slate-900 border-white/5 shadow-sm ${card.hoverBorder}`
                : `bg-white border-gray-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)] ${card.hoverBorder}`
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${card.colorClass}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <p className={`text-[9px] font-bold uppercase tracking-wider ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                {card.label}
              </p>
              <p className={`text-base font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-800'}`}>
                {card.value}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsGrid;
