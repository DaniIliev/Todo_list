export interface UserContextType {  
  user: User | null;  
  setUser: React.Dispatch<React.SetStateAction<User | null>>;  
}  


export interface User {  
    id: number;  
    username: string;  
}   