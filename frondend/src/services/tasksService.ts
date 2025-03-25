const API_URL = 'http://localhost:5500';

export const fetchTasks = async (projectId:number) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/api/tasks/${projectId}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    const data = await response.json();
    if (response.ok) {
        return data;
    } else {
        console.error('Failed to fetch tasks:', data.message);
    }
};

export const taskStatusChange = async (taskId: number, status: 'Pending' | 'In Progress' | 'Done') => {
    const token = localStorage.getItem('token');  
    const response = await fetch(`http://localhost:5500/api/tasks/${taskId}`, {  
        method: 'PUT',  
        headers: {  
            'Content-Type': 'application/json',  
            'Authorization': `Bearer ${token}`,  
        },  
        body: JSON.stringify({ status: status }),  
    });  

    if (!response.ok) {  
        const errorText = await response.text();   
        console.error('Неуспешно обновяване на статуса на задачата:', errorText);  
        return; 
    }  

    const data = await response.json();  
    return data; 
};