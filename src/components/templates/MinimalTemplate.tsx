
import React from 'react';
import { ResumeData } from '../ResumeContext';

interface MinimalTemplateProps {
  data: ResumeData;
}

const MinimalTemplate: React.FC<MinimalTemplateProps> = ({ data }) => {
  return (
    <div className="w-full h-full bg-white text-resume-text-dark font-sans p-10">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-resume-text-dark">{data.personalInfo.name}</h1>
        <p className="text-lg text-resume-text-medium mt-1">{data.personalInfo.title}</p>
        
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-4 text-sm text-resume-text-medium">
          <div>{data.personalInfo.email}</div>
          <div>{data.personalInfo.phone}</div>
          <div>{data.personalInfo.location}</div>
          {data.personalInfo.linkedin && <div>{data.personalInfo.linkedin}</div>}
          {data.personalInfo.website && <div>{data.personalInfo.website}</div>}
        </div>
      </div>
      
      {/* Summary */}
      <div className="mb-8">
        <p className="text-sm text-center">{data.personalInfo.summary}</p>
      </div>

      <div className="h-px bg-gray-200 my-6"></div>
      
      {/* Experience */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-center uppercase tracking-wide mb-4">Experience</h2>
        
        <div className="space-y-6">
          {data.experience.map(exp => (
            <div key={exp.id}>
              <div className="flex flex-col sm:flex-row justify-between sm:items-baseline mb-2">
                <h3 className="font-bold">{exp.position}</h3>
                <span className="text-sm text-resume-text-medium">{exp.startDate} - {exp.endDate}</span>
              </div>
              <div className="flex flex-col sm:flex-row justify-between sm:items-baseline mb-2">
                <h4 className="font-medium">{exp.company}</h4>
                <span className="text-sm text-resume-text-light">{exp.location}</span>
              </div>
              <ul className="list-disc list-outside text-sm space-y-1 ml-5 text-resume-text-medium">
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
        <>
          <div className="h-px bg-gray-200 my-6"></div>
          
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-center uppercase tracking-wide mb-4">Projects</h2>
            
            <div className="space-y-6">
              {data.projects.map(project => (
                <div key={project.id}>
                  <div className="flex flex-col sm:flex-row justify-between sm:items-baseline mb-2">
                    <h3 className="font-bold">{project.name}</h3>
                    <span className="text-sm text-resume-text-medium">{project.startDate} - {project.endDate}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between sm:items-baseline mb-2">
                    <h4 className="font-medium">{project.company}</h4>
                    {project.link && (
                      <a href={project.link} className="text-sm text-resume-text-medium underline">
                        Project Link
                      </a>
                    )}
                  </div>
                  <ul className="list-disc list-outside text-sm space-y-1 ml-5 text-resume-text-medium">
                    {project.description.map((desc, index) => (
                      <li key={index}>{desc}</li>
                    ))}
                  </ul>
                  {project.technologies && (
                    <p className="text-sm mt-1 text-resume-text-medium italic">
                      Technologies: {project.technologies}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      
      <div className="h-px bg-gray-200 my-6"></div>
      
      {/* Education */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-center uppercase tracking-wide mb-4">Education</h2>
        
        <div className="space-y-4">
          {data.education.map(edu => (
            <div key={edu.id}>
              <div className="flex flex-col sm:flex-row justify-between sm:items-baseline mb-1">
                <h3 className="font-bold">{edu.degree} in {edu.fieldOfStudy}</h3>
                <span className="text-sm text-resume-text-medium">{edu.startDate} - {edu.endDate}</span>
              </div>
              <div className="flex flex-col sm:flex-row justify-between sm:items-baseline">
                <h4 className="font-medium">{edu.school}</h4>
                <span className="text-sm text-resume-text-light">{edu.location}</span>
              </div>
              {edu.description && (
                <p className="text-sm mt-1 text-resume-text-medium">{edu.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="h-px bg-gray-200 my-6"></div>
      
      {/* Skills */}
      <div>
        <h2 className="text-lg font-semibold text-center uppercase tracking-wide mb-4">Skills</h2>
        
        <div className="space-y-4">
          {data.skillCategories.map(category => (
            <div key={category.id} className="text-center">
              <h3 className="font-medium mb-2">{category.name}</h3>
              <div className="flex flex-wrap gap-3 justify-center">
                {category.skills.map(skill => (
                  <div 
                    key={skill.id}
                    className="text-sm text-resume-text-medium"
                  >
                    {skill.name}
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

export default MinimalTemplate;
