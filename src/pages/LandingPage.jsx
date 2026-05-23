import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Smartphone, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import ThemeToggle from '../components/common/ThemeToggle';
import { useTheme } from '../context/ThemeContext';

const LandingPage = ({ onExplore, stats }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`min-h-screen relative font-sans antialiased bg-grid-pattern flex flex-col transition-colors duration-300 ${
      isDark ? 'bg-[#080B11]' : 'bg-[#F4F6FA]'
    }`}>


      <div className="sticky top-0 z-50 w-full transition-all duration-300">
        <header className={scrolled
          ? `mx-auto flex justify-between items-center max-w-4xl w-[92%] sm:w-[90%] px-5 sm:px-6 py-2.5 mt-3 sm:mt-4 rounded-full border shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-md transition-all duration-300 ${
              isDark 
                ? 'bg-slate-950/80 border-white/10 shadow-black/40 text-white' 
                : 'bg-white/85 border-gray-200/80 text-gray-900'
            }`
          : `mx-auto flex justify-between items-center max-w-full w-full px-4 sm:px-8 md:px-10 py-4 sm:py-5 border-b backdrop-blur-md transition-all duration-300 ${
              isDark 
                ? 'bg-[#080B11]/90 border-white/[0.04] text-white' 
                : 'bg-[#F4F6FA]/90 border-black/[0.06] text-gray-900'
            }`
        }>
          <div className="flex items-center gap-1.5 sm:gap-2 cursor-pointer select-none" onClick={onExplore}>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#007AFF] flex items-center justify-center shadow-md">
              <span className="text-white text-[10px] sm:text-xs font-black">IS</span>
            </div>
            <span className={`text-base sm:text-xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Intern<span className="text-[#007AFF]">Search</span>
            </span>
          </div>


          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <button 
              onClick={onExplore}
              className={`group flex items-center gap-1 sm:gap-1.5 px-3.5 sm:px-5 py-2 sm:py-2.5 border rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 shrink-0 ${
                isDark 
                  ? 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20 text-white'
                  : 'bg-black/5 hover:bg-black/10 border-black/10 hover:border-black/20 text-gray-800'
              }`}
            >
              <span className="hidden sm:inline">Go to Dashboard</span>
              <span className="inline sm:hidden">Explore</span>
              <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </header>
      </div>


      <main className="flex-grow relative z-10">
        
        <section className="max-w-5xl mx-auto px-6 pt-12 md:pt-16 pb-8 md:pb-12 text-center flex flex-col items-center">
          

          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#007AFF] bg-[#007AFF]/10 border border-[#007AFF]/20 rounded-full px-4 py-1.5 uppercase tracking-widest mb-8 select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-[#007AFF] animate-pulse" />
            <span>Live Internship Dashboard</span>
          </div>


          <h1 className={`text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.05] max-w-4xl font-sans ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Find your next <br />
            <span className="relative">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#007AFF] via-[#00C7FF] to-[#0051C6] drop-shadow-sm pr-2 pb-1.5">
                internship.
              </span>
              <span className="absolute bottom-1 left-0 w-full h-[6px] bg-gradient-to-r from-[#007AFF] to-[#00C7FF] opacity-40 blur-[1px] rounded-full" />
            </span>
          </h1>

          <p className={`mt-8 text-base sm:text-lg leading-relaxed max-w-2xl font-medium ${
            isDark ? 'text-[#94A3B8]' : 'text-gray-500'
          }`}>
            Search hundreds of real internship listings. Filter instantly by profile, location, stipend, and duration to find the perfect role for you.
          </p>


          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md">
            

            <button 
              onClick={onExplore}
              className="w-full sm:w-auto px-8 py-4 bg-[#007AFF] hover:bg-[#0066D6] text-white font-extrabold rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
            >
              <span>Explore Internships</span>
              <ChevronRight className="h-4.5 w-4.5 stroke-[2.5]" />
            </button>


            <a 
              href="#features"
              className={`w-full sm:w-auto px-6 py-4 border font-bold text-sm rounded-2xl transition-all duration-200 flex items-center justify-center gap-1.5 whitespace-nowrap ${
                isDark
                  ? 'bg-white/5 hover:bg-white/10 border-white/10 text-white'
                  : 'bg-black/5 hover:bg-black/10 border-black/10 text-gray-700'
              }`}
            >
              <span>Learn more</span>
              <ChevronRight className="h-4 w-4" />
            </a>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 py-3 md:py-4">
          <div className={`rounded-2xl border p-8 md:p-10 shadow-md relative overflow-hidden ${
            isDark ? 'bg-slate-900/70 border-white/5' : 'bg-white border-gray-200/80'
          }`}>
            
            <div className="flex flex-row items-center justify-between relative z-10">
              

              <div className="flex flex-col items-center flex-1 text-center">
                <span className={`text-2xl xs:text-3xl sm:text-5xl font-black bg-clip-text text-transparent tracking-tight ${isDark ? 'bg-gradient-to-r from-white via-slate-100 to-slate-300' : 'bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500'}`}>
                  {stats?.total || 0}
                </span>
                <span className={`text-[8px] xs:text-[10px] sm:text-[11px] font-bold uppercase tracking-widest mt-1.5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Active Roles</span>
              </div>


              <div className={`w-[1px] h-8 sm:h-12 self-center ${isDark ? 'bg-white/10' : 'bg-gray-200'}`} />


              <div className="flex flex-col items-center flex-1 text-center">
                <span className={`text-2xl xs:text-3xl sm:text-5xl font-black bg-clip-text text-transparent tracking-tight ${isDark ? 'bg-gradient-to-r from-white via-slate-100 to-slate-300' : 'bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500'}`}>
                  {stats?.wfhCount || 0}
                </span>
                <span className={`text-[8px] xs:text-[10px] sm:text-[11px] font-bold uppercase tracking-widest mt-1.5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Work From Home</span>
              </div>


              <div className={`w-[1px] h-8 sm:h-12 self-center ${isDark ? 'bg-white/10' : 'bg-gray-200'}`} />

              <div className="flex flex-col items-center flex-1 text-center">
                <span className={`text-2xl xs:text-3xl sm:text-5xl font-black bg-clip-text text-transparent tracking-tight ${
                  isDark 
                    ? 'bg-gradient-to-r from-white via-slate-100 to-slate-300'
                    : 'bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500'
                }`}>
                  {stats?.uniqueCompanies || 0}
                </span>
                <span className={`text-[8px] xs:text-[10px] sm:text-[11px] font-bold uppercase tracking-widest mt-1.5 ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`}>Hiring Brands</span>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="max-w-5xl mx-auto px-6 py-12 md:py-16 relative">
          
          <div className="text-center mb-8 md:mb-10 flex flex-col items-center">
            <h2 className={`text-3xl sm:text-5xl font-black tracking-tight max-w-xl ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Features
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#007AFF] to-[#00C7FF] mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            

            <div className="glass-card glass-card-hover rounded-2xl p-8 relative flex flex-col items-start transition-all duration-300 group overflow-hidden">
              
              <div className="w-12 h-12 bg-[#007AFF]/10 text-[#007AFF] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Filter className="h-6 w-6 stroke-[2]" />
              </div>
              
              <h3 className={`text-lg font-bold tracking-tight flex items-center gap-1.5 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                <span>Instant Filters</span>
              </h3>
              
              <p className={`mt-3 text-sm font-medium leading-relaxed ${
                isDark ? 'text-[#94A3B8]' : 'text-gray-500'
              }`}>
                Filter internships instantly. Narrow down roles by profile type, location, duration, and stipend to find exactly what you want.
              </p>
            </div>


            <div className="glass-card glass-card-hover rounded-2xl p-8 relative flex flex-col items-start transition-all duration-300 group overflow-hidden">

              <div className="w-12 h-12 bg-[#00C7FF]/10 text-[#00C7FF] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <ShieldCheck className="h-6 w-6 stroke-[2]" />
              </div>
              
              <h3 className={`text-lg font-bold tracking-tight ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Live Postings
              </h3>
              
              <p className={`mt-3 text-sm font-medium leading-relaxed ${
                isDark ? 'text-[#94A3B8]' : 'text-gray-500'
              }`}>
                Get live listings directly from the source. The dashboard syncs in real-time, with offline fallbacks in case of network issues.
              </p>
            </div>


            <div className="glass-card glass-card-hover rounded-2xl p-8 relative flex flex-col items-start transition-all duration-300 group overflow-hidden">

              <div className="w-12 h-12 bg-[#0051C6]/10 text-[#0051C6] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Smartphone className="h-6 w-6 stroke-[2]" />
              </div>
              
              <h3 className={`text-lg font-bold tracking-tight ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Fully Responsive
              </h3>
              
              <p className={`mt-3 text-sm font-medium leading-relaxed ${
                isDark ? 'text-[#94A3B8]' : 'text-gray-500'
              }`}>
                Works on all devices. View search results cleanly whether you are browsing on your desktop computer, tablet, or mobile phone.
              </p>
            </div>
          </div>
        </section>

      </main>


      <footer className={`border-t py-6 md:py-8 relative z-10 ${
        isDark ? 'bg-gray-950/60 border-white/[0.05]' : 'bg-white/60 border-black/[0.06]'
      }`}>
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className={`text-sm font-extrabold tracking-tight ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Intern<span className="text-[#007AFF]">Search</span>
          </span>
          <span className="text-xs text-gray-500 font-medium">
            &copy; {new Date().getFullYear()} InternSearch Platform. All rights reserved.
          </span>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

