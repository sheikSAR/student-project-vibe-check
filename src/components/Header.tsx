
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Search, Bell, Menu } from 'lucide-react';
import Navigation from './Navigation';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const isMobile = useIsMobile();
  
  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-30">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
          
          <Link 
            to="/" 
            className={cn(
              "flex items-center gap-2 font-bold text-xl",
              "bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600"
            )}
          >
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M12 2L2 7L12 12L22 7L12 2Z" 
                className="fill-indigo-500" 
              />
              <path 
                d="M2 17L12 22L22 17" 
                className="stroke-purple-600" 
                strokeWidth="2" 
              />
              <path 
                d="M2 12L12 17L22 12" 
                className="stroke-indigo-500" 
                strokeWidth="2" 
              />
            </svg>
            ProjectVibe
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Navigation variant="horizontal" />
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 flex h-2 w-2 rounded-full bg-red-500"></span>
            <span className="sr-only">Notifications</span>
          </Button>
          
          <Button variant="outline" size="icon">
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
          
          <Link to="/admin">
            <Button variant="default">Admin</Button>
          </Link>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMobile && (
        <div className={cn(
          "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm",
          isOpen ? "animate-in fade-in-0" : "animate-out fade-out-0 hidden"
        )}>
          <div className="fixed inset-y-0 left-0 z-50 w-3/4 max-w-xs bg-white shadow-lg animate-in slide-in-from-left">
            <div className="flex flex-col h-full p-6">
              <Link 
                to="/" 
                className="flex items-center gap-2 font-bold text-xl mb-8"
                onClick={() => setIsOpen(false)}
              >
                <svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M12 2L2 7L12 12L22 7L12 2Z" 
                    className="fill-indigo-500" 
                  />
                  <path 
                    d="M2 17L12 22L22 17" 
                    className="stroke-purple-600" 
                    strokeWidth="2" 
                  />
                  <path 
                    d="M2 12L12 17L22 12" 
                    className="stroke-indigo-500" 
                    strokeWidth="2" 
                  />
                </svg>
                ProjectVibe
              </Link>
              <Navigation variant="vertical" closeMobileNav={() => setIsOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
