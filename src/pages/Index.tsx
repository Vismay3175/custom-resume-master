
import React, { useRef } from 'react';
import ResumeEditor from '@/components/ResumeEditor';
import ResumePreview, { ResumePrintContent } from '@/components/ResumePreview';
import TemplateSelector from '@/components/TemplateSelector';
import { ResumeProvider, useResume } from '@/components/ResumeContext';
import { toast } from 'sonner';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

// Create a component that will be wrapped by ResumeProvider
const ResumeBuilder = () => {
  const resumeRef = useRef<HTMLDivElement>(null);
  const { resumeData } = useResume();

  const handleDownload = async () => {
    if (!resumeRef.current) return;
    toast.info('Preparing your resume for download...');

    try {
      // Create a temporary div to hold only the content for printing
      const tempDiv = document.createElement('div');
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      tempDiv.style.top = '-9999px';
      document.body.appendChild(tempDiv);
      
      // Create a temporary React root and render only the content
      const tempRoot = document.createElement('div');
      tempDiv.appendChild(tempRoot);
      
      // Render the content into the temporary div
      const content = document.createElement('div');
      content.style.width = '8.5in';
      content.style.background = 'white';
      tempRoot.appendChild(content);
      
      // Clone the resume content
      const clone = resumeRef.current.cloneNode(true) as HTMLElement;
      content.appendChild(clone);
      
      const canvas = await html2canvas(content, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });
      
      // Clean up the temporary elements
      document.body.removeChild(tempDiv);
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height],
      });
      
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save('resume.pdf');
      toast.success('Resume downloaded successfully!');
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to download resume. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b bg-white py-4 px-6 sticky top-0 z-10">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-primary">Professional Resume Builder</h1>
              <p className="text-sm text-muted-foreground">Create a standout resume in minutes</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto">
        <TemplateSelector />
      </div>

      <main className="flex-1 container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-2 pb-8">
          <div className="h-[800px] lg:min-h-[800px]">
            <ResumeEditor />
          </div>
          <div className="h-[800px] lg:min-h-[800px]">
            <ResumePreview onDownload={handleDownload} />
            <div style={{ display: 'none' }}>
              <ResumePrintContent ref={resumeRef} data={resumeData} />
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t py-6 bg-white">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Professional Resume Builder. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

// Wrapper component that provides the ResumeProvider
const Index = () => {
  return (
    <ResumeProvider>
      <ResumeBuilder />
    </ResumeProvider>
  );
};

export default Index;
