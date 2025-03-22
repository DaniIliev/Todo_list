import React, { useState } from 'react'

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

const Dashboard = () => {
    const [todos, setTodos] = useState<Todo[]>([
        { id: 1, text: "Направи домашното", completed: false },
        { id: 2, text: "Измий колата", completed: true },
        { id: 3, text: "Почисти стаята", completed: false },
      ]);
      
    const [newTodo, setNewTodo] = useState("");

    const handleAddTodo = (e: React.FormEvent) => {
        e.preventDefault();
        if(newTodo.trim() !== ''){
            setTodos([
                ...todos,
                {id: Date.now(), text: newTodo, completed: false}
            ])
            setNewTodo("")
        }
    }

    const handleToggleCompleted = (id: number) => {
        setTodos(
            todos.map((todo) => (
                todo.id == id ? {...todo, completed: !todo.completed} : todo
            )
            )
        )
    }
    const handleDeleteTodo = (id:number) => {
        setTodos(todos.filter((todo) => todo.id == id));
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
            {todos.map((todo) =>(
                <li>
                    <span 
                        className="dashboard__item-text"
                        onClick={() => handleToggleCompleted(todo.id)}
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