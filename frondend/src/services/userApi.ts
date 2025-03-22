const API_URL = 'http://localhost:5500';

interface AuthResponse  {
    token: string;
  }
  
export const registerUser = async (username:String, password: String):Promise<AuthResponse | null> => {

    try {
        const response = await fetch(`${API_URL}/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({ username, password }), 
        });

        if(!response.ok) throw new Error('Грешка при регистрацията')
        
        const data: AuthResponse = await response.json();

        console.log(data)
        localStorage.setItem('token', data.token);

        return data;
    } catch (error) {
        console.error('Грешка при регистрация:', error instanceof Error ? error.message : 'Невалидна грешка');
        return null;
    }
}

export const loginUser = async (username:String, password: String):Promise<AuthResponse | null> => {

    try {
        const response = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({ username, password }), 
        });

        if(!response.ok) throw new Error('Грешка при регистрацията')
        
        const data: AuthResponse = await response.json();

        console.log(data)
        localStorage.setItem('token', data.token);

        return data;
    } catch (error) {
        console.error('Грешка при регистрация:', error instanceof Error ? error.message : 'Невалидна грешка');
        return null;
    }
}