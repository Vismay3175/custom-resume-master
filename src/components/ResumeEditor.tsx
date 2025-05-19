import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { Plus, Trash2, FileText, Briefcase, Building, Link, Sparkles } from 'lucide-react';
import { useResume } from './ResumeContext';
import AiTextGenerator from './AiTextGenerator';
import { motion } from 'framer-motion';

const ResumeEditor: React.FC = () => {
  const {
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
  } = useResume();

  const fadeInVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  const handleAddExperience = () => {
    addExperience({
      company: 'New Company',
      position: 'Position Title',
      startDate: 'Start Date',
      endDate: 'End Date',
      location: 'Location',
      description: ['Describe your responsibilities and achievements'],
    });
    toast.success('New experience added!');
  };

  const handleAddProject = () => {
    addProject({
      name: 'New Project',
      company: 'Company or Self-directed',
      startDate: 'Start Date',
      endDate: 'End Date',
      description: ['Describe your project'],
      technologies: 'Technologies used',
    });
    toast.success('New project added!');
  };

  const handleAddEducation = () => {
    addEducation({
      school: 'New School',
      degree: 'Degree',
      fieldOfStudy: 'Field of Study',
      startDate: 'Start Year',
      endDate: 'End Year',
      location: 'Location',
    });
    toast.success('New education added!');
  };

  const handleAddSkillCategory = () => {
    addSkillCategory('New Category');
    toast.success('New skill category added!');
  };

  const handleAddSkill = (categoryId: string) => {
    addSkill(categoryId, 'New Skill', 3);
    toast.success('New skill added!');
  };

  const handleExperienceDescriptionChange = (
    expId: string,
    index: number,
    value: string
  ) => {
    const experience = resumeData.experience.find((exp) => exp.id === expId);
    if (experience) {
      const newDescription = [...experience.description];
      newDescription[index] = value;
      updateExperience(expId, { description: newDescription });
    }
  };

  const handleProjectDescriptionChange = (
    projId: string,
    index: number,
    value: string
  ) => {
    const project = resumeData.projects.find((proj) => proj.id === projId);
    if (project) {
      const newDescription = [...project.description];
      newDescription[index] = value;
      updateProject(projId, { description: newDescription });
    }
  };

  const handleAddExperiencePoint = (expId: string) => {
    const experience = resumeData.experience.find((exp) => exp.id === expId);
    if (experience) {
      const newDescription = [...experience.description, 'New bullet point'];
      updateExperience(expId, { description: newDescription });
    }
  };

  const handleAddProjectPoint = (projId: string) => {
    const project = resumeData.projects.find((proj) => proj.id === projId);
    if (project) {
      const newDescription = [...project.description, 'New bullet point'];
      updateProject(projId, { description: newDescription });
    }
  };

  const handleRemoveExperiencePoint = (expId: string, index: number) => {
    const experience = resumeData.experience.find((exp) => exp.id === expId);
    if (experience) {
      const newDescription = experience.description.filter((_, i) => i !== index);
      updateExperience(expId, { description: newDescription });
    }
  };

  const handleRemoveProjectPoint = (projId: string, index: number) => {
    const project = resumeData.projects.find((proj) => proj.id === projId);
    if (project) {
      const newDescription = project.description.filter((_, i) => i !== index);
      updateProject(projId, { description: newDescription });
    }
  };

  const handleExperienceAiSuggestion = (expId: string, suggestion: string) => {
    const experience = resumeData.experience.find((exp) => exp.id === expId);
    if (experience) {
      const newDescription = [...experience.description, suggestion];
      updateExperience(expId, { description: newDescription });
    }
  };

  const handleProjectAiSuggestion = (projId: string, suggestion: string) => {
    const project = resumeData.projects.find((proj) => proj.id === projId);
    if (project) {
      const newDescription = [...project.description, suggestion];
      updateProject(projId, { description: newDescription });
    }
  };

  const handleSummaryAiSuggestion = (suggestion: string) => {
    updatePersonalInfo({ summary: suggestion });
  };

  return (
    <div className="h-full overflow-auto pb-10">
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
        </TabsList>

        {/* Personal Information Tab */}
        <TabsContent value="personal">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Full Name
                    </label>
                    <Input
                      id="name"
                      value={resumeData.personalInfo.name}
                      onChange={(e) => updatePersonalInfo({ name: e.target.value })}
                      placeholder="John Doe"
                      className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="title" className="text-sm font-medium">
                      Job Title
                    </label>
                    <Input
                      id="title"
                      value={resumeData.personalInfo.title}
                      onChange={(e) => updatePersonalInfo({ title: e.target.value })}
                      placeholder="Senior Developer"
                      className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      value={resumeData.personalInfo.email}
                      onChange={(e) => updatePersonalInfo({ email: e.target.value })}
                      placeholder="john.doe@example.com"
                      className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">
                      Phone
                    </label>
                    <Input
                      id="phone"
                      value={resumeData.personalInfo.phone}
                      onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
                      placeholder="(123) 456-7890"
                      className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="location" className="text-sm font-medium">
                    Location
                  </label>
                  <Input
                    id="location"
                    value={resumeData.personalInfo.location}
                    onChange={(e) => updatePersonalInfo({ location: e.target.value })}
                    placeholder="City, State, Country"
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="linkedin" className="text-sm font-medium">
                      LinkedIn (Optional)
                    </label>
                    <Input
                      id="linkedin"
                      value={resumeData.personalInfo.linkedin || ''}
                      onChange={(e) => updatePersonalInfo({ linkedin: e.target.value })}
                      placeholder="linkedin.com/in/username"
                      className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="website" className="text-sm font-medium">
                      Website (Optional)
                    </label>
                    <Input
                      id="website"
                      value={resumeData.personalInfo.website || ''}
                      onChange={(e) => updatePersonalInfo({ website: e.target.value })}
                      placeholder="example.com"
                      className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="summary" className="text-sm font-medium">
                      Professional Summary
                    </label>
                    <AiTextGenerator 
                      prompt="Write a professional summary for a resume"
                      onSelectSuggestion={handleSummaryAiSuggestion}
                    />
                  </div>
                  <Textarea
                    id="summary"
                    value={resumeData.personalInfo.summary}
                    onChange={(e) => updatePersonalInfo({ summary: e.target.value })}
                    placeholder="Write a short professional summary..."
                    rows={4}
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Experience Tab */}
        <TabsContent value="experience">
          <motion.div 
            className="space-y-4"
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
          >
            <div className="flex justify-between">
              <h3 className="text-lg font-medium">Work Experience</h3>
              <Button 
                onClick={handleAddExperience} 
                variant="outline" 
                size="sm"
                className="transition-all duration-200 hover:bg-primary/10"
              >
                <Plus className="mr-2 h-4 w-4" /> Add Experience
              </Button>
            </div>

            {resumeData.experience.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="section-card hover:shadow-md transition-shadow">
                  <CardContent className="pt-4">
                    <div className="flex justify-between pb-2">
                      <h4 className="font-medium">{exp.company}</h4>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          removeExperience(exp.id);
                          toast.success('Experience removed!');
                        }}
                        className="hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Company</label>
                        <Input
                          value={exp.company}
                          onChange={(e) => 
                            updateExperience(exp.id, { company: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Position</label>
                        <Input
                          value={exp.position}
                          onChange={(e) => 
                            updateExperience(exp.id, { position: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mt-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Start Date</label>
                        <Input
                          value={exp.startDate}
                          onChange={(e) => 
                            updateExperience(exp.id, { startDate: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">End Date</label>
                        <Input
                          value={exp.endDate}
                          onChange={(e) => 
                            updateExperience(exp.id, { endDate: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Location</label>
                        <Input
                          value={exp.location}
                          onChange={(e) => 
                            updateExperience(exp.id, { location: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">Description</label>
                        <div className="flex gap-2">
                          <AiTextGenerator 
                            prompt={`Write a job description bullet point for ${exp.position} at ${exp.company}`}
                            onSelectSuggestion={(suggestion) => handleExperienceAiSuggestion(exp.id, suggestion)}
                            context={exp.description.join(' ')}
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleAddExperiencePoint(exp.id)}
                            className="transition-all duration-200 hover:bg-primary/10"
                          >
                            <Plus className="mr-2 h-3 w-3" /> Add Point
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {exp.description.map((desc, i) => (
                          <motion.div 
                            key={i} 
                            className="flex items-start gap-2"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2, delay: i * 0.05 }}
                          >
                            <div className="flex-1">
                              <Input
                                value={desc}
                                onChange={(e) => 
                                  handleExperienceDescriptionChange(
                                    exp.id, 
                                    i, 
                                    e.target.value
                                  )
                                }
                                placeholder="Describe your responsibilities and achievements"
                                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                              />
                            </div>
                            {exp.description.length > 1 && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveExperiencePoint(exp.id, i)}
                                className="hover:text-red-500 transition-colors"
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>

        {/* Projects Tab */}
        <TabsContent value="projects">
          <motion.div 
            className="space-y-4"
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
          >
            <div className="flex justify-between">
              <h3 className="text-lg font-medium">Projects</h3>
              <Button 
                onClick={handleAddProject} 
                variant="outline" 
                size="sm"
                className="transition-all duration-200 hover:bg-primary/10"
              >
                <Plus className="mr-2 h-4 w-4" /> Add Project
              </Button>
            </div>

            {resumeData.projects.map((proj, index) => (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="section-card hover:shadow-md transition-shadow">
                  <CardContent className="pt-4">
                    <div className="flex justify-between pb-2">
                      <h4 className="font-medium">{proj.name}</h4>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          removeProject(proj.id);
                          toast.success('Project removed!');
                        }}
                        className="hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Project Name</label>
                        <Input
                          value={proj.name}
                          onChange={(e) => 
                            updateProject(proj.id, { name: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          <span className="flex items-center">
                            <Building className="h-4 w-4 mr-1" />
                            Company/Organization
                          </span>
                        </label>
                        <Input
                          value={proj.company}
                          onChange={(e) => 
                            updateProject(proj.id, { company: e.target.value })
                          }
                          placeholder="Company name or 'Self-directed'"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Start Date</label>
                        <Input
                          value={proj.startDate}
                          onChange={(e) => 
                            updateProject(proj.id, { startDate: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">End Date</label>
                        <Input
                          value={proj.endDate}
                          onChange={(e) => 
                            updateProject(proj.id, { endDate: e.target.value })
                          }
                          placeholder="End Date or 'Present'"
                        />
                      </div>
                    </div>

                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">Description</label>
                        <div className="flex gap-2">
                          <AiTextGenerator 
                            prompt={`Write a project description bullet point for ${proj.name}`}
                            onSelectSuggestion={(suggestion) => handleProjectAiSuggestion(proj.id, suggestion)}
                            context={proj.description.join(' ')}
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleAddProjectPoint(proj.id)}
                            className="transition-all duration-200 hover:bg-primary/10"
                          >
                            <Plus className="mr-2 h-3 w-3" /> Add Point
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {proj.description.map((desc, i) => (
                          <motion.div 
                            key={i} 
                            className="flex items-start gap-2"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2, delay: i * 0.05 }}
                          >
                            <div className="flex-1">
                              <Input
                                value={desc}
                                onChange={(e) => 
                                  handleProjectDescriptionChange(
                                    proj.id, 
                                    i, 
                                    e.target.value
                                  )
                                }
                                placeholder="Describe your project"
                                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                              />
                            </div>
                            {proj.description.length > 1 && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveProjectPoint(proj.id, i)}
                                className="hover:text-red-500 transition-colors"
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Technologies Used</label>
                        <Input
                          value={proj.technologies || ''}
                          onChange={(e) => 
                            updateProject(proj.id, { technologies: e.target.value })
                          }
                          placeholder="React, TypeScript, Node.js, etc."
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          <span className="flex items-center">
                            <Link className="h-4 w-4 mr-1" />
                            Project Link (Optional)
                          </span>
                        </label>
                        <Input
                          value={proj.link || ''}
                          onChange={(e) => 
                            updateProject(proj.id, { link: e.target.value })
                          }
                          placeholder="https://project-demo.example.com"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>

        {/* Education Tab */}
        <TabsContent value="education">
          <div className="space-y-4">
            <div className="flex justify-between">
              <h3 className="text-lg font-medium">Education</h3>
              <Button onClick={handleAddEducation} variant="outline" size="sm">
                <Plus className="mr-2 h-4 w-4" /> Add Education
              </Button>
            </div>

            {resumeData.education.map((edu) => (
              <Card key={edu.id} className="section-card">
                <CardContent className="pt-4">
                  <div className="flex justify-between pb-2">
                    <h4 className="font-medium">{edu.school}</h4>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        removeEducation(edu.id);
                        toast.success('Education removed!');
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">School</label>
                      <Input
                        value={edu.school}
                        onChange={(e) => 
                          updateEducation(edu.id, { school: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Degree</label>
                      <Input
                        value={edu.degree}
                        onChange={(e) => 
                          updateEducation(edu.id, { degree: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mt-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Field of Study</label>
                      <Input
                        value={edu.fieldOfStudy}
                        onChange={(e) => 
                          updateEducation(edu.id, { fieldOfStudy: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Start Date</label>
                      <Input
                        value={edu.startDate}
                        onChange={(e) => 
                          updateEducation(edu.id, { startDate: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">End Date</label>
                      <Input
                        value={edu.endDate}
                        onChange={(e) => 
                          updateEducation(edu.id, { endDate: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Location</label>
                      <Input
                        value={edu.location}
                        onChange={(e) => 
                          updateEducation(edu.id, { location: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <label className="text-sm font-medium">Description (Optional)</label>
                    <Textarea
                      value={edu.description || ''}
                      onChange={(e) => 
                        updateEducation(edu.id, { description: e.target.value })
                      }
                      placeholder="Relevant coursework, achievements, etc."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Skills Tab */}
        <TabsContent value="skills">
          <div className="space-y-4">
            <div className="flex justify-between">
              <h3 className="text-lg font-medium">Skills</h3>
              <Button onClick={handleAddSkillCategory} variant="outline" size="sm">
                <Plus className="mr-2 h-4 w-4" /> Add Category
              </Button>
            </div>

            {resumeData.skillCategories.map((category) => (
              <Card key={category.id} className="section-card">
                <CardContent className="pt-4">
                  <div className="flex justify-between pb-2">
                    <div className="space-y-2 w-full">
                      <label className="text-sm font-medium">Category Name</label>
                      <Input
                        value={category.name}
                        onChange={(e) => 
                          updateSkillCategory(category.id, e.target.value)
                        }
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        removeSkillCategory(category.id);
                        toast.success('Category removed!');
                      }}
                      className="ml-4 mt-7"
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <h5 className="text-sm font-medium">Skills</h5>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleAddSkill(category.id)}
                      >
                        <Plus className="mr-2 h-3 w-3" /> Add Skill
                      </Button>
                    </div>
                    
                    {category.skills.map((skill) => (
                      <div key={skill.id} className="flex items-center gap-2">
                        <Input
                          className="flex-1"
                          value={skill.name}
                          onChange={(e) => 
                            updateSkill(
                              category.id, 
                              skill.id, 
                              e.target.value, 
                              skill.level
                            )
                          }
                        />
                        <div className="flex items-center gap-2 min-w-[120px]">
                          <label className="text-xs text-muted-foreground">Level:</label>
                          <select
                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                            value={skill.level || 1}
                            onChange={(e) => 
                              updateSkill(
                                category.id, 
                                skill.id, 
                                skill.name, 
                                Number(e.target.value)
                              )
                            }
                          >
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                          </select>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeSkill(category.id, skill.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResumeEditor;
