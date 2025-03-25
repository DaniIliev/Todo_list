export interface UserContextType {  
  user: User | null; 
  projects: Project[] | null; 
  setUser: React.Dispatch<React.SetStateAction<User | null>>;  
} 

export interface Project {  
  id: number;           
  name: string;       
  userId?: number;     
  createdAt: Date;     
}  

export interface User {  
    id: number;  
    username: string;  
}   

export interface Task {  
  id: number;  
  title: string;  
  description: string; 
  status: 'Pending' | 'In Progress' | 'Done';  
  user_id: number;  
  project_id: number;  
  created_at: Date; 
}  