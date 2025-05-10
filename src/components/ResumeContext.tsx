
import React, { createContext, useContext, useState } from 'react';

// Define all the data types for our resume
export type PersonalInfo = {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  website?: string;
  summary: string;
};

export type EducationItem = {
  id: string;
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  location: string;
  description?: string;
};

export type ExperienceItem = {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string[];
};

export type ProjectItem = {
  id: string;
  name: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string[];
  technologies?: string;
  link?: string;
};

export type SkillItem = {
  id: string;
  name: string;
  level?: number; // 1-5, optional for some templates
};

export type SkillCategory = {
  id: string;
  name: string;
  skills: SkillItem[];
};

export type ResumeData = {
  personalInfo: PersonalInfo;
  education: EducationItem[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  skillCategories: SkillCategory[];
  template: string;
};

interface ResumeContextType {
  resumeData: ResumeData;
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  addEducation: (item: Omit<EducationItem, 'id'>) => void;
  updateEducation: (id: string, item: Partial<EducationItem>) => void;
  removeEducation: (id: string) => void;
  addExperience: (item: Omit<ExperienceItem, 'id'>) => void;
  updateExperience: (id: string, item: Partial<ExperienceItem>) => void;
  removeExperience: (id: string) => void;
  addProject: (item: Omit<ProjectItem, 'id'>) => void;
  updateProject: (id: string, item: Partial<ProjectItem>) => void;
  removeProject: (id: string) => void;
  addSkillCategory: (name: string) => void;
  updateSkillCategory: (id: string, name: string) => void;
  removeSkillCategory: (id: string) => void;
  addSkill: (categoryId: string, name: string, level?: number) => void;
  updateSkill: (categoryId: string, skillId: string, name: string, level?: number) => void;
  removeSkill: (categoryId: string, skillId: string) => void;
  setTemplate: (template: string) => void;
  activeSection: string | null;
  setActiveSection: (section: string | null) => void;
}

// Sample initial data
const defaultResumeData: ResumeData = {
  personalInfo: {
    name: 'Alex Johnson',
    title: 'Senior Frontend Developer',
    email: 'alex.johnson@example.com',
    phone: '(555) 123-4567',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/alexjohnson',
    website: 'alexjohnson.dev',
    summary: 'Experienced frontend developer with 5+ years specializing in React and modern JavaScript frameworks. Passionate about creating responsive, accessible, and performant web applications.',
  },
  education: [
    {
      id: '1',
      school: 'University of California',
      degree: 'Bachelor of Science',
      fieldOfStudy: 'Computer Science',
      startDate: '2014',
      endDate: '2018',
      location: 'Berkeley, CA',
      description: 'Graduated with honors. Relevant coursework: Data Structures, Algorithms, Web Development.',
    },
  ],
  experience: [
    {
      id: '1',
      company: 'Tech Innovations Inc.',
      position: 'Senior Frontend Developer',
      startDate: 'Jan 2021',
      endDate: 'Present',
      location: 'San Francisco, CA',
      description: [
        'Led a team of 5 developers to rebuild the company\'s flagship product using React and TypeScript',
        'Improved page load times by 40% through code splitting and lazy loading techniques',
        'Implemented comprehensive unit testing with Jest and React Testing Library, achieving 85% code coverage',
        'Mentored junior developers and conducted regular code reviews to maintain code quality'
      ],
    },
    {
      id: '2',
      company: 'Digital Solutions LLC',
      position: 'Frontend Developer',
      startDate: 'Mar 2018',
      endDate: 'Dec 2020',
      location: 'San Francisco, CA',
      description: [
        'Developed responsive web applications using React, Redux, and SCSS',
        'Collaborated with designers to implement pixel-perfect UI components',
        'Built and maintained the company\'s component library, improving development efficiency by 30%'
      ],
    },
  ],
  projects: [
    {
      id: '1',
      name: 'E-commerce Platform Redesign',
      company: 'Tech Innovations Inc.',
      startDate: 'Apr 2022',
      endDate: 'Aug 2022',
      description: [
        'Redesigned the user interface of a major e-commerce platform serving 2M+ customers',
        'Implemented responsive design principles, improving mobile conversion rates by 25%',
        'Integrated with payment gateways and shipping APIs for a seamless checkout experience'
      ],
      technologies: 'React, TypeScript, Stripe API, Redux, Styled Components',
      link: 'https://project-demo.example.com'
    },
    {
      id: '2',
      name: 'Portfolio Website',
      company: 'Self-directed',
      startDate: 'Jan 2021',
      endDate: 'Feb 2021',
      description: [
        'Designed and developed a personal portfolio website to showcase projects',
        'Implemented animations and transitions for an engaging user experience',
        'Optimized for performance with a 98 Lighthouse performance score'
      ],
      technologies: 'Next.js, Tailwind CSS, Framer Motion',
      link: 'https://alexjohnson.dev'
    }
  ],
  skillCategories: [
    {
      id: '1',
      name: 'Programming Languages',
      skills: [
        { id: '1', name: 'JavaScript', level: 5 },
        { id: '2', name: 'TypeScript', level: 4 },
        { id: '3', name: 'HTML5', level: 5 },
        { id: '4', name: 'CSS3/SCSS', level: 4 },
      ],
    },
    {
      id: '2',
      name: 'Frameworks & Libraries',
      skills: [
        { id: '1', name: 'React', level: 5 },
        { id: '2', name: 'Redux', level: 4 },
        { id: '3', name: 'Next.js', level: 4 },
        { id: '4', name: 'Tailwind CSS', level: 5 },
      ],
    },
  ],
  template: 'professional',
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Generate a random ID for new items
  const generateId = () => Math.random().toString(36).substring(2, 9);

  // Personal Info
  const updatePersonalInfo = (info: Partial<PersonalInfo>) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info },
    }));
  };

  // Education
  const addEducation = (item: Omit<EducationItem, 'id'>) => {
    const newItem = { ...item, id: generateId() };
    setResumeData((prev) => ({
      ...prev,
      education: [...prev.education, newItem],
    }));
  };

  const updateEducation = (id: string, item: Partial<EducationItem>) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((edu) => 
        edu.id === id ? { ...edu, ...item } : edu
      ),
    }));
  };

  const removeEducation = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  };

  // Experience
  const addExperience = (item: Omit<ExperienceItem, 'id'>) => {
    const newItem = { ...item, id: generateId() };
    setResumeData((prev) => ({
      ...prev,
      experience: [...prev.experience, newItem],
    }));
  };

  const updateExperience = (id: string, item: Partial<ExperienceItem>) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) => 
        exp.id === id ? { ...exp, ...item } : exp
      ),
    }));
  };

  const removeExperience = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }));
  };

  // Projects
  const addProject = (item: Omit<ProjectItem, 'id'>) => {
    const newItem = { ...item, id: generateId() };
    setResumeData((prev) => ({
      ...prev,
      projects: [...prev.projects, newItem],
    }));
  };

  const updateProject = (id: string, item: Partial<ProjectItem>) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.map((proj) => 
        proj.id === id ? { ...proj, ...item } : proj
      ),
    }));
  };

  const removeProject = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.filter((proj) => proj.id !== id),
    }));
  };

  // Skills
  const addSkillCategory = (name: string) => {
    const newCategory = {
      id: generateId(),
      name,
      skills: [],
    };
    setResumeData((prev) => ({
      ...prev,
      skillCategories: [...prev.skillCategories, newCategory],
    }));
  };

  const updateSkillCategory = (id: string, name: string) => {
    setResumeData((prev) => ({
      ...prev,
      skillCategories: prev.skillCategories.map((cat) => 
        cat.id === id ? { ...cat, name } : cat
      ),
    }));
  };

  const removeSkillCategory = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      skillCategories: prev.skillCategories.filter((cat) => cat.id !== id),
    }));
  };

  const addSkill = (categoryId: string, name: string, level?: number) => {
    const newSkill = {
      id: generateId(),
      name,
      level,
    };
    setResumeData((prev) => ({
      ...prev,
      skillCategories: prev.skillCategories.map((cat) => 
        cat.id === categoryId
          ? { ...cat, skills: [...cat.skills, newSkill] }
          : cat
      ),
    }));
  };

  const updateSkill = (categoryId: string, skillId: string, name: string, level?: number) => {
    setResumeData((prev) => ({
      ...prev,
      skillCategories: prev.skillCategories.map((cat) => 
        cat.id === categoryId
          ? {
              ...cat,
              skills: cat.skills.map((skill) => 
                skill.id === skillId ? { ...skill, name, level } : skill
              ),
            }
          : cat
      ),
    }));
  };

  const removeSkill = (categoryId: string, skillId: string) => {
    setResumeData((prev) => ({
      ...prev,
      skillCategories: prev.skillCategories.map((cat) => 
        cat.id === categoryId
          ? {
              ...cat,
              skills: cat.skills.filter((skill) => skill.id !== skillId),
            }
          : cat
      ),
    }));
  };

  // Template
  const setTemplate = (template: string) => {
    setResumeData((prev) => ({ ...prev, template }));
  };

  const value = {
    resumeData,
    updatePersonalInfo,
    addEducation,
    updateEducation,
    removeEducation,
    addExperience,
    updateExperience,
    removeExperience,
    addProject,
    updateProject,
    removeProject,
    addSkillCategory,
    updateSkillCategory,
    removeSkillCategory,
    addSkill,
    updateSkill,
    removeSkill,
    setTemplate,
    activeSection,
    setActiveSection,
  };

  return <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>;
};

export const useResume = (): ResumeContextType => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};
