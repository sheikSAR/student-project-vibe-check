
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { VehicleImage } from '@/types/vehicle';
import { ChevronLeft, ChevronRight, ZoomIn, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface VehicleImageViewerProps {
  images: VehicleImage[];
}

const VehicleImageViewer: React.FC<VehicleImageViewerProps> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const currentImage = images[currentImageIndex];

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      handlePrevious();
    } else if (e.key === 'ArrowRight') {
      handleNext();
    } else if (e.key === 'Escape') {
      setShowFullscreen(false);
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col gap-6">
          <div className="relative">
            <div className="aspect-[16/9] bg-muted rounded-lg overflow-hidden relative">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={currentImage.url}
                  alt={`Vehicle Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
              </AnimatePresence>

              {currentImage.annotations?.map((annotation, index) => (
                <div
                  key={index}
                  className="absolute w-6 h-6 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 animate-pulse"
                  style={{ left: `${annotation.x}%`, top: `${annotation.y}%` }}
                >
                  <div
                    className={`w-6 h-6 rounded-full bg-opacity-70 flex items-center justify-center text-white text-xs font-bold ${
                      annotation.severity === 'high'
                        ? 'bg-red-500'
                        : annotation.severity === 'medium'
                        ? 'bg-amber-500'
                        : 'bg-blue-500'
                    }`}
                  >
                    {index + 1}
                  </div>
                </div>
              ))}

              <Button
                size="icon"
                variant="secondary"
                className="absolute bottom-3 right-3 bg-background/80 hover:bg-background"
                onClick={() => setShowFullscreen(true)}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>

            <Button
              size="icon"
              variant="outline"
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 hover:bg-background"
              onClick={handlePrevious}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 hover:bg-background"
              onClick={handleNext}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {images.map((image, idx) => (
              <div
                key={image.id}
                className={`aspect-square rounded-md overflow-hidden cursor-pointer transition-all ${
                  idx === currentImageIndex ? 'ring-2 ring-primary' : 'opacity-70 hover:opacity-100'
                }`}
                onClick={() => setCurrentImageIndex(idx)}
              >
                <img
                  src={image.url}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {currentImage.annotations && currentImage.annotations.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-medium">Issues Detected</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {currentImage.annotations.map((annotation, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-sm p-2 rounded-md bg-muted"
                  >
                    <div
                      className={`w-4 h-4 rounded-full flex items-center justify-center text-white text-xs ${
                        annotation.severity === 'high'
                          ? 'bg-red-500'
                          : annotation.severity === 'medium'
                          ? 'bg-amber-500'
                          : 'bg-blue-500'
                      }`}
                    >
                      {idx + 1}
                    </div>
                    <span>{annotation.label}</span>
                    <span
                      className={`ml-auto text-xs px-2 py-0.5 rounded ${
                        annotation.severity === 'high'
                          ? 'bg-red-100 text-red-800'
                          : annotation.severity === 'medium'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {annotation.severity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>

      {showFullscreen && (
        <div
          className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center p-4"
          tabIndex={0}
          onKeyDown={handleKeyDown}
        >
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-4 right-4"
            onClick={() => setShowFullscreen(false)}
          >
            <XCircle className="h-6 w-6" />
          </Button>
          <div className="relative max-w-5xl w-full">
            <img
              src={currentImage.url}
              alt={`Vehicle Image ${currentImageIndex + 1} Fullscreen`}
              className="w-full h-auto max-h-[80vh] object-contain"
            />

            {currentImage.annotations?.map((annotation, index) => (
              <div
                key={index}
                className="absolute w-8 h-8 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 animate-pulse"
                style={{ left: `${annotation.x}%`, top: `${annotation.y}%` }}
              >
                <div
                  className={`w-8 h-8 rounded-full bg-opacity-70 flex items-center justify-center text-white font-bold ${
                    annotation.severity === 'high'
                      ? 'bg-red-500'
                      : annotation.severity === 'medium'
                      ? 'bg-amber-500'
                      : 'bg-blue-500'
                  }`}
                >
                  {index + 1}
                </div>
              </div>
            ))}

            <Button
              size="icon"
              variant="outline"
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 hover:bg-background"
              onClick={handlePrevious}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 hover:bg-background"
              onClick={handleNext}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default VehicleImageViewer;
