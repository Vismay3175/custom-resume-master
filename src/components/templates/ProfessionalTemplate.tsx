import React from 'react';
import { ResumeData } from '../ResumeContext';
import { motion } from 'framer-motion';

interface ProfessionalTemplateProps {
  data: ResumeData;
}

const ProfessionalTemplate: React.FC<ProfessionalTemplateProps> = ({ data }) => {
  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
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
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    }
  };
  
  const headerVariants = {
    hidden: { y: -30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  };

  const skillVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300, 
        damping: 20
      }
    }
  };

  const listItemVariants = {
    hidden: { x: -10, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
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
        variants={headerVariants}
      >
        <motion.h1 
          className="text-3xl font-bold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {data.personalInfo.name}
        </motion.h1>
        <motion.p 
          className="text-xl mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {data.personalInfo.title}
        </motion.p>
        
        <motion.div 
          className="flex flex-wrap gap-x-4 gap-y-1 mt-4 text-sm"
          variants={itemVariants}
        >
          <motion.div variants={itemVariants}>{data.personalInfo.email}</motion.div>
          <motion.div variants={itemVariants}>{data.personalInfo.phone}</motion.div>
          <motion.div variants={itemVariants}>{data.personalInfo.location}</motion.div>
          {data.personalInfo.linkedin && <motion.div variants={itemVariants}>{data.personalInfo.linkedin}</motion.div>}
          {data.personalInfo.website && <motion.div variants={itemVariants}>{data.personalInfo.website}</motion.div>}
        </motion.div>
      </motion.div>
      
      {/* Summary */}
      <motion.div 
        className="p-8"
        variants={itemVariants}
      >
        <motion.h2 
          className="text-lg font-bold border-b border-resume-navy pb-1 mb-3"
          variants={itemVariants}
        >
          PROFESSIONAL SUMMARY
        </motion.h2>
        <motion.p 
          className="text-sm"
          variants={itemVariants}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {data.personalInfo.summary}
        </motion.p>
      </motion.div>
      
      {/* Experience */}
      <motion.div 
        className="px-8 pb-6"
        variants={itemVariants}
      >
        <motion.h2 
          className="text-lg font-bold border-b border-resume-navy pb-1 mb-4"
          variants={itemVariants}
        >
          EXPERIENCE
        </motion.h2>
        
        <motion.div 
          className="space-y-6"
          variants={containerVariants}
        >
          {data.experience.map((exp, index) => (
            <motion.div 
              key={exp.id} 
              variants={itemVariants}
              custom={index}
              className="transition-all duration-300 hover:shadow-md hover:bg-gray-50 hover:scale-[1.01] p-2 rounded"
              whileHover={{ 
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                backgroundColor: "#f9fafb" 
              }}
            >
              <div className="flex justify-between items-baseline">
                <motion.h3 
                  className="font-bold"
                  variants={listItemVariants}
                >
                  {exp.position}
                </motion.h3>
                <motion.span 
                  className="text-sm"
                  variants={listItemVariants}
                >
                  {exp.startDate} - {exp.endDate}
                </motion.span>
              </div>
              <div className="flex justify-between items-baseline mb-2">
                <motion.h4 
                  className="text-resume-blue font-medium"
                  variants={listItemVariants}
                >
                  {exp.company}
                </motion.h4>
                <motion.span 
                  className="text-sm text-resume-text-light"
                  variants={listItemVariants}
                >
                  {exp.location}
                </motion.span>
              </div>
              <motion.ul 
                className="list-disc list-outside text-sm space-y-1 ml-5"
                variants={containerVariants}
              >
                {exp.description.map((desc, index) => (
                  <motion.li 
                    key={index}
                    variants={listItemVariants}
                    custom={index}
                  >
                    {desc}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      
      {/* Projects */}
      {data.projects.length > 0 && (
        <motion.div 
          className="px-8 pb-6"
          variants={itemVariants}
        >
          <motion.h2 
            className="text-lg font-bold border-b border-resume-navy pb-1 mb-4"
            variants={itemVariants}
          >
            PROJECTS
          </motion.h2>
          
          <motion.div 
            className="space-y-6"
            variants={containerVariants}
          >
            {data.projects.map((project, index) => (
              <motion.div 
                key={project.id} 
                variants={itemVariants}
                custom={index}
                className="transition-all duration-300 hover:shadow-md hover:bg-gray-50 hover:scale-[1.01] p-2 rounded"
                whileHover={{ 
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  backgroundColor: "#f9fafb" 
                }}
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
          </motion.div>
        </motion.div>
      )}
      
      {/* Education */}
      <motion.div 
        className="px-8 pb-6"
        variants={itemVariants}
      >
        <motion.h2 
          className="text-lg font-bold border-b border-resume-navy pb-1 mb-4"
          variants={itemVariants}
        >
          EDUCATION
        </motion.h2>
        
        <motion.div 
          className="space-y-4"
          variants={containerVariants}
        >
          {data.education.map((edu, index) => (
            <motion.div 
              key={edu.id} 
              variants={itemVariants}
              custom={index}
              className="transition-all duration-300 hover:shadow-md hover:bg-gray-50 hover:scale-[1.01] p-2 rounded"
              whileHover={{ 
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                backgroundColor: "#f9fafb" 
              }}
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
        </motion.div>
      </motion.div>
      
      {/* Skills */}
      <motion.div 
        className="px-8 pb-8"
        variants={itemVariants}
      >
        <motion.h2 
          className="text-lg font-bold border-b border-resume-navy pb-1 mb-4"
          variants={itemVariants}
        >
          SKILLS
        </motion.h2>
        
        <motion.div 
          className="space-y-4"
          variants={containerVariants}
        >
          {data.skillCategories.map((category, catIndex) => (
            <motion.div 
              key={category.id}
              variants={itemVariants}
              custom={catIndex}
            >
              <motion.h3 
                className="font-medium mb-2"
                variants={itemVariants}
              >
                {category.name}
              </motion.h3>
              <motion.div 
                className="flex flex-wrap gap-2"
                variants={containerVariants}
              >
                {category.skills.map((skill, skillIndex) => (
                  <motion.div 
                    key={skill.id}
                    className="bg-resume-bg-light rounded-lg px-3 py-1 text-sm border border-resume-light-blue/30
                              transition-all duration-300 hover:shadow-md hover:scale-105 hover:bg-resume-light-blue/20"
                    variants={skillVariants}
                    custom={skillIndex}
                    whileHover={{ 
                      scale: 1.1,
                      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                      backgroundColor: "rgba(144, 205, 244, 0.2)"
                    }}
                  >
                    {skill.name}
                    {skill.level && (
                      <span className="ml-1 inline-flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <motion.span 
                            key={i} 
                            className={`h-1.5 w-1.5 rounded-full mx-0.5 ${i < skill.level! ? 'bg-resume-blue' : 'bg-gray-300'}`}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ 
                              opacity: 1, 
                              scale: 1,
                              transition: { delay: 0.1 * i }
                            }}
                          />
                        ))}
                      </span>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ProfessionalTemplate;
