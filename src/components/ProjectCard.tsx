
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Users } from 'lucide-react';
import { Project } from '@/types/project';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  return (
    <Card 
      className={cn(
        "project-card animate-fade-in flex flex-col h-full",
        "transition-all duration-300 hover:border-primary/50"
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative">
        <div 
          className="h-48 bg-gradient-to-r from-accent/70 to-primary/70 flex items-center justify-center p-5"
        >
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8),transparent)]"></div>
          <h3 className="text-2xl font-bold text-white text-center z-10">
            {project.title}
          </h3>
        </div>
        
        {project.isAdmin && (
          <div className="absolute top-3 left-3">
            <span className="admin-badge animate-pulse-slow">Admin Post</span>
          </div>
        )}
      </div>
      
      <div className="flex-1 p-5 flex flex-col">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="project-tag">
              {tag}
            </Badge>
          ))}
        </div>
        
        <p className="text-muted-foreground mb-5 flex-grow">
          {project.description}
        </p>
        
        <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{project.deadline}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            <span>{project.teamSize}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t">
          <div className="flex -space-x-2">
            {project.teamMembers.slice(0, 3).map((member, i) => (
              <Avatar key={i} className="border-2 border-background h-8 w-8">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback>{member.name[0]}</AvatarFallback>
              </Avatar>
            ))}
            
            {project.teamMembers.length > 3 && (
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted text-muted-foreground text-xs border-2 border-background">
                +{project.teamMembers.length - 3}
              </div>
            )}
          </div>
          
          <Link to={`/projects/${project.id}`}>
            <Button variant="ghost" size="sm" className="gap-1 group">
              View
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;
