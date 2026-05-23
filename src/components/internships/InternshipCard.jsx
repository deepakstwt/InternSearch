import React, { useState } from 'react';
import { 
  MapPin, 
  Banknote, 
  Briefcase, 
  Clock, 
  Building2,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  FileText,
  Zap,
  Users,
  CalendarDays
} from 'lucide-react';
import { getInternshipDetail } from '../../services/internshipService';

const InternshipCard = ({ internship, isDark, onApply }) => {
  const { 
    id,
    title, 
    companyName = 'Hiring Company', 
    location, 
    duration, 
    stipend, 
    postedAt, 
    isRemote, 
    skills = [], 
    description 
  } = internship;

  const [isExpanded, setIsExpanded] = useState(false);
  const [detail, setDetail] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  const handleCardClick = async () => {
    // Real API listings open in the modal directly
    if (internship.isFromAPI) {
      try {
        setLoadingDetail(true);
        const res = await getInternshipDetail(id);
        if (onApply) {
          onApply(res || internship);
        }
      } catch (err) {
        console.error("Failed to load details for apply modal:", err);
      } finally {
        setLoadingDetail(false);
      }
      return;
    }

    // Mock fallback data uses standard inline expand
    const nextState = !isExpanded;
    setIsExpanded(nextState);

    if (nextState && !detail) {
      try {
        setLoadingDetail(true);
        const res = await getInternshipDetail(id);
        setDetail(res);
      } catch (err) {
        console.error("Failed to load live details:", err);
      } finally {
        setLoadingDetail(false);
      }
    }
  };


  const cardBg = isDark
    ? 'bg-slate-900 border-white/5 hover:border-[#007AFF]/35 shadow-sm'
    : 'bg-white border-gray-200/80 hover:border-[#007AFF]/25 shadow-[0_2px_12px_rgba(0,0,0,0.02)]';

  const titleColor = isDark ? 'text-white' : 'text-[#1E293B]';
  const companyColor = isDark ? 'text-[#94A3B8]' : 'text-[#64748B]';
  
  const badgeActivelyHiring = isDark
    ? 'bg-[#007AFF]/10 border-[#007AFF]/25 text-[#007AFF]'
    : 'bg-[#F0F6FF] border-[#B9D5FF] text-[#007AFF]';

  const avatarBox = isDark
    ? 'bg-slate-950 border-white/5 text-[#00C7FF]'
    : 'bg-[#F0F5FF] border-gray-100 text-[#007AFF]';

  const detailsColor = isDark ? 'text-[#94A3B8]' : 'text-[#475569]';
  const detailIconColor = isDark ? 'text-[#64748B]' : 'text-[#94A3B8]';

  const descColor = isDark ? 'text-[#94A3B8]' : 'text-[#475569]';
  const descBg = isDark ? 'bg-slate-950/20 border-white/5' : 'bg-gray-50/50 border-gray-100';

  const skillsColor = isDark ? 'text-[#64748B]' : 'text-[#94A3B8]';

  const badgePosted = isDark
    ? 'text-[#007AFF] bg-[#007AFF]/10 border-[#007AFF]/20'
    : 'text-[#007AFF] bg-[#F0F6FF] border-[#D6E4FF]';

  const badgeEarly = isDark
    ? 'text-amber-400 bg-amber-500/10 border-amber-500/20'
    : 'text-amber-700 bg-amber-50 border-amber-200';

  return (
    <div 
      onClick={handleCardClick}
      className={`
        rounded-2xl p-6 md:p-7 border relative overflow-hidden transition-all duration-200 cursor-pointer group flex flex-col justify-between
        ${cardBg}
      `}
    >


      {loadingDetail && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/10 backdrop-blur-[1px]">
          <div className="w-6 h-6 rounded-full border-2 border-[#007AFF]/20 border-t-[#007AFF] animate-spin" />
        </div>
      )}

      <div>
        <div className="flex justify-between items-start gap-4 mb-4 relative z-10">
          <div className="space-y-1.5">
            <h3 className={`text-lg md:text-xl font-bold tracking-tight transition-colors duration-200 group-hover:text-[#007AFF] ${titleColor}`}>
              {title}
            </h3>
            
            <div className="flex flex-wrap items-center gap-2">
              <span className={`text-sm font-semibold ${companyColor}`}>{companyName}</span>
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold border uppercase tracking-widest ${badgeActivelyHiring}`}>
                Actively hiring
              </span>
            </div>
          </div>

          <div className={`w-11 h-11 rounded-xl border flex items-center justify-center font-bold text-lg shrink-0 select-none shadow-sm transition-transform duration-300 group-hover:scale-105 ${avatarBox}`}>
            <Building2 className="h-5 w-5" />
          </div>
        </div>

        <div className={`flex flex-wrap items-center gap-x-5 gap-y-2 mt-4 text-xs font-semibold relative z-10 ${detailsColor}`}>
          <div className="flex items-center gap-1.5">
            <MapPin className={`h-4 w-4 ${detailIconColor}`} />
            <span>{isRemote ? 'Work from home' : location}</span>
          </div>
          
          <div className="flex items-center gap-1.5">
            <Banknote className={`h-4 w-4 ${detailIconColor}`} />
            <span>{stipend}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Briefcase className={`h-4 w-4 ${detailIconColor}`} />
            <span>{duration} Month{duration > 1 ? 's' : ''}</span>
          </div>
        </div>

        {description && (
          <div className={`flex items-start gap-2.5 text-xs p-3.5 rounded-xl border mt-5 leading-relaxed relative z-10 ${descBg}`}>
            <FileText className={`h-4 w-4 mt-0.5 shrink-0 ${detailIconColor}`} />
            <p className={`line-clamp-2 leading-relaxed ${descColor}`}>{description}</p>
          </div>
        )}

        {skills.length > 0 && (
          <div className={`flex flex-wrap items-center gap-x-2 gap-y-1.5 mt-5 text-[11px] font-medium leading-none relative z-10 ${skillsColor}`}>
            {skills.map((s, i) => (
              <React.Fragment key={i}>
                <span className="hover:text-[#007AFF] transition-colors duration-200">{s}</span>
                {i < skills.length - 1 && <span className="opacity-40">•</span>}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      <div className={`border-t pt-4 flex items-center justify-between mt-5 relative z-10 ${
        isDark ? 'border-white/10' : 'border-gray-100'
      }`}>
        <div className="flex flex-wrap gap-2">

          <div className={`flex items-center gap-1 text-[10px] px-2.5 py-1 rounded-full border font-bold uppercase tracking-wider ${badgePosted}`}>
            <Clock className="h-3 w-3" />
            <span>{postedAt}</span>
          </div>


          <div className={`flex items-center gap-1 text-[10px] px-2.5 py-1 rounded-full border font-bold uppercase tracking-wider ${badgeEarly}`}>
            <Zap className="h-3 w-3 fill-current" />
            <span>Be an early applicant</span>
          </div>
        </div>

        <div className={`flex items-center gap-1 text-xs font-bold transition-all duration-200 ${
          isDark ? 'text-gray-400 group-hover:text-white' : 'text-gray-500 group-hover:text-gray-900'
        }`}>
          <span className="text-[10px] uppercase tracking-wider select-none hidden sm:inline">
            {internship.isFromAPI ? 'Apply now' : isExpanded ? 'Collapse' : 'Details'}
          </span>
          {internship.isFromAPI ? <ExternalLink className="h-3.5 w-3.5" /> : isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </div>
      </div>


      {!internship.isFromAPI && isExpanded && (
        <div 
          onClick={(e) => e.stopPropagation()} // Stop propagation to prevent collapse
          className={`border-t pt-5 mt-5 flex flex-col gap-4 animate-fade-in relative z-10 ${
            isDark ? 'border-white/10' : 'border-gray-100'
          }`}
        >
          {loadingDetail ? (
            <div className="flex flex-col items-center justify-center py-6 gap-3 select-none">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 rounded-full border-2 border-[#007AFF]/20" />
                <div className="absolute inset-0 rounded-full border-2 border-t-[#007AFF] animate-spin" />
              </div>
              <span className={`text-xs font-semibold animate-pulse ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                Fetching live API metadata...
              </span>
            </div>
          ) : (
            <div className="space-y-4">
              

              {detail && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
                  <div className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs font-semibold ${
                    isDark ? 'bg-slate-900/40 border-white/5' : 'bg-gray-50 border-gray-100'
                  }`}>
                    <Users className="h-4 w-4 text-[#007AFF]" />
                    <div>
                      <p className={`text-[10px] uppercase tracking-wider font-bold ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>
                        Applications
                      </p>
                      <p className={isDark ? 'text-white' : 'text-gray-800'}>
                        {detail.applicantsCount}
                      </p>
                    </div>
                  </div>

                  <div className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs font-semibold ${
                    isDark ? 'bg-slate-900/40 border-white/5' : 'bg-gray-50 border-gray-100'
                  }`}>
                    <CalendarDays className="h-4 w-4 text-emerald-500" />
                    <div>
                      <p className={`text-[10px] uppercase tracking-wider font-bold ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>
                        Apply By
                      </p>
                      <p className={isDark ? 'text-white' : 'text-gray-800'}>
                        {detail.deadline}
                      </p>
                    </div>
                  </div>
                </div>
              )}


              <div className="space-y-2">
                <h4 className={`text-xs uppercase tracking-widest font-black ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Full Internship Overview
                </h4>
                <p className={`text-xs md:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {detail ? detail.description : description} This exciting internship offers hands-on operational learning under direct mentorship at {companyName}.
                </p>
              </div>

              <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl border ${
                isDark ? 'bg-slate-950/30 border-white/5' : 'bg-gray-50 border-gray-100'
              }`}>
                <div className="text-center sm:text-left space-y-0.5">
                  <p className={`text-xs font-extrabold uppercase tracking-wide text-[#007AFF]`}>
                    Ready to take your next career step?
                  </p>
                  <p className={`text-[10px] font-semibold ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                    Submit your application instantly to start the selection round with {companyName}.
                  </p>
                </div>
                
                <button 
                  className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[#007AFF] to-[#0051C6] hover:from-[#0066D6] hover:to-[#003B99] text-white font-extrabold text-xs uppercase tracking-wider rounded-full shadow-[0_4px_14px_rgba(0,122,255,0.3)] hover:shadow-[0_6px_20px_rgba(0,122,255,0.4)] transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer"
                  onClick={() => onApply && onApply(detail || internship)}
                >
                  <span>Submit Application</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </button>
              </div>

            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InternshipCard;
