
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { useProjects } from '@/hooks/use-projects';
import { useNavigate } from 'react-router-dom';
import { Project } from '@/types/project';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const Admin = () => {
  const { projects } = useProjects();
  const navigate = useNavigate();
  const [tab, setTab] = useState('projects');
  
  const adminProjects = projects.filter(project => project.isAdmin);
  
  const handleCreateProject = () => {
    toast.success("This functionality would allow admins to create new projects");
  };
  
  const handleEditProject = (id: number) => {
    toast.info(`Editing project ${id}`);
  };
  
  const handleDeleteProject = (id: number) => {
    toast.success(`Project ${id} deleted`);
  };
  
  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage projects and student applications</p>
        </div>
        
        <Button onClick={handleCreateProject} className="gap-2">
          <PlusCircle className="h-4 w-4" />
          Create New Project
        </Button>
      </div>
      
      <Tabs value={tab} onValueChange={setTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="projects" className="animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>Your Projects</CardTitle>
              <CardDescription>
                Manage projects you've created for students
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                {adminProjects.length === 0 ? (
                  <div className="text-center py-6 text-muted-foreground">
                    No projects created yet
                  </div>
                ) : (
                  adminProjects.map(project => (
                    <div 
                      key={project.id} 
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg border hover:bg-accent/10 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{project.title}</h3>
                          <span className="admin-badge text-xs">Admin</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mt-2">
                          {project.tags.slice(0, 3).map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="text-sm text-muted-foreground mt-2">
                          {project.teamMembers.length}/{project.teamSize} team members
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigate(`/projects/${project.id}`)}
                        >
                          View
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => handleEditProject(project.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleDeleteProject(project.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
            
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={handleCreateProject}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add New Project
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="applications" className="animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>Student Applications</CardTitle>
              <CardDescription>
                Review and manage student applications to your projects
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <p>No pending applications at the moment</p>
                <Button variant="link" onClick={() => setTab('projects')}>
                  Go to projects
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
