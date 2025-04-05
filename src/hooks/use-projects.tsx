
import { useState, createContext, useContext } from 'react';
import { Project } from '@/types/project';

// Sample data
const sampleProjects: Project[] = [
  {
    id: 1,
    title: "AI-Powered Campus Navigation System",
    description: "Develop a mobile app that uses AI to help students navigate the campus efficiently.",
    fullDescription: "This project aims to create an innovative navigation system for our university campus. The application will use computer vision and machine learning to recognize buildings, pathways, and points of interest. Students will be able to use the app to find the best routes between classes, locate resources, and discover campus events. The system should work both indoors and outdoors, and should be accessible to students with disabilities.",
    tags: ["Mobile Development", "AI/ML", "UX Design"],
    deadline: "May 15, 2025",
    postedDate: "April 1, 2025",
    teamSize: 4,
    isAdmin: true,
    progress: 25,
    requirements: [
      "Experience with mobile development (React Native or Flutter preferred)",
      "Knowledge of machine learning frameworks like TensorFlow or PyTorch",
      "Understanding of accessibility standards",
      "Ability to work collaboratively in a team environment"
    ],
    teamMembers: [
      {
        name: "Alex Johnson",
        role: "ML Engineer",
        avatar: "https://i.pravatar.cc/150?img=11"
      }
    ],
    adminContact: {
      name: "Dr. Sarah Williams",
      department: "Computer Science Department",
      email: "s.williams@university.edu",
      avatar: "https://i.pravatar.cc/150?img=32"
    }
  },
  {
    id: 2,
    title: "Sustainable Campus Waste Management",
    description: "Create a system to track and optimize waste management across campus buildings.",
    fullDescription: "Our university is committed to becoming more sustainable. This project focuses on developing a comprehensive waste management tracking system that will monitor waste collection across campus, identify trends, and suggest improvements. The team will need to develop IoT sensors for waste bins, a backend system for data processing, and a user-friendly dashboard for facilities management.",
    tags: ["IoT", "Data Analysis", "Sustainability"],
    deadline: "June 20, 2025",
    postedDate: "April 2, 2025",
    teamSize: 5,
    isAdmin: true,
    progress: 10,
    requirements: [
      "Experience with IoT devices and sensors",
      "Knowledge of data visualization and analytics",
      "Interest in environmental sustainability",
      "Basic understanding of database management"
    ],
    teamMembers: [
      {
        name: "Emily Chen",
        role: "IoT Specialist",
        avatar: "https://i.pravatar.cc/150?img=5"
      },
      {
        name: "Marcus Lee",
        role: "Data Analyst",
        avatar: "https://i.pravatar.cc/150?img=12"
      }
    ],
    adminContact: {
      name: "Prof. James Garcia",
      department: "Environmental Engineering",
      email: "j.garcia@university.edu",
      avatar: "https://i.pravatar.cc/150?img=33"
    }
  },
  {
    id: 3,
    title: "Virtual Study Group Platform",
    description: "Build a platform that connects students for virtual study sessions based on courses and schedules.",
    tags: ["Web Development", "UX/UI", "Backend"],
    deadline: "May 30, 2025",
    postedDate: "April 3, 2025",
    teamSize: 3,
    isAdmin: false,
    teamMembers: [
      {
        name: "Jordan Smith",
        role: "Frontend Developer",
        avatar: "https://i.pravatar.cc/150?img=3"
      }
    ]
  },
  {
    id: 4,
    title: "AR Chemistry Lab Simulator",
    description: "Create an augmented reality app that allows students to practice chemistry experiments virtually.",
    tags: ["AR/VR", "3D Modeling", "Education"],
    deadline: "July 10, 2025",
    postedDate: "April 4, 2025",
    teamSize: 4,
    isAdmin: true,
    teamMembers: []
  },
  {
    id: 5,
    title: "Peer-to-Peer Textbook Exchange",
    description: "Develop a secure platform for students to buy, sell, and trade textbooks on campus.",
    tags: ["Web Development", "E-commerce", "Database"],
    deadline: "June 5, 2025",
    postedDate: "April 5, 2025",
    teamSize: 4,
    isAdmin: false,
    teamMembers: [
      {
        name: "Taylor Reed",
        role: "Backend Developer",
        avatar: "https://i.pravatar.cc/150?img=7"
      },
      {
        name: "Sam Washington",
        role: "UI Designer",
        avatar: "https://i.pravatar.cc/150?img=9"
      },
      {
        name: "Jamie Park",
        role: "Database Specialist",
        avatar: "https://i.pravatar.cc/150?img=29"
      }
    ]
  },
  {
    id: 6,
    title: "Mental Health Support App",
    description: "Build a mobile application that provides mental health resources and support for students.",
    tags: ["Mobile Development", "Health", "UX Design"],
    deadline: "July 25, 2025",
    postedDate: "April 6, 2025",
    teamSize: 3,
    isAdmin: true,
    teamMembers: []
  }
];

interface ProjectContextType {
  projects: Project[];
  findProject: (id: number) => Project | undefined;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects] = useState<Project[]>(sampleProjects);
  
  const findProject = (id: number) => {
    return projects.find(project => project.id === id);
  };
  
  return (
    <ProjectContext.Provider value={{ projects, findProject }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  
  return context;
};
