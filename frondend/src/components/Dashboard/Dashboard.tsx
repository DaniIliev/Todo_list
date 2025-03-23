import React, { useContext, useEffect, useState } from 'react'
// import { addTodo, deleteTodo, getTodos, toggleTodo } from '../../services/api';
import { UserContext } from '../../context/UserContext';
import CreateProject from '../CreateProject/CreateProject';
import { Link } from 'react-router';


// interface Todo {
//     id: number;
//     text: string;
//     completed: boolean;
// }

const Dashboard = () => {
    const [projects, setProjects] = useState<any[]>([]);

    const context = useContext(UserContext)

    if (!context) {  
        throw new Error("UserProfile must be used within a UserProvider");  
    }  

    const {user} = context

    useEffect(() => {
        const fetchProjects = async () => {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5500/api/projects', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const data = await response.json();
            console.log(data)
            if (response.ok) {
                setProjects(data);
            } else {
                console.error('Failed to fetch projects:', data.message);
            }
        };

        fetchProjects();
    }, []);

    // const handleAddTodo = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     if(newTodo.trim() !== ''){
    //         try {
    //             const addedTodo = await addTodo(newTodo);
    //             setTodos((prevTodos) => [...prevTodos, addedTodo])
    //             setNewTodo("")
    //         } catch (error) {
    //             console.error("Грешка при добавяне на задача", error);
    //         }
    //     }
    // }

    // const handleToggleCompleted = async (id: number, completed: boolean) => {
    //     try {
    //         const updatedTodo = await toggleTodo(id, !completed);
    //         setTodos((prevTodos) =>
    //           prevTodos.map((todo) =>
    //             todo.id === id ? { ...todo, completed: !completed } : todo
    //           )
    //         );
    //       } catch (error) {
    //         console.error("Грешка при актуализирането на задачата", error);
    //       }
    // }
    // const handleDeleteTodo = async (id:number) => {
    //     try {
    //         await deleteTodo(id)
    //         setTodos((prevTodos) => prevTodos.filter((todo) => todo.id == id));
    //     } catch (error) {
    //         console.error("Грешка при изтриване на задачата", error);
    //     }
    // }

  return (
    <div className="dashboard container">
        <h1>Добре дошъл, {user?.username}</h1>
        <h2 className="dashboard__title">Твоите проекти</h2>

        <div>
            <h2>Projects</h2>
            <ul>
                {projects.map((project) => (
                    <li key={project.id}>
                        <Link to={`/project/${project.id}`}>{project.name}</Link>
                    </li>
                ))}
            </ul>
        </div>

        <CreateProject />
        
    </div>
  )
}

export default Dashboard