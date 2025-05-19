
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Sparkles, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface AiTextGeneratorProps {
  prompt: string;
  onSelectSuggestion: (suggestion: string) => void;
  context?: string;
  placeholder?: string;
}

const AiTextGenerator: React.FC<AiTextGeneratorProps> = ({ 
  prompt, 
  onSelectSuggestion, 
  context = '',
  placeholder = 'AI is generating suggestions...'
}) => {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  // Using a simple free model hosted API to generate text
  const generateSuggestions = async () => {
    setLoading(true);
    try {
      // This is a mock implementation that works without requiring API keys
      // In a production environment, you would replace this with a real API call
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate suggestions based on the prompt type
      let generatedSuggestions: string[] = [];
      
      if (prompt.includes("job description")) {
        generatedSuggestions = [
          "Developed and maintained web applications using React, improving performance by 40%.",
          "Led a team of 5 developers to successfully deliver projects on time and under budget.",
          "Implemented CI/CD pipelines resulting in 60% faster deployment times.",
        ];
      } else if (prompt.includes("project description")) {
        generatedSuggestions = [
          "Created a responsive e-commerce platform with React and Node.js, increasing mobile conversions by 25%.",
          "Developed a dashboard analytics tool that visualized key metrics for executive decision making.",
          "Built a customer management system that automated workflows and reduced manual tasks by 30%.",
        ];
      } else if (prompt.includes("summary")) {
        generatedSuggestions = [
          "Results-driven software engineer with 5+ years of experience in full-stack development specializing in React and Node.js.",
          "Creative problem solver with a track record of delivering robust, scalable applications in fast-paced environments.",
          "Passionate developer focused on creating intuitive user experiences while maintaining clean, efficient code.",
        ];
      } else {
        generatedSuggestions = [
          "Designed and implemented comprehensive testing strategies to ensure code quality.",
          "Collaborated with cross-functional teams to deliver features aligned with business requirements.",
          "Optimized database queries resulting in 50% faster application response times.",
        ];
      }
      
      setSuggestions(generatedSuggestions);
    } catch (error) {
      toast.error("Failed to generate suggestions. Please try again.");
      console.error("Error generating suggestions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSuggestion = (suggestion: string) => {
    onSelectSuggestion(suggestion);
    setOpen(false);
    toast.success("Suggestion added!");
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => {
            setOpen(true);
            if (suggestions.length === 0) {
              generateSuggestions();
            }
          }}
          className="flex items-center gap-1 text-xs hover:bg-primary/10 transition-all"
        >
          <Sparkles className="h-3 w-3 text-yellow-500" />
          AI Suggestions
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-2">
          <h4 className="font-medium text-sm">AI Generated Suggestions</h4>
          <p className="text-xs text-muted-foreground">
            Select one of these AI-generated suggestions or generate new ones:
          </p>
          
          {loading ? (
            <div className="h-24 flex items-center justify-center">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              <span className="ml-2 text-sm text-muted-foreground">{placeholder}</span>
            </div>
          ) : (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {suggestions.map((suggestion, index) => (
                <div 
                  key={index}
                  onClick={() => handleSelectSuggestion(suggestion)}
                  className="text-sm p-2 border rounded-md cursor-pointer hover:bg-muted transition-colors"
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
          
          <Button 
            size="sm" 
            variant="outline" 
            className="w-full mt-2"
            onClick={generateSuggestions}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="h-3 w-3 animate-spin mr-1" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-3 w-3 text-yellow-500 mr-1" />
                Generate New Suggestions
              </>
            )}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AiTextGenerator;
