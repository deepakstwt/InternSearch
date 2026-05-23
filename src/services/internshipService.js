import axios from 'axios';
import mockInternships from '../data/mockInternships';

const API_URL = 'https://internshala.com/hiring/search';

const normalizeInternship = (raw) => {
  const id = raw.id || Math.floor(Math.random() * 100000);
  let companyName = raw.company_name || "Hiring Company";
  
  if (companyName.includes(" (") && companyName.endsWith(")")) {
    companyName = companyName.split(" (")[0];
  }

  const title = raw.title || raw.profile_name || "Internship Position";
  const isRemote = !!raw.work_from_home;
  
  let location = "Work from Home";
  if (!isRemote) {
    if (raw.location_names && raw.location_names.length > 0) {
      location = raw.location_names[0];
    } else if (raw.locations && raw.locations.length > 0) {
      location = raw.locations[0].string || raw.locations[0].locationName || "India";
    } else {
      location = "India";
    }
  }

  let duration = 3;
  if (raw.duration) {
    if (typeof raw.duration === 'number') {
      duration = raw.duration;
    } else {
      const match = raw.duration.match(/\d+/);
      if (match) {
        duration = parseInt(match[0], 10);
      }
    }
  }

  let stipend = "Unpaid";
  if (raw.stipend) {
    if (typeof raw.stipend === 'string') {
      stipend = raw.stipend;
    } else if (raw.stipend.salary) {
      stipend = raw.stipend.salary;
    } else if (raw.stipend.salaryValue1) {
      stipend = `₹ ${raw.stipend.salaryValue1.toLocaleString()} /month`;
    }
  }

  const postedAt = raw.posted_by_label || raw.posted_on || "Just now";

  let skills = [];
  if (raw.skills && Array.isArray(raw.skills)) {
    skills = raw.skills;
  } else {
    const profile = (raw.profile_name || title || "").toLowerCase();
    if (profile.includes("web") || profile.includes("developer") || profile.includes("react") || profile.includes("python")) {
      skills = ["JavaScript", "HTML", "CSS", "Git"];
    } else if (profile.includes("design")) {
      skills = ["Figma", "Photoshop"];
    } else {
      skills = ["Office Operations", "Communication", "MS-Excel"];
    }
  }

  const description = raw.description || `We are looking for a motivated ${title} to join our team at ${companyName}. This is a ${duration}-month role based in ${location}.`;

  return {
    id,
    title,
    companyName,
    location,
    duration,
    stipend,
    postedAt,
    isRemote,
    skills,
    description
  };
};

export const getInternships = async () => {
  try {
    const response = await axios.get(API_URL);

    if (response.data && response.data.internships_meta) {
      const rawMeta = response.data.internships_meta;
      if (typeof rawMeta === 'object') {
        const normalized = Object.values(rawMeta).map(item => ({
          ...normalizeInternship(item),
          isFromAPI: true
        }));
        if (normalized.length > 0) {
          return normalized;
        }
      }
    }

    if (response.data && Array.isArray(response.data)) {
      return response.data.map(item => ({
        ...normalizeInternship(item),
        isFromAPI: true
      }));
    }
    
    console.warn("API response format unexpected. Falling back to local mock data.");
    return mockInternships.map(item => ({
      ...item,
      isFromAPI: false
    }));
  } catch (error) {
    console.error("API call failed, falling back to local mock data:", error.message || error);
    return mockInternships.map(item => ({
      ...item,
      isFromAPI: false
    }));
  }
};

export const getInternshipDetail = async (id) => {
  try {
    const response = await axios.get(API_URL);
    let rawRecord = null;

    if (response.data && response.data.internships_meta) {
      rawRecord = response.data.internships_meta[id];
    }

    if (!rawRecord && response.data && Array.isArray(response.data)) {
      rawRecord = response.data.find(item => String(item.id) === String(id));
    }

    if (rawRecord) {
      const normalized = normalizeInternship(rawRecord);
      return {
        ...normalized,
        deadline: rawRecord.application_deadline || rawRecord.expires_at || "Apply soon",
        applicantsCount: rawRecord.application_status_message?.message || "Be an early applicant",
        ppoInfo: rawRecord.ppo_label_value || (rawRecord.is_ppo ? "With Job Offer" : null),
        officeDays: rawRecord.office_days || null,
        easyApply: !!rawRecord.eligible_for_easy_apply,
        isFromAPI: true
      };
    }
  } catch (error) {
    console.warn("Failed to fetch live API details, loading from local catalog instead:", error.message || error);
  }

  const mockRecord = mockInternships.find(item => String(item.id) === String(id));
  if (mockRecord) {
    return {
      ...mockRecord,
      deadline: "Apply soon",
      applicantsCount: "Be an early applicant",
      ppoInfo: null,
      officeDays: null,
      easyApply: false,
      isFromAPI: false
    };
  }

  return null;
};
