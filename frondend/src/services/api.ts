import axios from 'axios'

const API_URL = 'http://localhost:5500';

export const getTodos = async () => {
    try{
        // const response = await axios.get(`${API_URL}/api/todos`);
        const response = await fetch(`${API_URL}/api/projects`)
        const data = await response.json()
        console.log(data)
        return data;
    }catch(error) {
        console.error("Грешка при вземането на задачите", error)
    }
}

export const addTodo = async (text: String) => {
    try {
        const response = await axios.post(`${API_URL}/api/todos`,{
            text,
        })
        return response.data;
    } catch (error) {
        console.error("Грешка при добавянето на задача", error);
        throw error;
    }
}

export const toggleTodo = async (id: number, completed: boolean) => {
    try {
        const response = await axios.put(`${API_URL}/api/todos/${id}`, {
            completed,
          });
          return response.data;
    } catch (error) {
        console.error("Грешка при актуализирането на задачата", error);
        throw error;
    }
}

export const deleteTodo = async(id: number) => {
    try {
        const response = await axios.delete(`${API_URL}/api/todos/${id}`)
        return response.data;
    } catch (error) {
        console.error("Грешка при изтриването на задачата", error);
        throw error;    
    }
}