
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { ArrowRight, Image, FileText, Car } from 'lucide-react';
import ImageUploader from '@/components/vehicle-analyzer/ImageUploader';
import VehicleForm from '@/components/vehicle-analyzer/VehicleForm';
import { AnimatePresence, motion } from 'framer-motion';

const steps = [
  { id: 'upload', title: 'Upload Images', icon: Image },
  { id: 'details', title: 'Vehicle Details', icon: Car },
  { id: 'analysis', title: 'Analysis', icon: FileText },
];

const VehicleAnalyzer = () => {
  const [currentStep, setCurrentStep] = useState('upload');
  const [images, setImages] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleImagesUploaded = (files: File[]) => {
    setImages(files);
    toast.success(`${files.length} images uploaded successfully`);
    setCurrentStep('details');
  };

  const handleDetailsSubmitted = (data: any) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Analysis complete!');
      navigate('/analysis-report/demo-123'); // Navigate to a demo report
    }, 3000);
  };

  return (
    <div className="container py-8 max-w-5xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Vehicle Condition Analyzer</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Evaluate second-hand cars with AI-powered analysis, legal checks, and price estimation.
        </p>
      </div>

      <div className="flex justify-center mb-8">
        <div className="flex items-center w-full max-w-3xl">
          {steps.map((step, idx) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                    currentStep === step.id 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  <step.icon className="h-5 w-5" />
                </div>
                <span className={`text-sm ${currentStep === step.id ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                  {step.title}
                </span>
              </div>
              
              {idx < steps.length - 1 && (
                <div className={`h-[2px] flex-1 mx-2 ${
                  steps.findIndex(s => s.id === currentStep) > idx ? 'bg-primary' : 'bg-muted'
                }`}></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <Card className="p-6">
        <AnimatePresence mode="wait">
          {currentStep === 'upload' && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ImageUploader onImagesUploaded={handleImagesUploaded} />
            </motion.div>
          )}
          
          {currentStep === 'details' && (
            <motion.div
              key="details"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <VehicleForm 
                onSubmit={handleDetailsSubmitted} 
                onBack={() => setCurrentStep('upload')}
                isLoading={isLoading}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </div>
  );
};

export default VehicleAnalyzer;
