export const parseStipend = (stipendStr) => {
  if (!stipendStr) return 0;

  const cleanStr = stipendStr.replace(/,/g, '');
  const matches = cleanStr.match(/\d+/g);
  if (!matches) return 0;

  return parseInt(matches[0], 10);
};

export const filterInternships = (internships, filters) => {
  if (!internships) return [];
  const { profile = '', location = '', duration = '', stipend = '' } = filters;

  return internships.filter((internship) => {
    if (Array.isArray(profile)) {
      if (profile.length > 0) {
        const matchProfile = profile.some(prof => {
          const targetQuery = prof.trim().toLowerCase();
          return (
            internship.title.toLowerCase().includes(targetQuery) ||
            internship.companyName.toLowerCase().includes(targetQuery) ||
            (Array.isArray(internship.skills) && internship.skills.some(skill => skill.toLowerCase().includes(targetQuery)))
          );
        });
        if (!matchProfile) return false;
      }
    } else if (typeof profile === 'string' && profile.trim()) {
      const targetQuery = profile.trim().toLowerCase();
      const matchProfile = 
        internship.title.toLowerCase().includes(targetQuery) ||
        internship.companyName.toLowerCase().includes(targetQuery) ||
        (Array.isArray(internship.skills) && internship.skills.some(skill => skill.toLowerCase().includes(targetQuery)));
      if (!matchProfile) return false;
    }

    if (location.trim()) {
      const targetQuery = location.trim().toLowerCase();
      const matchLocation = 
        internship.location.toLowerCase().includes(targetQuery) ||
        (internship.isRemote && "work from home".includes(targetQuery));
      if (!matchLocation) return false;
    }

    if (duration) {
      const durationVal = parseInt(duration, 10);
      if (internship.duration !== durationVal) return false;
    }

    if (stipend) {
      const minStipendVal = parseInt(stipend, 10);
      const parsedStipendVal = parseStipend(internship.stipend);
      if (parsedStipendVal < minStipendVal) return false;
    }

    return true;
  });
};
