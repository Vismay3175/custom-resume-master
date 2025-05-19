
import React from 'react';
import { ResumeData } from '../ResumeContext';
import { motion } from 'framer-motion';

interface ProfessionalTemplateProps {
  data: ResumeData;
}

const ProfessionalTemplate: React.FC<ProfessionalTemplateProps> = ({ data }) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4
      }
    }
  };

  return (
    <motion.div 
      className="w-full h-full bg-white text-resume-text-dark font-sans"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <motion.div 
        className="bg-resume-navy text-white p-8"
        variants={itemVariants}
      >
        <h1 className="text-3xl font-bold">{data.personalInfo.name}</h1>
        <p className="text-xl mt-1">{data.personalInfo.title}</p>
        
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-4 text-sm">
          <div>{data.personalInfo.email}</div>
          <div>{data.personalInfo.phone}</div>
          <div>{data.personalInfo.location}</div>
          {data.personalInfo.linkedin && <div>{data.personalInfo.linkedin}</div>}
          {data.personalInfo.website && <div>{data.personalInfo.website}</div>}
        </div>
      </motion.div>
      
      {/* Summary */}
      <motion.div 
        className="p-8"
        variants={itemVariants}
      >
        <h2 className="text-lg font-bold border-b border-resume-navy pb-1 mb-3">PROFESSIONAL SUMMARY</h2>
        <p className="text-sm">{data.personalInfo.summary}</p>
      </motion.div>
      
      {/* Experience */}
      <motion.div 
        className="px-8 pb-6"
        variants={itemVariants}
      >
        <h2 className="text-lg font-bold border-b border-resume-navy pb-1 mb-4">EXPERIENCE</h2>
        
        <div className="space-y-6">
          {data.experience.map((exp, index) => (
            <motion.div 
              key={exp.id} 
              variants={itemVariants}
              custom={index}
              className="transition-all duration-300 hover:shadow-md hover:bg-gray-50 p-2 rounded"
            >
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
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* Projects */}
      {data.projects.length > 0 && (
        <motion.div 
          className="px-8 pb-6"
          variants={itemVariants}
        >
          <h2 className="text-lg font-bold border-b border-resume-navy pb-1 mb-4">PROJECTS</h2>
          
          <div className="space-y-6">
            {data.projects.map((project, index) => (
              <motion.div 
                key={project.id} 
                variants={itemVariants}
                custom={index}
                className="transition-all duration-300 hover:shadow-md hover:bg-gray-50 p-2 rounded"
              >
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold">{project.name}</h3>
                  <span className="text-sm">{project.startDate} - {project.endDate}</span>
                </div>
                <div className="flex justify-between items-baseline mb-2">
                  <h4 className="text-resume-blue font-medium">{project.company}</h4>
                  {project.link && (
                    <a href={project.link} className="text-sm text-resume-blue underline hover:text-resume-navy transition-colors">
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
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
      
      {/* Education */}
      <motion.div 
        className="px-8 pb-6"
        variants={itemVariants}
      >
        <h2 className="text-lg font-bold border-b border-resume-navy pb-1 mb-4">EDUCATION</h2>
        
        <div className="space-y-4">
          {data.education.map((edu, index) => (
            <motion.div 
              key={edu.id} 
              variants={itemVariants}
              custom={index}
              className="transition-all duration-300 hover:shadow-md hover:bg-gray-50 p-2 rounded"
            >
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
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* Skills */}
      <motion.div 
        className="px-8 pb-8"
        variants={itemVariants}
      >
        <h2 className="text-lg font-bold border-b border-resume-navy pb-1 mb-4">SKILLS</h2>
        
        <div className="space-y-4">
          {data.skillCategories.map((category, catIndex) => (
            <motion.div 
              key={category.id}
              variants={itemVariants}
              custom={catIndex}
            >
              <h3 className="font-medium mb-2">{category.name}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div 
                    key={skill.id}
                    className="bg-resume-bg-light rounded-lg px-3 py-1 text-sm border border-resume-light-blue/30
                              transition-all duration-300 hover:shadow-md hover:scale-105 hover:bg-resume-light-blue/20"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: (catIndex * 0.1) + (skillIndex * 0.05) }}
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
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProfessionalTemplate;
