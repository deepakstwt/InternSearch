import React from 'react';
import { Filter, RotateCcw, X, Check } from 'lucide-react';

const FilterSidebar = ({ filters, onFilterChange, onClearFilters, isDark, internships = [] }) => {
  const { profile = [], location, duration, stipend } = filters;

  const [profileSearch, setProfileSearch] = React.useState('');
  const [showProfileDropdown, setShowProfileDropdown] = React.useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = React.useState(false);

  const profileContainerRef = React.useRef(null);
  const locationContainerRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileContainerRef.current && !profileContainerRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
      if (locationContainerRef.current && !locationContainerRef.current.contains(event.target)) {
        setShowLocationDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const uniqueProfiles = React.useMemo(() => {
    return [
      "ReactJS Developer",
      "Frontend Developer",
      "Backend Developer",
      "Full Stack Developer",
      "Python Developer",
      "Graphic Designer",
      "Business Development",
      "Content Writing",
      "SEO Specialist",
      "Social Media Marketing",
      "Financial Analyst"
    ].sort();
  }, []);

  const uniqueLocations = React.useMemo(() => {
    if (!Array.isArray(internships) || internships.length === 0) return [];
    const set = new Set();
    internships.forEach(item => {
      if (item.location) {
        item.location.split(',').forEach(loc => {
          const cleanLoc = loc.trim();
          if (cleanLoc && cleanLoc.length > 1) {
            set.add(cleanLoc);
          }
        });
      }
    });
    return Array.from(set).sort();
  }, [internships]);

  const filteredProfiles = React.useMemo(() => {
    const query = profileSearch.trim().toLowerCase();
    if (!query) return uniqueProfiles.slice(0, 12);
    return uniqueProfiles.filter(p => 
      p.toLowerCase().includes(query)
    ).slice(0, 12);
  }, [profileSearch, uniqueProfiles]);

  const filteredLocations = React.useMemo(() => {
    if (!location) return uniqueLocations.slice(0, 12);
    return uniqueLocations.filter(l => 
      l.toLowerCase().includes(location.toLowerCase())
    ).slice(0, 12);
  }, [location, uniqueLocations]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(name, value);
  };

  const card = isDark
    ? 'bg-slate-900 border-white/5 shadow-md'
    : 'bg-white border-gray-200/80 shadow-[0_2px_16px_rgba(0,0,0,0.03)]';

  const divider = isDark ? 'border-white/10' : 'border-gray-200';

  const label = isDark ? 'text-slate-400' : 'text-gray-400';

  const input = isDark
    ? 'bg-slate-900/50 border-white/10 focus:border-[#007AFF]/50 text-white placeholder-slate-500'
    : 'bg-gray-100 border-gray-200 focus:border-[#007AFF]/50 text-gray-800 placeholder-gray-400';

  return (
    <aside className={`rounded-2xl p-7 flex flex-col gap-7 relative border transition-colors duration-300 min-h-[580px] ${card}`}>



      <div className={`flex items-center justify-between pb-4 border-b ${divider}`}>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-[#007AFF]" />
          <h2 className={`font-extrabold text-base tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>Filters</h2>
        </div>
        <button
          onClick={onClearFilters}
          className={`flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-colors duration-200 ${
            isDark ? 'text-gray-500 hover:text-red-400' : 'text-gray-400 hover:text-red-500'
          }`}
          title="Clear all filters"
        >
          <RotateCcw className="h-3 w-3" />
          <span>Clear all</span>
        </button>
      </div>


      <div className="flex flex-col gap-1.5 relative" ref={profileContainerRef}>
        <label htmlFor="profile" className={`text-[10px] font-bold uppercase tracking-widest ${label}`}>Profile / Skill</label>
        <input
          type="text" 
          id="profile" 
          name="profile" 
          value={profileSearch}
          onChange={(e) => setProfileSearch(e.target.value)}
          onFocus={() => setShowProfileDropdown(true)}
          placeholder={profile.length > 0 ? "Add another profile..." : "e.g. React, Python"}
          autoComplete="off"
          className={`w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none transition-all duration-200 border ${input}`}
        />


        {profile.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-1.5 max-h-24 overflow-y-auto pr-1">
            {profile.map((p, idx) => (
              <span
                key={idx}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all duration-150 ${
                  isDark
                    ? 'bg-[#007AFF]/20 text-[#00C7FF] border border-[#007AFF]/30 hover:bg-[#007AFF]/30'
                    : 'bg-[#007AFF]/10 text-[#007AFF] border border-[#007AFF]/15 hover:bg-[#007AFF]/25'
                }`}
              >
                <span>{p}</span>
                <button
                  type="button"
                  onClick={() => onFilterChange('profile', profile.filter(item => item !== p))}
                  className="hover:text-red-500 hover:scale-110 active:scale-95 transition-all cursor-pointer p-0.5"
                  title={`Remove ${p}`}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </span>
            ))}
          </div>
        )}

        {showProfileDropdown && filteredProfiles.length > 0 && (
          <div className={`absolute top-[calc(100%+4px)] left-0 w-full rounded-xl border shadow-2xl z-50 max-h-56 overflow-y-auto ${
            isDark 
              ? 'bg-[#151B2A] border-white/10 text-white' 
              : 'bg-white border-gray-200 text-gray-800'
          }`}>
            <div className="py-1">
              {filteredProfiles.map((p, idx) => {
                const isSelected = profile.includes(p);
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      if (isSelected) {
                        onFilterChange('profile', profile.filter(item => item !== p));
                      } else {
                        onFilterChange('profile', [...profile, p]);
                      }
                      setProfileSearch('');
                    }}
                    className={`w-full text-left px-4 py-2.5 text-xs sm:text-sm font-semibold transition-colors cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? isDark
                          ? 'bg-[#007AFF]/20 text-[#00C7FF]'
                          : 'bg-[#007AFF]/10 text-[#007AFF]'
                        : isDark
                          ? 'hover:bg-white/5 text-slate-300 hover:text-[#007AFF]'
                          : 'hover:bg-gray-100 text-gray-700 hover:text-[#007AFF]'
                    }`}
                  >
                    <span>{p}</span>
                    {isSelected && <Check className="h-4 w-4 stroke-[3]" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>


      <div className="flex flex-col gap-1.5 relative" ref={locationContainerRef}>
        <label htmlFor="location" className={`text-[10px] font-bold uppercase tracking-widest ${label}`}>Location</label>
        <input
          type="text" id="location" name="location" value={location}
          onChange={handleInputChange}
          onFocus={() => setShowLocationDropdown(true)}
          placeholder="e.g. Delhi, WFH"
          autoComplete="off"
          className={`w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none transition-all duration-200 border ${input}`}
        />

        {showLocationDropdown && filteredLocations.length > 0 && (
          <div className={`absolute top-[calc(100%+4px)] left-0 w-full rounded-xl border shadow-2xl z-50 max-h-56 overflow-y-auto ${
            isDark 
              ? 'bg-[#151B2A] border-white/10 text-white' 
              : 'bg-white border-gray-200 text-gray-800'
          }`}>
            <div className="py-1">
              {filteredLocations.map((l, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    onFilterChange('location', l);
                    setShowLocationDropdown(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                    isDark 
                      ? 'hover:bg-white/5 text-slate-300 hover:text-[#007AFF]' 
                      : 'hover:bg-gray-100 text-gray-700 hover:text-[#007AFF]'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>


      <div className="flex flex-col gap-1.5">
        <label htmlFor="duration" className={`text-[10px] font-bold uppercase tracking-widest ${label}`}>Duration (Months)</label>
        <select
          id="duration" name="duration" value={duration} onChange={handleInputChange}
          className={`w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none transition-all duration-200 cursor-pointer border ${input}`}
        >
          <option value="">Any Duration</option>
          <option value="2">2 Months</option>
          <option value="3">3 Months</option>
          <option value="4">4 Months</option>
          <option value="6">6 Months</option>
        </select>
      </div>


      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <label className={`text-[10px] font-bold uppercase tracking-widest ${label}`}>Desired Min Stipend (₹)</label>
          <span className={`text-xs font-black ${isDark ? 'text-[#00C7FF]' : 'text-[#007AFF]'}`}>
            {stipend && parseInt(stipend, 10) > 0 ? `₹ ${parseInt(stipend, 10).toLocaleString()}+` : ""}
          </span>
        </div>
        
        <div className="relative px-1 select-none">
          <input
            type="range"
            min="0"
            max="15000"
            step="1000"
            value={stipend || 0}
            onChange={(e) => {
              const val = parseInt(e.target.value, 10);
              onFilterChange('stipend', val === 0 ? '' : String(val));
            }}
            className="premium-slider"
            style={{
              background: `linear-gradient(to right, #007AFF 0%, #007AFF ${((stipend || 0) / 15000) * 100}%, ${isDark ? 'rgba(255, 255, 255, 0.08)' : '#E2E8F0'} ${((stipend || 0) / 15000) * 100}%, ${isDark ? 'rgba(255, 255, 255, 0.08)' : '#E2E8F0'} 100%)`
            }}
          />

          <div className="flex justify-between mt-1 px-0.5 text-[9px] font-black text-gray-400 dark:text-slate-500">
            <span>0</span>
            <span>3k</span>
            <span>6k</span>
            <span>9k</span>
            <span>12k</span>
            <span>15k</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
