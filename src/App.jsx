import React, { useState, useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import FilterSidebar from './components/filters/FilterSidebar';
import InternshipList from './components/internships/InternshipList';
import ApplicationModal from './components/common/ApplicationModal';
import StatsGrid from './components/internships/StatsGrid';
import SearchBar from './components/internships/SearchBar';
import { getInternships } from './services/internshipService';
import { filterInternships, parseStipend } from './utils/filterUtils';
import { ChevronLeft } from 'lucide-react';
import ThemeToggle from './components/common/ThemeToggle';
import { useTheme } from './context/ThemeContext';

function App() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [view, setView] = useState('landing');
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeApplyInternship, setActiveApplyInternship] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;



  const [filters, setFilters] = useState({
    profile: [],
    location: '',
    duration: '',
    stipend: ''
  });

  useEffect(() => {
    const loadInternships = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getInternships();
        setInternships(data);
      } catch (err) {
        console.error('Failed to load internships:', err);
        setError('Failed to load internship listings. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    loadInternships();
  }, []);

  const handleFilterChange = (key, value) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  const handleClearFilters = () =>
    setFilters({ profile: [], location: '', duration: '', stipend: '' });

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, searchTerm]);

  const baseFiltered = filterInternships(internships, filters);

  const filteredInternships = React.useMemo(() => {
    if (!searchTerm.trim()) return baseFiltered;
    const query = searchTerm.toLowerCase().trim();
    return baseFiltered.filter(item => {
      const matchTitle = item.title?.toLowerCase().includes(query);
      const matchCompany = item.companyName?.toLowerCase().includes(query);
      const matchLocation = item.location?.toLowerCase().includes(query);
      const matchSkills = Array.isArray(item.skills) && item.skills.some(s => s.toLowerCase().includes(query));
      const matchDesc = item.description?.toLowerCase().includes(query);
      return matchTitle || matchCompany || matchLocation || matchSkills || matchDesc;
    });
  }, [baseFiltered, searchTerm]);

  const paginatedInternships = React.useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredInternships.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredInternships, currentPage]);

  const stats = React.useMemo(() => {
    const total = filteredInternships.length;
    
    const wfhCount = filteredInternships.filter(item => 
      item.isRemote || 
      item.location?.toLowerCase().includes('home') || 
      item.location?.toLowerCase().includes('remote')
    ).length;
    
    let totalStipendNum = 0;
    let validStipendCount = 0;
    
    filteredInternships.forEach(item => {
      if (item.stipend && item.stipend !== "Unpaid") {
        const num = parseStipend(item.stipend);
        if (num > 0) {
          totalStipendNum += num;
          validStipendCount++;
        }
      }
    });
    
    const avgStipend = validStipendCount > 0 ? Math.round(totalStipendNum / validStipendCount) : 0;
    
    const uniqueCompanies = new Set(filteredInternships.map(item => item.companyName)).size;

    return {
      total,
      wfhCount,
      avgStipend: avgStipend > 0 ? `₹${avgStipend.toLocaleString()}/mo` : "Unpaid",
      uniqueCompanies
    };
  }, [filteredInternships]);

  const landingStats = React.useMemo(() => {
    const total = internships.length;
    const wfhCount = internships.filter(item => 
      item.isRemote || 
      item.location?.toLowerCase().includes('home') || 
      item.location?.toLowerCase().includes('remote')
    ).length;
    const uniqueCompanies = new Set(internships.map(item => item.companyName)).size;

    return {
      total,
      wfhCount,
      uniqueCompanies
    };
  }, [internships]);

  if (view === 'landing') {
    return <LandingPage onExplore={() => setView('dashboard')} stats={landingStats} />;
  }

  return (
    <div className={`min-h-screen relative bg-grid-pattern flex flex-col font-sans antialiased transition-colors duration-300 ${
      isDark ? 'bg-[#080B11] text-[#E2E8F0]' : 'bg-[#F4F6FA] text-gray-900'
    }`}>


      <div className="sticky top-0 z-50 w-full">
        <header className={`mx-auto flex items-center justify-between max-w-full w-full px-4 sm:px-8 md:px-10 py-3.5 sm:py-5 backdrop-blur-md border-b ${
          isDark ? 'bg-[#080B11]/90 border-white/[0.04]' : 'bg-[#F4F6FA]/95 border-black/[0.06]'
        }`}>
          <div onClick={() => setView('landing')} className="flex items-center gap-1.5 sm:gap-2 cursor-pointer select-none">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#007AFF] flex items-center justify-center shadow-md">
              <span className="text-white text-[10px] sm:text-xs font-black">IS</span>
            </div>
            <span className={`text-base sm:text-lg font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Intern<span className="text-[#007AFF]">Search</span>
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <button
              onClick={() => setView('landing')}
              className={`flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-2 border rounded-full text-xs font-semibold transition-all duration-200 shrink-0 ${
                isDark
                  ? 'bg-white/5 hover:bg-white/10 border-white/10 text-gray-300 hover:text-white'
                  : 'bg-black/5 hover:bg-black/10 border-black/10 text-gray-700 hover:text-gray-900'
              }`}
            >
              <ChevronLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Back to Home</span>
              <span className="inline sm:hidden">Home</span>
            </button>
          </div>
        </header>
      </div>

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-4 sm:py-8 relative z-10">
        <div className="grid grid-cols-12 gap-4 sm:gap-6">
          <div className="col-span-12 lg:col-span-3 lg:sticky lg:top-[100px] lg:self-start">
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              isDark={isDark}
              internships={internships}
            />
          </div>
          <div className="col-span-12 lg:col-span-9 space-y-4 sm:space-y-6">
            {!loading && !error && filteredInternships.length > 0 && (
              <StatsGrid stats={stats} />
            )}

            {!loading && !error && internships.length > 0 && (
              <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            )}

            <InternshipList
              internships={paginatedInternships}
              totalItems={filteredInternships.length}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              loading={loading}
              error={error}
              isDark={isDark}
              onApply={(item) => setActiveApplyInternship(item)}
            />
          </div>
        </div>
      </main>

      {activeApplyInternship && (
        <ApplicationModal
          internship={activeApplyInternship}
          internships={internships}
          isDark={isDark}
          onClose={() => setActiveApplyInternship(null)}
        />
      )}

      <footer className={`border-t py-6 text-center text-xs relative z-10 ${
        isDark
          ? 'bg-gray-950/40 border-white/[0.04] text-gray-500'
          : 'bg-white/60 border-black/[0.06] text-gray-400'
      }`}>
        &copy; {new Date().getFullYear()} InternSearch Platform. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
