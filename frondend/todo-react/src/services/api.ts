import axios from 'axios'

export const getTodos = async () => {
    try{
        const response = await axios.get("http://localhost:5000/api/todos");
        return response.data;
    }catch(error) {
        console.error("Грешка при вземането на задачите", error);
        throw error;
    }
}

export const addTodo = async (text: String) => {
    try {
        const response = await axios.post("http://localhost:5000/api/todos",{
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
        const response = await axios.put(`http://localhost:5000/api/todos/${id}`, {
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
        const response = await axios.delete(`http://localhost:5000/api/todos/${id}`)
        return response.data;
    } catch (error) {
        console.error("Грешка при изтриването на задачата", error);
        throw error;    
    }
}