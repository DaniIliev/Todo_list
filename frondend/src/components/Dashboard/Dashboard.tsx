import React, { useEffect, useState } from 'react'
import { addTodo, deleteTodo, getTodos, toggleTodo } from '../../services/api';

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

const Dashboard = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState("");


    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const fetchedTodos = await getTodos();
                console.log('fs',fetchedTodos)
                setTodos(fetchedTodos);
            } catch (error) {
                console.error("Грешка при зареждане на задачите", error);
            }
        }

        fetchTodos()
    }, [])

    const handleAddTodo = async (e: React.FormEvent) => {
        e.preventDefault();
        if(newTodo.trim() !== ''){
            try {
                const addedTodo = await addTodo(newTodo);
                setTodos((prevTodos) => [...prevTodos, addedTodo])
                setNewTodo("")
            } catch (error) {
                console.error("Грешка при добавяне на задача", error);
            }
        }
    }

    const handleToggleCompleted = async (id: number, completed: boolean) => {
        try {
            const updatedTodo = await toggleTodo(id, !completed);
            setTodos((prevTodos) =>
              prevTodos.map((todo) =>
                todo.id === id ? { ...todo, completed: !completed } : todo
              )
            );
          } catch (error) {
            console.error("Грешка при актуализирането на задачата", error);
          }
    }
    const handleDeleteTodo = async (id:number) => {
        try {
            await deleteTodo(id)
            setTodos((prevTodos) => prevTodos.filter((todo) => todo.id == id));
        } catch (error) {
            console.error("Грешка при изтриване на задачата", error);
        }
    }
  return (
    <div className="dashboard container">
        <h2 className="dashboard__title">Моите задачи</h2>
        <form className="form dashboard__form" onClick={handleAddTodo}>
            <label htmlFor="new-todo" className="form__label">Нова задача</label>
            <input 
                type="text" 
                className="form__input" 
                id='new-todo' 
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}/>

                <button className="btn dashboard__button" type='submit'>Добави</button>
        </form>

        <ul className="dashboard__list">
            {todos?.map((todo) =>(
                <li>
                    <span 
                        className="dashboard__item-text"
                        onClick={() => handleToggleCompleted(todo.id, todo.completed)}
                        >
                        {todo.text}
                    </span>
                    <button 
                        className="btn dashboard__item-delete"
                        onClick={() => handleDeleteTodo(todo.id)}
                        >
                        Изтрий
                    </button>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default Dashboard