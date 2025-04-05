
import React, { useState } from 'react';
import ProjectCard from '@/components/ProjectCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter } from 'lucide-react';
import { useProjects } from '@/hooks/use-projects';
import { Project } from '@/types/project';

const Projects = () => {
  const { projects } = useProjects();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  
  const allTags = Array.from(
    new Set(
      projects.flatMap(project => project.tags)
    )
  );
  
  const toggleFilter = (tag: string) => {
    if (activeFilters.includes(tag)) {
      setActiveFilters(activeFilters.filter(t => t !== tag));
    } else {
      setActiveFilters([...activeFilters, tag]);
    }
  };
  
  const filteredProjects = projects.filter(project => {
    const matchesSearch = 
      searchTerm === '' ||
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesFilters =
      activeFilters.length === 0 ||
      project.tags.some(tag => activeFilters.includes(tag));
      
    return matchesSearch && matchesFilters;
  });
  
  return (
    <div className="container py-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-4">Available Projects</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Browse through available projects posted by administrators. 
          Apply to join teams and collaborate with fellow students.
        </p>
      </div>
      
      <div className="mb-8 bg-muted/30 p-4 rounded-lg border">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm whitespace-nowrap">Filter by:</span>
            {allTags.map(tag => (
              <Badge
                key={tag}
                variant={activeFilters.includes(tag) ? "default" : "outline"} 
                className="cursor-pointer"
                onClick={() => toggleFilter(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      
      {filteredProjects.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-medium mb-2">No projects found</h2>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => {
              setSearchTerm('');
              setActiveFilters([]);
            }}
          >
            Clear filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;
