
import React from 'react';
import { useResume } from './ResumeContext';
import ProfessionalTemplate from './templates/ProfessionalTemplate';
import MinimalTemplate from './templates/MinimalTemplate';
import CreativeTemplate from './templates/CreativeTemplate';
import ExecutiveTemplate from './templates/ExecutiveTemplate';

interface ResumePreviewProps {
  onDownload: () => void;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ onDownload }) => {
  const { resumeData } = useResume();

  const renderTemplate = () => {
    switch (resumeData.template) {
      case 'professional':
        return <ProfessionalTemplate data={resumeData} />;
      case 'minimal':
        return <MinimalTemplate data={resumeData} />;
      case 'creative':
        return <CreativeTemplate data={resumeData} />;
      case 'executive':
        return <ExecutiveTemplate data={resumeData} />;
      default:
        return <ProfessionalTemplate data={resumeData} />;
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="bg-muted px-4 py-3 flex justify-end sticky top-0 z-10">
        <button
          onClick={onDownload}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download PDF
        </button>
      </div>
      
      <div className="flex-1 overflow-auto p-8 bg-gray-100">
        <div 
          className="bg-white mx-auto shadow-lg"
          style={{ 
            width: '8.5in', 
            minHeight: '11in',
            maxWidth: '100%',
          }}
        >
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
