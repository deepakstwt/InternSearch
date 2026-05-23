import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Banknote, 
  Briefcase, 
  Clock, 
  FileDown,
  Building2,
  CheckCircle2,
  Sparkles,
  Users
} from 'lucide-react';

const ApplicationModal = ({ internship: initialInternship, internships = [], isDark, onClose }) => {
  const [currentInternship, setCurrentInternship] = useState(initialInternship);

  const { 
    title, 
    companyName = 'Hiring Company', 
    location, 
    duration, 
    stipend, 
    postedAt, 
    isRemote, 
    skills = [], 
    description,
    applicantsCount = 'Be an early applicant',
    deadline = 'Apply soon'
  } = currentInternship;

  const [availability, setAvailability] = useState('immediate');
  const [hasLaptop, setHasLaptop] = useState('yes');
  const [canTravel, setCanTravel] = useState('yes');
  const [currentSalary, setCurrentSalary] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [resume, setResume] = useState({
    name: 'Deepak_Prajapati_Resume.pdf',
    size: '155 KB',
    lastUsed: '19-05-2026'
  });

  const [triedSubmit, setTriedSubmit] = useState(false);
  const salaryInputRef = React.useRef(null);
  const resumeAreaRef = React.useRef(null);

  React.useEffect(() => {
    // Disable background scrolling when modal mounts
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    
    // Re-enable background scrolling when modal unmounts
    return () => {
      document.body.style.overflow = originalOverflow || 'unset';
    };
  }, []);

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const sizeStr = file.size > 1024 * 1024 
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` 
        : `${Math.round(file.size / 1024)} KB`;
      
      setResume({
        name: file.name,
        size: sizeStr,
        lastUsed: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-')
      });
    }
  };

  const modalBg = isDark ? 'bg-slate-900 border-white/5' : 'bg-white border-gray-200';
  const headerBg = isDark ? 'bg-slate-950 border-white/5' : 'bg-gray-50 border-gray-100';
  const cardBg = isDark ? 'bg-slate-950 border-white/5' : 'bg-white border-gray-100/80 shadow-sm';
  const textColor = isDark ? 'text-white' : 'text-[#1E293B]';
  const subTextColor = isDark ? 'text-[#94A3B8]' : 'text-[#64748B]';
  const borderCol = isDark ? 'border-white/5' : 'border-gray-100';
  const inputBg = isDark ? 'bg-slate-900 border-white/10 text-white placeholder-gray-600' : 'bg-white border-gray-300 text-gray-800 placeholder-gray-400';

  const handleSubmit = (e) => {
    e.preventDefault();
    setTriedSubmit(true);

    if (!currentSalary.trim()) {
      if (salaryInputRef.current) {
        salaryInputRef.current.focus();
        salaryInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    if (!resume) {
      if (resumeAreaRef.current) {
        resumeAreaRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitted(true);
  };

  const recommendedInternship = React.useMemo(() => {
    if (!Array.isArray(internships) || internships.length === 0) return null;
    const others = internships.filter(item => item.id !== currentInternship.id);
    if (others.length === 0) return null;

    const skillMatch = others.find(item => 
      Array.isArray(item.skills) && item.skills.some(s => skills.includes(s))
    );
    
    const titleMatch = others.find(item => 
      item.title && item.title.toLowerCase().split(' ')[0] === title.toLowerCase().split(' ')[0]
    );

    return skillMatch || titleMatch || others[Math.floor(Math.random() * others.length)];
  }, [internships, currentInternship.id, skills, title]);

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 select-none animate-fade-in overflow-y-auto">
        <div className={`relative w-full max-w-lg p-6 sm:p-8 rounded-2xl border shadow-lg ${modalBg}`}>
          
          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="h-9 w-9 stroke-[2.5]" />
            </div>
            
            <h3 className={`text-xl sm:text-2xl font-black tracking-tight mb-1.5 ${textColor}`}>
              Application Submitted!
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed ${subTextColor}`}>
              Your application for <strong className="font-extrabold">{title}</strong> at <strong className="font-extrabold">{companyName}</strong> has been sent successfully.
            </p>
          </div>

          {recommendedInternship && (
            <div className={`p-5 rounded-2xl border text-left mb-6 ${cardBg} transition-all duration-300`}>
              <div className="flex items-center gap-1.5 mb-3 text-[10px] font-black uppercase tracking-widest text-[#007AFF]">
                <Sparkles className="h-3.5 w-3.5 animate-pulse" />
                <span>Recommended for you</span>
              </div>

              <h4 className={`text-base font-extrabold tracking-tight mb-1 ${textColor}`}>
                {recommendedInternship.title}
              </h4>
              <p className={`text-xs font-semibold mb-3.5 ${subTextColor}`}>
                {recommendedInternship.companyName}
              </p>

              <div className={`flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold mb-4 ${subTextColor}`}>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 opacity-70 text-[#007AFF]" />
                  <span>{recommendedInternship.isRemote ? 'Work from home' : recommendedInternship.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Banknote className="h-3.5 w-3.5 opacity-70 text-emerald-500" />
                  <span>{recommendedInternship.stipend}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Briefcase className="h-3.5 w-3.5 opacity-70 text-amber-500" />
                  <span>{recommendedInternship.duration} Month{recommendedInternship.duration > 1 ? 's' : ''}</span>
                </div>
              </div>


              <div className={`p-3.5 rounded-xl border text-[11px] leading-relaxed select-none ${isDark ? 'bg-slate-950/30 border-white/5 text-slate-300' : 'bg-gray-50 border-gray-100 text-slate-600'}`}>
                <p className="font-bold text-[10px] uppercase tracking-wider mb-1 text-gray-400">Description:</p>
                <p className="line-clamp-3 leading-relaxed">{recommendedInternship.description}</p>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3">
            <button 
              onClick={onClose}
              className={`flex-1 py-3 text-xs uppercase tracking-wider font-extrabold rounded-full border transition-all duration-200 cursor-pointer shadow-sm ${
                isDark 
                  ? 'bg-white/5 hover:bg-white/10 border-white/10 text-gray-300' 
                  : 'bg-black/5 hover:bg-black/10 border-black/10 text-gray-700'
              }`}
            >
              Skip
            </button>
            
            {recommendedInternship && (
              <button 
                onClick={() => {
                  setCurrentInternship(recommendedInternship);
                  setIsSubmitted(false);
                  setAvailability('immediate');
                  setHasLaptop('yes');
                  setCanTravel('yes');
                  setCurrentSalary('');
                }}
                className="flex-1 py-3 bg-[#007AFF] hover:bg-[#0066D6] text-white font-extrabold text-xs uppercase tracking-wider rounded-full transition-all duration-200 shadow-md shadow-blue-500/20 cursor-pointer"
              >
                Apply Now
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  const roles = [
    `Assist with daily operations, research, and project tasks related to ${title}.`,
    `Work collaboratively with team members on standard deliverables.`,
    `Help draft documents, track weekly progress, and update status sheets.`,
  ];

  const requirements = [
    `Basic understanding of core tools: ${skills.length > 0 ? skills.slice(0, 3).join(', ') : 'Office tools'}.`,
    `Clear communication and eagerness to learn new systems quickly.`,
    `Ability to collaborate effectively in a team environment.`,
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/60 animate-fade-in overflow-y-auto">
      <div className={`relative w-full max-w-2xl h-auto max-h-[85vh] sm:max-h-[90vh] flex flex-col rounded-2xl border shadow-lg overflow-hidden ${modalBg}`}>
        
        <div className={`flex items-center justify-between px-6 py-4 border-b select-none ${headerBg}`}>
          <span className={`text-xs md:text-sm font-extrabold tracking-tight ${subTextColor}`}>
            Applying to <span className={isDark ? 'text-white' : 'text-gray-900'}>{title}</span>
          </span>
          <button 
            onClick={onClose}
            className={`p-1.5 rounded-full hover:bg-black/10 transition-colors cursor-pointer ${isDark ? 'hover:bg-white/10 text-white' : 'text-gray-500'}`}
          >
            <X className="h-5 w-5" />
          </button>
        </div>


        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          <div className={`p-5 rounded-2xl border flex flex-col sm:flex-row items-start justify-between gap-4 ${cardBg}`}>
            <div className="space-y-2">
              <h3 className={`text-lg md:text-xl font-bold tracking-tight ${textColor}`}>
                {title}
              </h3>
              <div className="flex flex-wrap items-center gap-2">
                <span className={`text-sm font-semibold ${subTextColor}`}>{companyName}</span>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold border uppercase tracking-widest bg-[#007AFF]/10 border-[#007AFF]/20 text-[#007AFF]`}>
                  Actively hiring
                </span>
              </div>

              <div className={`flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-2.5 text-xs font-semibold ${subTextColor}`}>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 opacity-70" />
                  <span>{isRemote ? 'Work from home' : location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Banknote className="h-4 w-4 opacity-70" />
                  <span>{stipend}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4 opacity-70" />
                  <span>{duration} Month{duration > 1 ? 's' : ''}</span>
                </div>
              </div>

              <div className={`flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[10px] uppercase font-bold tracking-wide mt-2 ${subTextColor}`}>
                <div className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 opacity-70" />
                  <span>{postedAt}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5 opacity-70" />
                  <span>5 vacancies</span>
                </div>
              </div>
            </div>
            
            <div className={`w-11 h-11 rounded-xl border flex items-center justify-center font-bold shrink-0 shadow-sm bg-[#F0F6FF] border-[#B9D5FF] text-[#007AFF]`}>
              <Building2 className="h-5 w-5" />
            </div>
          </div>

          <div className="space-y-3.5 select-none">
            <div className="flex items-center gap-2">
              <h4 className={`text-sm font-extrabold tracking-wider uppercase ${textColor}`}>
                About the job
              </h4>
            </div>

            <div className="space-y-2 text-xs md:text-sm leading-relaxed">
              <p className={`font-bold ${textColor}`}>Role Overview:</p>
              <ul className={`list-disc pl-5 space-y-1.5 ${subTextColor}`}>
                {roles.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            </div>

            <div className="space-y-2 text-xs md:text-sm leading-relaxed pt-2">
              <p className={`font-bold ${textColor}`}>Requirements:</p>
              <ul className={`list-disc pl-5 space-y-1.5 ${subTextColor}`}>
                {requirements.map((req, i) => <li key={i}>{req}</li>)}
              </ul>
            </div>

            <div className="space-y-1 text-xs md:text-sm leading-relaxed pt-2">
              <p className={`font-bold ${textColor}`}>About {companyName}:</p>
              <p className={subTextColor}>
                {companyName} provides high-quality services and digital products to clients. They focus on delivering practical, effective solutions and fostering team growth.
              </p>
              <p className={`text-xs mt-1.5 ${subTextColor}`}>
                <strong>Perks:</strong> Flexible work hours, Certificate of completion, Informal dress code.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="border-t pt-6 space-y-6">
            
            <div className="space-y-3">
              <label className={`text-sm font-extrabold tracking-wider uppercase block ${textColor}`}>
                Confirm your availability
              </label>
              
              <div className="space-y-2">
                {[
                  { value: 'immediate', label: 'Yes, I am available to join immediately' },
                  { value: 'notice_current', label: 'No, I am currently on notice period' },
                  { value: 'notice_future', label: 'No, I will have to serve notice period' },
                  { value: 'other', label: 'Other (Please specify your availability)' }
                ].map((item) => (
                  <label key={item.value} className="flex items-center gap-3 cursor-pointer text-xs sm:text-sm">
                    <input 
                      type="radio" 
                      name="availability" 
                      value={item.value}
                      checked={availability === item.value}
                      onChange={() => setAvailability(item.value)}
                      className="accent-[#007AFF] h-4 w-4 shrink-0" 
                    />
                    <span className={textColor}>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>


            <div className="space-y-3">
              <label className={`text-sm font-extrabold tracking-wider uppercase block ${textColor}`}>
                Do you have a working laptop and internet?
              </label>
              
              <div className="flex gap-6">
                {[
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ].map((item) => (
                  <label key={item.value} className="flex items-center gap-2 cursor-pointer text-xs sm:text-sm">
                    <input 
                      type="radio" 
                      name="laptop" 
                      value={item.value}
                      checked={hasLaptop === item.value}
                      onChange={() => setHasLaptop(item.value)}
                      className="accent-[#007AFF] h-4 w-4" 
                    />
                    <span className={textColor}>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>


            <div className="space-y-3">
              <label className={`text-sm font-extrabold tracking-wider uppercase block ${textColor}`}>
                Are you open to travel for fieldwork as part of your responsibilities?
              </label>
              
              <div className="flex gap-6">
                {[
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ].map((item) => (
                  <label key={item.value} className="flex items-center gap-2 cursor-pointer text-xs sm:text-sm">
                    <input 
                      type="radio" 
                      name="travel" 
                      value={item.value}
                      checked={canTravel === item.value}
                      onChange={() => setCanTravel(item.value)}
                      className="accent-[#007AFF] h-4 w-4" 
                    />
                    <span className={textColor}>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>


            <div className="space-y-2">
              <label className={`text-sm font-extrabold tracking-wider uppercase block ${textColor}`}>
                What is your current last/salary per month?
              </label>
              <input 
                type="text" 
                ref={salaryInputRef}
                placeholder="Enter numeric value" 
                value={currentSalary}
                onChange={(e) => setCurrentSalary(e.target.value)}
                className={`w-full max-w-md px-4 py-3 rounded-xl border text-xs sm:text-sm outline-none transition-all ${
                  triedSubmit && !currentSalary.trim()
                    ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                    : 'focus:border-[#007AFF] focus:ring-1 focus:ring-[#007AFF]'
                } ${inputBg}`}
              />
              {triedSubmit && !currentSalary.trim() && (
                <p className="text-red-500 text-[11px] font-bold mt-1">Please enter your monthly salary to submit</p>
              )}
            </div>

            <div ref={resumeAreaRef} className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className={`text-sm font-extrabold tracking-wider uppercase ${textColor}`}>
                  Your resume
                </label>
                {resume && (
                  <>
                    <input 
                      type="file" 
                      accept=".pdf,.doc,.docx" 
                      id="edit-resume-upload" 
                      className="hidden" 
                      onChange={handleResumeUpload} 
                    />
                    <label 
                      htmlFor="edit-resume-upload"
                      className="text-xs text-[#007AFF] font-bold hover:underline cursor-pointer select-none"
                    >
                      Edit resume
                    </label>
                  </>
                )}
              </div>
              
              <p className={`text-xs ${subTextColor}`}>
                {resume 
                  ? "Your current resume will be submitted along with this application." 
                  : "Please upload a valid PDF or DOCX file to submit along with your application."}
              </p>

              {resume ? (

                <div className="p-4 rounded-xl border flex items-center justify-between relative overflow-hidden bg-red-50/10 border-red-500/25 animate-fade-in">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 text-red-600 rounded-lg flex items-center justify-center shrink-0">
                      <FileDown className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-extrabold text-[#FF3B30] truncate max-w-[200px] sm:max-w-[320px]">
                        {resume.name}
                      </p>
                      <p className="text-[10px] font-semibold text-gray-500">
                        {resume.size} • Last used on {resume.lastUsed}
                      </p>
                    </div>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setResume(null)}
                    className="p-1.5 rounded-full hover:bg-red-500/10 text-[#FF3B30] transition-colors cursor-pointer"
                    title="Remove Resume"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (

                <div className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors animate-fade-in ${
                  isDark ? 'border-white/10 hover:border-[#007AFF]/50 bg-slate-900/20' : 'border-gray-300 hover:border-[#007AFF] bg-gray-50/50'
                }`}>
                  <input 
                    type="file" 
                    accept=".pdf,.doc,.docx" 
                    id="resume-upload" 
                    className="hidden" 
                    onChange={handleResumeUpload} 
                  />
                  <label htmlFor="resume-upload" className="cursor-pointer flex flex-col items-center gap-2 select-none">
                    <div className="w-10 h-10 rounded-full bg-[#007AFF]/10 text-[#007AFF] flex items-center justify-center mb-1">
                      <FileDown className="h-5 w-5" />
                    </div>
                    <span className={`text-xs sm:text-sm font-bold ${textColor}`}>
                      Click to upload new resume
                    </span>
                    <span className="text-[10px] text-gray-500">
                      Supports PDF, DOC, DOCX up to 10 MB
                    </span>
                  </label>
                </div>
              )}
              {triedSubmit && !resume && (
                <p className="text-red-500 text-[11px] font-bold mt-1">Please upload your resume to submit</p>
              )}
            </div>


            <div className={`border-t pt-5 flex items-center justify-between ${borderCol}`}>
              <span className={`text-[10px] font-bold uppercase tracking-wider ${subTextColor}`}>
                Your details are secure
              </span>
              <button 
                type="submit"
                className="px-8 py-3.5 bg-[#007AFF] hover:bg-[#0066D6] text-white font-extrabold text-xs uppercase tracking-wider rounded-full shadow-[0_4px_14px_rgba(0,122,255,0.3)] hover:shadow-[0_6px_20px_rgba(0,122,255,0.4)] transition-all duration-200 cursor-pointer"
              >
                Submit
              </button>
            </div>

          </form>

        </div>

      </div>
    </div>
  );
};

export default ApplicationModal;
