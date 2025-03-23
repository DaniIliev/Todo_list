import { createContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface UserContextType {  
    user: User | null;  
    setUser: React.Dispatch<React.SetStateAction<User | null>>;  
}  


const UserContext = createContext<UserContextType | null>(null);

const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {  
      const fetchUser = async () => {  
        const token = localStorage.getItem("token");  
        if (token) { 
          try {  
            const response = await fetch('http://localhost:5500/api/auth/me', {  
              headers: {  
                Authorization: `Bearer ${token}`,  
              },  
            });  
  
            if (!response.ok) {  
              throw new Error('Network response was not ok');  
            }  
  
            const userData = await response.json();  
            setUser(userData);  
          } catch (error) {  
            console.error('Failed to fetch user:', error);  
          }  
        }  
      };  

      fetchUser();  
    }, []);

  return(  
    <UserContext.Provider value={{ user, setUser }}>  
      {children}  
    </UserContext.Provider>  
  ); 
};

export { UserContext, UserProvider };