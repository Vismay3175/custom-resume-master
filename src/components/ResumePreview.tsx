
import React, { forwardRef } from 'react';
import { useResume } from './ResumeContext';
import ProfessionalTemplate from './templates/ProfessionalTemplate';
import MinimalTemplate from './templates/MinimalTemplate';
import CreativeTemplate from './templates/CreativeTemplate';
import ExecutiveTemplate from './templates/ExecutiveTemplate';
import ModernTemplate from './templates/ModernTemplate';
import ClassicTemplate from './templates/ClassicTemplate';
import { Button } from './ui/button';
import { Download } from 'lucide-react';

interface ResumePreviewProps {
  onDownload: () => void;
}

// Create a separate component for the content to be downloaded
export const ResumePrintContent = forwardRef<HTMLDivElement, { data: any }>(
  ({ data }, ref) => {
    const renderTemplate = () => {
      switch (data.template) {
        case 'professional':
          return <ProfessionalTemplate data={data} />;
        case 'minimal':
          return <MinimalTemplate data={data} />;
        case 'creative':
          return <CreativeTemplate data={data} />;
        case 'executive':
          return <ExecutiveTemplate data={data} />;
        case 'modern':
          return <ModernTemplate data={data} />;
        case 'classic':
          return <ClassicTemplate data={data} />;
        default:
          return <ProfessionalTemplate data={data} />;
      }
    };

    return (
      <div 
        ref={ref}
        className="bg-white mx-auto"
        style={{ 
          width: '8.5in', 
          minHeight: '11in',
          maxWidth: '100%',
        }}
      >
        {renderTemplate()}
      </div>
    );
  }
);

ResumePrintContent.displayName = 'ResumePrintContent';

const ResumePreview: React.FC<ResumePreviewProps> = ({ onDownload }) => {
  const { resumeData } = useResume();

  return (
    <div className="h-full flex flex-col">
      <div className="bg-muted px-4 py-3 flex justify-end sticky top-0 z-10">
        <Button onClick={onDownload} variant="default">
          <Download className="mr-1" />
          Download PDF
        </Button>
      </div>
      
      <div className="flex-1 overflow-auto p-8 bg-gray-100">
        <ResumePrintContent data={resumeData} />
      </div>
    </div>
  );
};

export default ResumePreview;
