
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Home, Search, BookOpen, Users, Star } from 'lucide-react';

interface NavigationProps {
  variant?: 'horizontal' | 'vertical';
  closeMobileNav?: () => void;
}

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

const Navigation: React.FC<NavigationProps> = ({ 
  variant = 'horizontal',
  closeMobileNav = () => {} 
}) => {
  const location = useLocation();
  
  const navItems: NavItem[] = [
    {
      title: 'Home',
      href: '/',
      icon: <Home className="h-4 w-4" />
    },
    {
      title: 'Projects',
      href: '/projects',
      icon: <BookOpen className="h-4 w-4" />
    },
    {
      title: 'Discover',
      href: '/discover',
      icon: <Search className="h-4 w-4" />
    },
    {
      title: 'Teams',
      href: '/teams',
      icon: <Users className="h-4 w-4" />
    },
    {
      title: 'Favorites',
      href: '/favorites',
      icon: <Star className="h-4 w-4" />
    }
  ];
  
  return (
    <nav className={cn(
      variant === 'horizontal' ? 'flex items-center space-x-4' : 'flex flex-col space-y-3'
    )}>
      {navItems.map((item) => {
        const isActive = location.pathname === item.href;
        
        return (
          <Link
            key={item.href}
            to={item.href}
            onClick={closeMobileNav}
            className={cn(
              variant === 'horizontal'
                ? 'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring'
                : 'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
              isActive
                ? 'bg-primary text-primary-foreground shadow'
                : 'hover:bg-accent hover:text-accent-foreground'
            )}
          >
            {item.icon}
            <span>{item.title}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default Navigation;
