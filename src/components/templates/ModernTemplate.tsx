
import React from 'react';
import { ResumeData } from '../ResumeContext';

interface ModernTemplateProps {
  data: ResumeData;
}

const ModernTemplate: React.FC<ModernTemplateProps> = ({ data }) => {
  return (
    <div className="w-full h-full bg-white text-resume-text-dark font-sans">
      {/* Header */}
      <div className="bg-blue-600 text-white p-10">
        <h1 className="text-3xl font-bold">{data.personalInfo.name}</h1>
        <p className="text-xl mt-1 opacity-90">{data.personalInfo.title}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 text-sm">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="opacity-75">Email:</span>
              <span>{data.personalInfo.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="opacity-75">Phone:</span>
              <span>{data.personalInfo.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="opacity-75">Location:</span>
              <span>{data.personalInfo.location}</span>
            </div>
          </div>
          <div className="space-y-2">
            {data.personalInfo.linkedin && (
              <div className="flex items-center gap-2">
                <span className="opacity-75">LinkedIn:</span>
                <span>{data.personalInfo.linkedin}</span>
              </div>
            )}
            {data.personalInfo.website && (
              <div className="flex items-center gap-2">
                <span className="opacity-75">Website:</span>
                <span>{data.personalInfo.website}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Summary */}
      <div className="p-8 bg-blue-50">
        <h2 className="text-xl font-bold text-blue-600 mb-3">SUMMARY</h2>
        <p className="leading-relaxed">{data.personalInfo.summary}</p>
      </div>
      
      {/* Two-column layout */}
      <div className="flex flex-col md:flex-row">
        {/* Main Column */}
        <div className="p-8 md:w-2/3">
          {/* Experience */}
          <div className="mb-10">
            <h2 className="text-xl font-bold text-blue-600 mb-4 pb-2 border-b-2 border-blue-200">EXPERIENCE</h2>
            
            <div className="space-y-8">
              {data.experience.map(exp => (
                <div key={exp.id} className="relative">
                  <div className="flex flex-col md:flex-row justify-between md:items-baseline mb-2">
                    <h3 className="font-bold text-lg">{exp.position}</h3>
                    <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full md:ml-2">
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>
                  <div className="flex flex-col md:flex-row justify-between md:items-baseline mb-3">
                    <h4 className="font-semibold text-blue-700">{exp.company}</h4>
                    <span className="text-sm text-gray-600">{exp.location}</span>
                  </div>
                  <ul className="list-disc list-outside space-y-2 ml-5 text-gray-700">
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
            <div className="mb-10">
              <h2 className="text-xl font-bold text-blue-600 mb-4 pb-2 border-b-2 border-blue-200">PROJECTS</h2>
              
              <div className="space-y-8">
                {data.projects.map(project => (
                  <div key={project.id} className="relative">
                    <div className="flex flex-col md:flex-row justify-between md:items-baseline mb-2">
                      <h3 className="font-bold text-lg">{project.name}</h3>
                      <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full md:ml-2">
                        {project.startDate} - {project.endDate}
                      </span>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between md:items-baseline mb-3">
                      <h4 className="font-semibold text-blue-700">{project.company}</h4>
                      {project.link && (
                        <a href={project.link} className="text-sm text-blue-600 underline">
                          View Project
                        </a>
                      )}
                    </div>
                    <ul className="list-disc list-outside space-y-2 ml-5 text-gray-700">
                      {project.description.map((desc, index) => (
                        <li key={index}>{desc}</li>
                      ))}
                    </ul>
                    {project.technologies && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {project.technologies.split(',').map((tech, i) => (
                          <span key={i} className="text-xs bg-blue-50 border border-blue-100 rounded-full px-2 py-1">
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Education */}
          <div>
            <h2 className="text-xl font-bold text-blue-600 mb-4 pb-2 border-b-2 border-blue-200">EDUCATION</h2>
            
            <div className="space-y-6">
              {data.education.map(edu => (
                <div key={edu.id}>
                  <div className="flex flex-col md:flex-row justify-between md:items-baseline mb-2">
                    <h3 className="font-bold text-lg">{edu.degree} in {edu.fieldOfStudy}</h3>
                    <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full md:ml-2">
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>
                  <div className="flex flex-col md:flex-row justify-between md:items-baseline mb-2">
                    <h4 className="font-semibold text-blue-700">{edu.school}</h4>
                    <span className="text-sm text-gray-600">{edu.location}</span>
                  </div>
                  {edu.description && (
                    <p className="text-gray-700 mt-2">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="bg-gray-50 p-8 md:w-1/3">
          {/* Skills */}
          <div>
            <h2 className="text-xl font-bold text-blue-600 mb-4 pb-2 border-b-2 border-blue-200">SKILLS</h2>
            
            <div className="space-y-6">
              {data.skillCategories.map(category => (
                <div key={category.id}>
                  <h3 className="font-semibold mb-3">{category.name}</h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map(skill => (
                      <div 
                        key={skill.id}
                        className="bg-white border border-blue-200 rounded-lg px-3 py-1.5 text-sm"
                      >
                        {skill.name}
                        {skill.level && (
                          <div className="mt-1 w-full bg-blue-100 h-1.5 rounded-full">
                            <div 
                              className="bg-blue-600 h-1.5 rounded-full" 
                              style={{ width: `${(skill.level / 5) * 100}%` }}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;
