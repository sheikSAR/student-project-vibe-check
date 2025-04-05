
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, Search } from 'lucide-react';
import { useProjects } from '@/hooks/use-projects';
import ProjectCard from '@/components/ProjectCard';

const Index = () => {
  const { projects } = useProjects();
  const featuredProjects = projects.slice(0, 3);
  
  return (
    <div className="flex flex-col min-h-[90vh]">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 hero-gradient opacity-90 z-0"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ4MCIgaGVpZ2h0PSI2NTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+ICAgIDxwYXRoIGQ9Ik03MzkuNSAyLjVjLTE0NC41IDAtMjYxLjUgMTE3LjItMjYxLjUgMjYxLjhTNTk1IDE1NDIuMiA3MzkuNSAxNTQyLjJjMTQ0LjUgMCAyNjEuNS01MzMuNyAyNjEuNS02NzguMyAwLTE0NC42LTExNy0yNjEuNC0yNjEuNS0yNjEuNCIgZmlsbD0ibm9uZSIgb3BhY2l0eT0iLjQiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIzIi8+ICAgIDxwYXRoIGQ9Ik03NDAuNSAyMDIuNWMtMzMuOSAwLTYxLjUgMjcuNi02MS41IDYxLjVzMjcuNiA2MS41IDYxLjUgNjEuNSA2MS41LTI3LjYgNjEuNS02MS41LTI3LjYtNjEuNS02MS41LTYxLjV6IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMiIvPiAgICA8cGF0aCBkPSJNNzQwLjUgMmMtMTQ0LjkgMC0yNjIuNSAxMTcuNi0yNjIuNSAyNjIuNVMxNDE0LjkgODUyIDEyNzkuNSA4NTJjMTQ1IDAgMjYyLjUtNDQyLjQgMjYyLjUtNTg3LjVTODg1LjUgMiA3NDAuNSAyeiIgZmlsbD0ibm9uZSIgb3BhY2l0eT0iLjQiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIzIi8+PC9zdmc+Cg==')] bg-no-repeat bg-right-top opacity-20 z-0"></div>
        
        <div className="container relative z-10">
          <div className="max-w-2xl space-y-6">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Discover & Join Student Projects
              </h1>
              <p className="mt-4 text-lg text-white/80">
                Explore projects posted by administrators, join teams, and collaborate with
                fellow students to gain real-world experience.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: "100ms" }}>
              <Link to="/projects">
                <Button variant="default" size="lg" className="gap-2 bg-white text-primary hover:bg-white/90">
                  Browse Projects
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/admin">
                <Button variant="outline" size="lg" className="text-white border-white hover:bg-white/20">
                  Admin Dashboard
                </Button>
              </Link>
            </div>
            
            <div className="flex gap-8 mt-6 pt-6 border-t border-white/20 animate-fade-in" style={{ animationDelay: "200ms" }}>
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <div className="text-white">
                  <p className="font-bold text-2xl">50+</p>
                  <p className="text-white/80 text-sm">Projects</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div className="text-white">
                  <p className="font-bold text-2xl">200+</p>
                  <p className="text-white/80 text-sm">Students</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Search className="h-5 w-5 text-white" />
                </div>
                <div className="text-white">
                  <p className="font-bold text-2xl">15+</p>
                  <p className="text-white/80 text-sm">Categories</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Projects */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold">Featured Projects</h2>
              <p className="text-muted-foreground">
                Check out these highlighted projects from our administrators
              </p>
            </div>
            
            <Link to="/projects">
              <Button variant="outline" className="mt-4 md:mt-0">
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* How it Works */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join projects and collaborate with fellow students in a few simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Browse Projects",
                description: "Explore projects posted by administrators across various fields and disciplines.",
                icon: <BookOpen className="h-6 w-6" />
              },
              {
                title: "Apply to Join",
                description: "Submit your application to join projects that match your interests and skills.",
                icon: <Users className="h-6 w-6" />
              },
              {
                title: "Collaborate & Learn",
                description: "Work with your team members to complete the project and gain valuable experience.",
                icon: <Search className="h-6 w-6" />
              }
            ].map((step, index) => (
              <div 
                key={index} 
                className="p-6 rounded-lg bg-background border flex flex-col items-center text-center animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/projects">
              <Button size="lg">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
