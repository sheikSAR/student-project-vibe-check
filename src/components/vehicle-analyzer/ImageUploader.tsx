
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Upload, X, Image, Info, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

interface ImageUploaderProps {
  onImagesUploaded: (files: File[]) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImagesUploaded }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      // Limit to 5 images
      const newFiles = [...files, ...acceptedFiles].slice(0, 5);
      setFiles(newFiles);
      
      // Create previews
      const newPreviews = newFiles.map(file => URL.createObjectURL(file));
      setPreviews(newPreviews);
      
      if (acceptedFiles.length + files.length > 5) {
        toast.info("Maximum 5 images allowed. Extra images were ignored.");
      }
    }
  }, [files]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 5,
  });

  const removeImage = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    
    const newPreviews = [...previews];
    URL.revokeObjectURL(newPreviews[index]);
    newPreviews.splice(index, 1);
    setPreviews(newPreviews);
  };

  const handleSubmit = () => {
    if (files.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }
    onImagesUploaded(files);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">Upload Vehicle Images</h2>
        <p className="text-muted-foreground">
          Upload clear photos of the vehicle from different angles for best analysis results
        </p>
      </div>
      
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors 
        ${isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/20 hover:border-primary/50'}`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center space-y-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <Upload className="h-8 w-8 text-primary" />
          </div>
          <div className="space-y-1">
            <p className="text-base font-medium">Drag photos here or click to upload</p>
            <p className="text-sm text-muted-foreground">
              Support for JPG, PNG, WEBP (max 5 images)
            </p>
          </div>
        </div>
      </div>

      {previews.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Uploaded Images ({previews.length}/5)</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => {
                setFiles([]);
                previews.forEach(URL.revokeObjectURL);
                setPreviews([]);
              }}
            >
              Clear All
            </Button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {previews.map((preview, index) => (
              <motion.div 
                key={preview} 
                className="relative aspect-square rounded-md overflow-hidden border"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src={preview} 
                  alt={`Vehicle preview ${index + 1}`}
                  className="h-full w-full object-cover"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(index);
                  }}
                  className="absolute top-1 right-1 bg-background/80 p-1 rounded-full hover:bg-background"
                >
                  <X className="h-4 w-4" />
                </button>
              </motion.div>
            ))}
            
            {Array.from({ length: Math.max(0, 5 - previews.length) }).map((_, index) => (
              <div 
                key={`empty-${index}`} 
                className="aspect-square rounded-md border border-dashed border-muted-foreground/20 flex items-center justify-center"
              >
                <Image className="h-6 w-6 text-muted-foreground/40" />
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="flex justify-between items-center pt-4">
        <div className="flex items-start gap-2 text-sm text-muted-foreground">
          <Info className="h-4 w-4 mt-0.5" />
          <p>For best results, include exterior, interior, dashboard, and engine images</p>
        </div>
        
        <Button 
          onClick={handleSubmit}
          disabled={files.length === 0}
          className="gap-2"
        >
          Continue <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ImageUploader;
