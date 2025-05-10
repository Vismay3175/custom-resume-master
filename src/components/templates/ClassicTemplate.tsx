
import React from 'react';
import { ResumeData } from '../ResumeContext';

interface ClassicTemplateProps {
  data: ResumeData;
}

const ClassicTemplate: React.FC<ClassicTemplateProps> = ({ data }) => {
  return (
    <div className="w-full h-full bg-white text-resume-text-dark font-serif p-10">
      {/* Header */}
      <div className="text-center border-b-2 border-indigo-800 pb-6 mb-6">
        <h1 className="text-4xl font-bold uppercase tracking-wider">{data.personalInfo.name}</h1>
        <p className="text-xl mt-2 text-indigo-800">{data.personalInfo.title}</p>
        
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 mt-4 text-sm">
          {data.personalInfo.email && <div>{data.personalInfo.email}</div>}
          {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
          {data.personalInfo.location && <div>{data.personalInfo.location}</div>}
          {data.personalInfo.linkedin && <div>{data.personalInfo.linkedin}</div>}
          {data.personalInfo.website && <div>{data.personalInfo.website}</div>}
        </div>
      </div>
      
      {/* Summary */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-indigo-800 mb-3 uppercase text-center">Professional Summary</h2>
        <p className="text-center leading-relaxed">{data.personalInfo.summary}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column - Skills */}
        <div>
          <h2 className="text-xl font-bold text-indigo-800 mb-4 uppercase text-center">Skills</h2>
          
          <div className="space-y-6">
            {data.skillCategories.map(category => (
              <div key={category.id}>
                <h3 className="font-bold uppercase mb-2 text-center">{category.name}</h3>
                <div className="flex flex-col gap-2">
                  {category.skills.map(skill => (
                    <div key={skill.id} className="text-center">
                      {skill.name}
                      {skill.level && (
                        <div className="w-full bg-gray-200 h-1 mt-1">
                          <div 
                            className="bg-indigo-800 h-1" 
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
        
        {/* Middle and Right Columns */}
        <div className="md:col-span-2 space-y-8">
          {/* Experience */}
          <div>
            <h2 className="text-xl font-bold text-indigo-800 mb-4 uppercase text-center">Experience</h2>
            
            <div className="space-y-6">
              {data.experience.map(exp => (
                <div key={exp.id}>
                  <div className="mb-2">
                    <div className="flex flex-col sm:flex-row justify-between items-baseline">
                      <h3 className="font-bold">{exp.position}</h3>
                      <span className="text-sm italic">{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-baseline">
                      <h4 className="font-medium text-indigo-800">{exp.company}</h4>
                      <span className="text-sm text-gray-600">{exp.location}</span>
                    </div>
                  </div>
                  <ul className="list-disc list-outside space-y-1 ml-5 text-gray-700">
                    {exp.description.map((desc, index) => (
                      <li key={index}>{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          
          {/* Education */}
          <div>
            <h2 className="text-xl font-bold text-indigo-800 mb-4 uppercase text-center">Education</h2>
            
            <div className="space-y-4">
              {data.education.map(edu => (
                <div key={edu.id}>
                  <div className="mb-2">
                    <div className="flex flex-col sm:flex-row justify-between items-baseline">
                      <h3 className="font-bold">{edu.degree} in {edu.fieldOfStudy}</h3>
                      <span className="text-sm italic">{edu.startDate} - {edu.endDate}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-baseline">
                      <h4 className="font-medium text-indigo-800">{edu.school}</h4>
                      <span className="text-sm text-gray-600">{edu.location}</span>
                    </div>
                  </div>
                  {edu.description && (
                    <p className="text-gray-700 mt-1">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassicTemplate;
