import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CreateTask from '../CreateTasks/CreateTasks';

const ProjectDetails = () => {
    const { projectId } = useParams();

    const [tasks, setTasks] = useState<any[]>([]);
    const [tags] = useState(['frontend', 'backend']); // Статични тагове

    useEffect(() => {
        const fetchTasks = async () => {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5500/api/tasks/${projectId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const data = await response.json();
            if (response.ok) {
                setTasks(data);
            } else {
                console.error('Failed to fetch tasks:', data.message);
            }
        };

        fetchTasks();
    }, [projectId]);

    const handleTaskStatusChange = async (taskId: number, status: string) => {
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
        setTasks((prevTasks) =>  
            prevTasks.map((task) =>  
                task.id === taskId ? { ...task, status: status } : task  
            )  
        );
    };

    return (
        <>
        
        <div className="project">  
                {/* <h2 className="project__name">Project Details</h2>   */}
                <div className="project__list">
                    <ul className="projects__list">
                        <li>Лични задачи</li>
                        <li>ToDo list app</li>
                    </ul>
                </div>
                <div className="project__tasks">  
                    <h2 className="project__tasks-title">Tasks</h2>  
                    <div className="project__tasks-container">  
                        <div className="project__tasks-todo">  
                            <h3 className="project__tasks-section-title">Todo</h3>  
                            <ul className="project__tasks-list">  
                                {tasks.filter(task => !task.completed && task.status === 'Pending').map(task => (  
                                    <li key={task.id} className="project__tasks-item">  
                                        <span className="project__tasks-title">{task.title} - Pending</span>  
                                        <button className="btn project__tasks__button orange" onClick={() => handleTaskStatusChange(task.id, 'In Progress')}>  
                                            In Progress &rarr;
                                        </button>  
                                        <div className="project__tasks-tags">  
                                            {tags.map(tag => (  
                                                <span key={tag} className="project__tag">{tag}</span>  
                                            ))}  
                                        </div>  
                                    </li>  
                                ))}  
                            </ul>  
                        </div>  

                        <div className="project__tasks-doing">  
                            <h3 className="project__tasks-section-title">In Progress</h3>  
                            <ul className="project__tasks-list">  
                                {tasks.filter(task => !task.completed && task.status === 'In Progress').map(task => (  
                                    <li key={task.id} className="project__tasks-item">  
                                        <span className="project__tasks-title">{task.title} - In Progress</span>  
                                        <button className="btn project__tasks__button green" onClick={() => handleTaskStatusChange(task.id, 'Done')}>  
                                            DONE &rarr;
                                        </button>  
                                        <div className="project__tasks-tags">  
                                            {tags.map(tag => (  
                                                <span key={tag} className="project__tag">{tag}</span>  
                                            ))}  
                                        </div>  
                                    </li>  
                                ))}  
                            </ul>  
                        </div>  

                        <div className="project__tasks-done">  
                            <h3 className="project__tasks-section-title">Done</h3>  
                            <ul className="project__tasks-list">  
                                {tasks.filter(task => task.completed || task.status === 'Done').map(task => (  
                                    <li key={task.id} className="project__tasks-item">  
                                        <span className="project__tasks-title">{task.title} - Done</span>  
                                        <div className="project__tasks-tags">  
                                            {tags.map(tag => (  
                                                <span key={tag} className="project__tag">{tag}</span>  
                                            ))}  
                                        </div>  
                                    </li>  
                                ))}  
                            </ul>  
                        </div>  
                    </div>  
                </div>  
        </div>  
            <h3 className="project__add-task-title">Add Task</h3>  
            <CreateTask />  
        </>
    );
};

export default ProjectDetails;
