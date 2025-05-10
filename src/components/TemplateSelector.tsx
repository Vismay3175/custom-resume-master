
import React from 'react';
import { Card } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { useResume } from './ResumeContext';
import { cn } from '@/lib/utils';

const TemplateSelector: React.FC = () => {
  const { resumeData, setTemplate } = useResume();

  const templates = [
    {
      id: 'professional',
      name: 'Professional',
      description: 'Clean and modern design with a professional look',
      color: 'bg-resume-navy'
    },
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Simple and elegant design with minimal elements',
      color: 'bg-gray-800'
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Unique layout with creative elements to stand out',
      color: 'bg-resume-accent-purple'
    },
    {
      id: 'executive',
      name: 'Executive',
      description: 'Traditional design for senior-level positions',
      color: 'bg-resume-accent-teal'
    },
    {
      id: 'modern',
      name: 'Modern',
      description: 'Contemporary design with clean aesthetics',
      color: 'bg-blue-600'
    },
    {
      id: 'classic',
      name: 'Classic',
      description: 'Timeless layout with traditional formatting',
      color: 'bg-indigo-800'
    },
  ];

  return (
    <div className="py-4">
      <h3 className="text-lg font-medium mb-4">Choose a Template</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {templates.map((template) => (
          <div
            key={template.id}
            className={cn(
              "template-card cursor-pointer",
              resumeData.template === template.id && "template-card-active"
            )}
            onClick={() => setTemplate(template.id)}
          >
            <div className="aspect-[8.5/11] overflow-hidden">
              <div className={`w-full h-24 ${template.color}`}></div>
              <div className="p-3">
                <div className="h-3 w-full bg-gray-200 rounded mb-2"></div>
                <div className="h-3 w-3/4 bg-gray-200 rounded mb-4"></div>
                <div className="h-2 w-full bg-gray-100 rounded mb-1"></div>
                <div className="h-2 w-full bg-gray-100 rounded mb-1"></div>
                <div className="h-2 w-2/3 bg-gray-100 rounded mb-3"></div>
                
                <div className="h-3 w-1/2 bg-gray-200 rounded mb-2"></div>
                <div className="h-2 w-full bg-gray-100 rounded mb-1"></div>
                <div className="h-2 w-full bg-gray-100 rounded mb-3"></div>
              </div>
            </div>
            
            <div className="p-3 flex flex-col">
              <h4 className="font-medium">{template.name}</h4>
              <p className="text-xs text-muted-foreground">{template.description}</p>
            </div>
            
            {resumeData.template === template.id && (
              <div className="absolute top-2 right-2 bg-primary rounded-full p-0.5">
                <Check className="h-4 w-4 text-white" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
