
import React from 'react';
import { ResumeData } from '../ResumeContext';

interface CreativeTemplateProps {
  data: ResumeData;
}

const CreativeTemplate: React.FC<CreativeTemplateProps> = ({ data }) => {
  return (
    <div className="w-full h-full bg-white text-resume-text-dark font-sans">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="bg-resume-accent-purple/90 text-white p-8 md:w-1/3">
          <div className="mb-10">
            <h1 className="text-3xl font-bold">{data.personalInfo.name}</h1>
            <p className="text-xl mt-1 text-white/80">{data.personalInfo.title}</p>
          </div>
          
          <div className="space-y-6">
            <div>
              <h2 className="uppercase text-sm font-semibold tracking-wider mb-3 border-b border-white/30 pb-1">Contact</h2>
              <div className="space-y-2 text-sm">
                <div>
                  <div className="text-white/70">Email</div>
                  <div>{data.personalInfo.email}</div>
                </div>
                <div>
                  <div className="text-white/70">Phone</div>
                  <div>{data.personalInfo.phone}</div>
                </div>
                <div>
                  <div className="text-white/70">Location</div>
                  <div>{data.personalInfo.location}</div>
                </div>
                {data.personalInfo.linkedin && (
                  <div>
                    <div className="text-white/70">LinkedIn</div>
                    <div>{data.personalInfo.linkedin}</div>
                  </div>
                )}
                {data.personalInfo.website && (
                  <div>
                    <div className="text-white/70">Website</div>
                    <div>{data.personalInfo.website}</div>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <h2 className="uppercase text-sm font-semibold tracking-wider mb-3 border-b border-white/30 pb-1">Skills</h2>
              <div className="space-y-4">
                {data.skillCategories.map(category => (
                  <div key={category.id} className="mb-3">
                    <h3 className="text-sm font-medium mb-2">{category.name}</h3>
                    <div className="space-y-2">
                      {category.skills.map(skill => (
                        <div key={skill.id} className="text-sm">
                          <div className="flex justify-between mb-1">
                            <span>{skill.name}</span>
                            {skill.level && (
                              <span>{skill.level}/5</span>
                            )}
                          </div>
                          {skill.level && (
                            <div className="w-full bg-white/20 rounded-full h-1.5">
                              <div 
                                className="bg-white rounded-full h-1.5" 
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
        
        {/* Main Content */}
        <div className="p-8 md:w-2/3">
          {/* Summary */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-resume-accent-purple mb-3">About Me</h2>
            <p className="text-sm">{data.personalInfo.summary}</p>
          </div>
          
          {/* Experience */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-resume-accent-purple mb-4">Work Experience</h2>
            
            <div className="space-y-6">
              {data.experience.map(exp => (
                <div key={exp.id} className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-resume-accent-purple/30">
                  <div className="absolute w-2.5 h-2.5 rounded-full bg-resume-accent-purple left-[-4.5px] top-1.5"></div>
                  
                  <div className="mb-2">
                    <div className="flex justify-between items-baseline flex-wrap">
                      <h3 className="font-bold text-resume-accent-purple">{exp.position}</h3>
                      <span className="text-xs bg-resume-accent-purple/10 text-resume-accent-purple px-2 py-0.5 rounded">
                        {exp.startDate} - {exp.endDate}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium">{exp.company}</span>
                      <span className="text-xs text-resume-text-light mx-2">•</span>
                      <span className="text-sm text-resume-text-light">{exp.location}</span>
                    </div>
                  </div>
                  
                  <ul className="list-disc list-outside text-sm space-y-1 ml-4 text-resume-text-medium">
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
            <h2 className="text-xl font-bold text-resume-accent-purple mb-4">Education</h2>
            
            <div className="space-y-4">
              {data.education.map(edu => (
                <div key={edu.id} className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-resume-accent-purple/30">
                  <div className="absolute w-2.5 h-2.5 rounded-full bg-resume-accent-purple left-[-4.5px] top-1.5"></div>
                  
                  <div>
                    <div className="flex justify-between items-baseline flex-wrap mb-1">
                      <h3 className="font-bold">{edu.degree} in {edu.fieldOfStudy}</h3>
                      <span className="text-xs bg-resume-accent-purple/10 text-resume-accent-purple px-2 py-0.5 rounded">
                        {edu.startDate} - {edu.endDate}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium">{edu.school}</span>
                      <span className="text-xs text-resume-text-light mx-2">•</span>
                      <span className="text-sm text-resume-text-light">{edu.location}</span>
                    </div>
                  </div>
                  
                  {edu.description && (
                    <p className="text-sm mt-2 text-resume-text-medium">{edu.description}</p>
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

export default CreativeTemplate;
