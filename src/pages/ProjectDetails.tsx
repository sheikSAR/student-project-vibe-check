
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Users, ArrowLeft, CheckCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useProjects } from '@/hooks/use-projects';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { findProject } = useProjects();
  const project = findProject(id ? parseInt(id) : 0);
  
  if (!project) {
    return (
      <div className="container max-w-4xl py-10 text-center">
        <h1 className="text-2xl font-bold mb-4">Project not found</h1>
        <Link to="/projects">
          <Button>Back to Projects</Button>
        </Link>
      </div>
    );
  }
  
  const handleJoinProject = () => {
    toast.success("Applied to join project! The admin will review your application.");
  };

  return (
    <div className="container max-w-4xl py-8 animate-fade-in">
      <div className="mb-6">
        <Link to="/projects" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Projects
        </Link>
      </div>
      
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold">{project.title}</h1>
              {project.isAdmin && <span className="admin-badge">Admin Post</span>}
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {project.tags.map(tag => (
                <Badge key={tag} variant="outline" className="project-tag">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button onClick={handleJoinProject} className="animate-scale-in">
              Apply to Join
            </Button>
          </div>
        </div>
        
        <div className="p-6 bg-muted/30 rounded-lg border animate-fade-in" style={{ animationDelay: "100ms" }}>
          <div className="flex flex-col md:flex-row justify-between gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Posted: <span className="font-medium">{project.postedDate}</span></span>
            </div>
            
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>Deadline: <span className="font-medium text-orange-600">{project.deadline}</span></span>
            </div>
            
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>Team size: <span className="font-medium">{project.teamSize}</span></span>
            </div>
            
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
              <span>Status: <span className="font-medium text-green-600">Open</span></span>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="description" className="animate-fade-in" style={{ animationDelay: "200ms" }}>
          <TabsList className="grid grid-cols-3 w-full md:w-auto">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="requirements">Requirements</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="mt-4 space-y-4">
            <p className="leading-relaxed">{project.fullDescription || project.description}</p>
            
            <div>
              <h3 className="font-semibold mb-2">Project Progress</h3>
              <Progress value={project.progress || 10} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">
                Project is {project.progress || 10}% complete
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="requirements" className="mt-4">
            <ul className="space-y-2">
              {project.requirements?.map((req, idx) => (
                <li key={idx} className="flex items-start">
                  <div className="mr-2 mt-0.5 h-5 w-5 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                    {idx + 1}
                  </div>
                  <span>{req}</span>
                </li>
              )) || (
                <li>No specific requirements listed for this project.</li>
              )}
            </ul>
          </TabsContent>
          
          <TabsContent value="team" className="mt-4">
            <div className="space-y-4">
              <h3 className="font-semibold">Current Team Members</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.teamMembers.map((member, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-background rounded-md border">
                    <Avatar>
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                ))}
                
                {Array(project.teamSize - project.teamMembers.length).fill(0).map((_, idx) => (
                  <div key={`empty-${idx}`} className="flex items-center gap-3 p-3 bg-background rounded-md border border-dashed animate-pulse-slow">
                    <div className="h-10 w-10 rounded-full bg-muted"></div>
                    <div>
                      <p className="font-medium">Open Position</p>
                      <p className="text-sm text-muted-foreground">Join the team!</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <Separator />
        
        <div className="animate-fade-in" style={{ animationDelay: "300ms" }}>
          <h2 className="text-xl font-semibold mb-4">Admin Contact</h2>
          
          <div className="flex items-center gap-3 p-4 bg-background rounded-md border">
            <Avatar className="h-12 w-12">
              <AvatarImage src={project.adminContact?.avatar} alt={project.adminContact?.name} />
              <AvatarFallback className="bg-primary text-white text-lg">
                {project.adminContact?.name ? project.adminContact.name[0] : 'A'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-semibold">{project.adminContact?.name || "Project Admin"}</p>
              <p className="text-sm text-muted-foreground">{project.adminContact?.department || "Computer Science Department"}</p>
              <p className="text-sm text-primary mt-1">{project.adminContact?.email || "admin@university.edu"}</p>
            </div>
            <Button variant="outline" size="sm" className="animate-float">
              Contact
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
