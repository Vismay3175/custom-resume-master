
import React from 'react';
import { ResumeData } from '../ResumeContext';

interface ExecutiveTemplateProps {
  data: ResumeData;
}

const ExecutiveTemplate: React.FC<ExecutiveTemplateProps> = ({ data }) => {
  return (
    <div className="w-full h-full bg-white text-resume-text-dark font-serif">
      {/* Header */}
      <div className="text-center p-8 border-b-4 border-resume-accent-teal">
        <h1 className="text-3xl font-bold uppercase tracking-wide">{data.personalInfo.name}</h1>
        <p className="text-xl mt-1 text-resume-accent-teal uppercase tracking-wider">{data.personalInfo.title}</p>
        
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 mt-4 text-sm">
          <div>{data.personalInfo.email}</div>
          <div>{data.personalInfo.phone}</div>
          <div>{data.personalInfo.location}</div>
          {data.personalInfo.linkedin && <div>{data.personalInfo.linkedin}</div>}
          {data.personalInfo.website && <div>{data.personalInfo.website}</div>}
        </div>
      </div>
      
      {/* Summary */}
      <div className="p-8 bg-gray-50">
        <h2 className="text-lg font-semibold text-resume-accent-teal mb-3 uppercase tracking-wider">Executive Summary</h2>
        <p className="text-sm leading-relaxed">{data.personalInfo.summary}</p>
      </div>
      
      {/* Experience */}
      <div className="px-8 py-6">
        <h2 className="text-lg font-semibold text-resume-accent-teal mb-4 uppercase tracking-wider">Professional Experience</h2>
        
        <div className="space-y-6">
          {data.experience.map(exp => (
            <div key={exp.id} className="border-l-2 border-resume-accent-teal pl-4 py-1">
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="font-bold uppercase">{exp.company}</h3>
                <span className="text-sm font-medium">{exp.startDate} - {exp.endDate}</span>
              </div>
              <div className="flex justify-between items-baseline mb-3">
                <h4 className="italic font-medium">{exp.position}</h4>
                <span className="text-sm text-resume-text-light">{exp.location}</span>
              </div>
              <ul className="list-disc list-outside text-sm space-y-2 ml-5">
                {exp.description.map((desc, index) => (
                  <li key={index} className="leading-relaxed">{desc}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      
      {/* Projects */}
      {data.projects.length > 0 && (
        <div className="px-8 py-6">
          <h2 className="text-lg font-semibold text-resume-accent-teal mb-4 uppercase tracking-wider">Key Projects</h2>
          
          <div className="space-y-6">
            {data.projects.map(project => (
              <div key={project.id} className="border-l-2 border-resume-accent-teal pl-4 py-1">
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="font-bold uppercase">{project.name}</h3>
                  <span className="text-sm font-medium">{project.startDate} - {project.endDate}</span>
                </div>
                <div className="flex justify-between items-baseline mb-3">
                  <h4 className="italic font-medium">{project.company}</h4>
                  {project.link && (
                    <a href={project.link} className="text-sm underline text-resume-accent-teal">
                      View Project
                    </a>
                  )}
                </div>
                <ul className="list-disc list-outside text-sm space-y-2 ml-5">
                  {project.description.map((desc, index) => (
                    <li key={index} className="leading-relaxed">{desc}</li>
                  ))}
                </ul>
                {project.technologies && (
                  <p className="text-sm mt-2 font-medium">
                    Technologies: <span className="font-normal">{project.technologies}</span>
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="flex">
        {/* Education Column */}
        <div className="px-8 py-6 flex-1">
          <h2 className="text-lg font-semibold text-resume-accent-teal mb-4 uppercase tracking-wider">Education</h2>
          
          <div className="space-y-4">
            {data.education.map(edu => (
              <div key={edu.id}>
                <div className="mb-1">
                  <h3 className="font-bold">{edu.school}</h3>
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-medium italic">{edu.degree} in {edu.fieldOfStudy}</h4>
                    <span className="text-sm">{edu.startDate} - {edu.endDate}</span>
                  </div>
                  <div className="text-sm text-resume-text-light">{edu.location}</div>
                </div>
                {edu.description && (
                  <p className="text-sm mt-1">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Skills Column */}
        <div className="px-8 py-6 flex-1">
          <h2 className="text-lg font-semibold text-resume-accent-teal mb-4 uppercase tracking-wider">Areas of Expertise</h2>
          
          <div className="space-y-5">
            {data.skillCategories.map(category => (
              <div key={category.id}>
                <h3 className="font-medium uppercase tracking-wide mb-2">{category.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map(skill => (
                    <div 
                      key={skill.id}
                      className="bg-gray-50 border border-resume-accent-teal/20 rounded px-3 py-1 text-sm"
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
    </div>
  );
};

export default ExecutiveTemplate;
