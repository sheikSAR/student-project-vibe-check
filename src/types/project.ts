
export interface TeamMember {
  name: string;
  role: string;
  avatar: string;
}

export interface AdminContact {
  name: string;
  department: string;
  email: string;
  avatar: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  fullDescription?: string;
  tags: string[];
  deadline: string;
  postedDate: string;
  teamSize: number;
  teamMembers: TeamMember[];
  isAdmin: boolean;
  progress?: number;
  requirements?: string[];
  adminContact?: AdminContact;
}
