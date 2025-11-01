export interface User {
  id: string;
  name: string;
  email: string;
  role: 'JOB_SEEKER' | 'RECRUITER' | 'ADMIN';
  profilePicture?: string;
  createdAt: string;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  company: string;
  location: string;
  salary: string;
  type: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERNSHIP';
  experience: string;
  skills: string[];
  postedBy: string;
  postedDate: string;
  deadline: string;
  status: 'ACTIVE' | 'CLOSED' | 'DRAFT';
}

export interface Application {
  id: string;
  jobId: string;
  userId: string;
  resumeUrl: string;
  coverLetter: string;
  status: 'PENDING' | 'REVIEWED' | 'ACCEPTED' | 'REJECTED';
  appliedDate: string;
  job?: Job;
  user?: User;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface JobFilters {
  search: string;
  location: string;
  type: string;
  experience: string;
  salary: string;
}