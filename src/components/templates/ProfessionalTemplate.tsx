
import React from 'react';
import { ResumeData } from '../ResumeContext';

interface ProfessionalTemplateProps {
  data: ResumeData;
}

const ProfessionalTemplate: React.FC<ProfessionalTemplateProps> = ({ data }) => {
  return (
    <div className="w-full h-full bg-white text-resume-text-dark font-sans">
      {/* Header */}
      <div className="bg-resume-navy text-white p-8">
        <h1 className="text-3xl font-bold">{data.personalInfo.name}</h1>
        <p className="text-xl mt-1">{data.personalInfo.title}</p>
        
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-4 text-sm">
          <div>{data.personalInfo.email}</div>
          <div>{data.personalInfo.phone}</div>
          <div>{data.personalInfo.location}</div>
          {data.personalInfo.linkedin && <div>{data.personalInfo.linkedin}</div>}
          {data.personalInfo.website && <div>{data.personalInfo.website}</div>}
        </div>
      </div>
      
      {/* Summary */}
      <div className="p-8">
        <h2 className="text-lg font-semibold border-b border-resume-navy pb-1 mb-3">PROFESSIONAL SUMMARY</h2>
        <p className="text-sm">{data.personalInfo.summary}</p>
      </div>
      
      {/* Experience */}
      <div className="px-8 pb-6">
        <h2 className="text-lg font-semibold border-b border-resume-navy pb-1 mb-4">EXPERIENCE</h2>
        
        <div className="space-y-6">
          {data.experience.map(exp => (
            <div key={exp.id}>
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold">{exp.position}</h3>
                <span className="text-sm">{exp.startDate} - {exp.endDate}</span>
              </div>
              <div className="flex justify-between items-baseline mb-2">
                <h4 className="text-resume-blue font-medium">{exp.company}</h4>
                <span className="text-sm text-resume-text-light">{exp.location}</span>
              </div>
              <ul className="list-disc list-outside text-sm space-y-1 ml-5">
                {exp.description.map((desc, index) => (
                  <li key={index}>{desc}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      
      {/* Projects */}
      {data.projects.length > 0 && (
        <div className="px-8 pb-6">
          <h2 className="text-lg font-semibold border-b border-resume-navy pb-1 mb-4">PROJECTS</h2>
          
          <div className="space-y-6">
            {data.projects.map(project => (
              <div key={project.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold">{project.name}</h3>
                  <span className="text-sm">{project.startDate} - {project.endDate}</span>
                </div>
                <div className="flex justify-between items-baseline mb-2">
                  <h4 className="text-resume-blue font-medium">{project.company}</h4>
                  {project.link && (
                    <a href={project.link} className="text-sm text-resume-blue underline">
                      Project Link
                    </a>
                  )}
                </div>
                <ul className="list-disc list-outside text-sm space-y-1 ml-5">
                  {project.description.map((desc, index) => (
                    <li key={index}>{desc}</li>
                  ))}
                </ul>
                {project.technologies && (
                  <div className="mt-2 text-sm text-resume-text-medium">
                    <strong>Technologies:</strong> {project.technologies}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Education */}
      <div className="px-8 pb-6">
        <h2 className="text-lg font-semibold border-b border-resume-navy pb-1 mb-4">EDUCATION</h2>
        
        <div className="space-y-4">
          {data.education.map(edu => (
            <div key={edu.id}>
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold">{edu.degree} in {edu.fieldOfStudy}</h3>
                <span className="text-sm">{edu.startDate} - {edu.endDate}</span>
              </div>
              <div className="flex justify-between items-baseline">
                <h4 className="text-resume-blue font-medium">{edu.school}</h4>
                <span className="text-sm text-resume-text-light">{edu.location}</span>
              </div>
              {edu.description && (
                <p className="text-sm mt-1">{edu.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Skills */}
      <div className="px-8 pb-8">
        <h2 className="text-lg font-semibold border-b border-resume-navy pb-1 mb-4">SKILLS</h2>
        
        <div className="space-y-4">
          {data.skillCategories.map(category => (
            <div key={category.id}>
              <h3 className="font-medium mb-2">{category.name}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map(skill => (
                  <div 
                    key={skill.id}
                    className="bg-resume-bg-light rounded-lg px-3 py-1 text-sm border border-resume-light-blue/30"
                  >
                    {skill.name}
                    {skill.level && (
                      <span className="ml-1 inline-flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span 
                            key={i} 
                            className={`h-1.5 w-1.5 rounded-full mx-0.5 ${i < skill.level! ? 'bg-resume-blue' : 'bg-gray-300'}`}
                          />
                        ))}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfessionalTemplate;
