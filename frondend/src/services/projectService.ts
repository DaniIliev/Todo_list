const API_URL = 'http://localhost:5500';


export const fetchProjects = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/api/projects`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    const data = await response.json();
    if (response.ok) {
        return data;
    } else {
        console.error('Failed to fetch projects:', data.message);
    }
};