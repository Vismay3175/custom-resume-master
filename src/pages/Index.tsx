
import React, { useRef } from 'react';
import { ResumeProvider } from '@/components/ResumeContext';
import ResumeEditor from '@/components/ResumeEditor';
import ResumePreview from '@/components/ResumePreview';
import TemplateSelector from '@/components/TemplateSelector';
import { toast } from 'sonner';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const Index = () => {
  const resumeRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!resumeRef.current) return;
    toast.info('Preparing your resume for download...');

    try {
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
      });
      
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
    <ResumeProvider>
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
            <div className="h-[800px] lg:min-h-[800px]" ref={resumeRef}>
              <ResumePreview onDownload={handleDownload} />
            </div>
          </div>
        </main>

        <footer className="border-t py-6 bg-white">
          <div className="container mx-auto text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Professional Resume Builder. All rights reserved.
          </div>
        </footer>
      </div>
    </ResumeProvider>
  );
};

export default Index;
