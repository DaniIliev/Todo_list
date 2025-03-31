import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import CreateTask from '../CreateTasks/CreateTasks';
import * as tasksService from '../../services/tasksService'
import { Task } from '../../types';
import { UserContext } from '../../context/UserContext';
import { IoMdAddCircleOutline } from "react-icons/io";
import SideNav from '../shared/SideNav';
import { FaTrash } from 'react-icons/fa';
const ProjectDetails = () => {
    const { projectId } = useParams<{ projectId: string }>();   
    const project_id = projectId ? Number(projectId) : undefined; 
    const [showAddTaskModal, setShowAddTaskModal] = useState(false)
    const userContext = useContext(UserContext); 
    if (!userContext) {  
        throw new Error("UserProfile must be used within a UserProvider");  
    } 

    const {projects} = userContext; 

    const [tasks, setTasks] = useState<Task[]>([]);
    const [tags] = useState(['frontend', 'backend']); 

    useEffect(() => {
        if(project_id != undefined){
            tasksService.fetchTasks(project_id)
                        .then(data => setTasks(data));
        }

    }, [projectId, projects]);

    const handleTaskStatusChange = async (taskId: number, status: 'Pending' | 'In Progress' | 'Done') => {
        tasksService.taskStatusChange(taskId, status)
                    .then(() => {
                        setTasks((prevTasks) =>  
                            prevTasks.map((task) =>  
                                task.id === taskId ? { ...task, status: status } : task  
                            )  
                        );
                    })
    };

    const handleDelete = async (id: number) => {
        try {  
            const response = await fetch(`http://localhost:5500/api/tasks/${id}`, {  
                method: 'DELETE',  
                headers: {  
                    'Content-Type': 'application/json'  
                }  
            });  

            if (!response.ok) {  
                throw new Error('Network response was not ok ' + response.statusText);  
            }  
            const data = await response.json();  
            alert(data.message);  
        } catch (error) {  
            console.error('Error deleting user:', error);  
        }  
    }

    return (
        <> 
        <div className="project">  
                <SideNav projects={projects} /> 
                <div className="project__tasks">  
                    <h2 className="project__tasks-title">Tasks</h2>  
                    <div className="project__tasks-container">  
                        <div className="project__tasks-todo">  
                            <h3 className="project__tasks-section-title">
                                Todo
                                 <IoMdAddCircleOutline 
                                 className='project__tasks-section-title-addIcon'
                                 onClick={() => setShowAddTaskModal(true)}/>
                            </h3>  
                            <ul className="project__tasks-list">  
                                {tasks.filter(task => task.status === 'Pending').map(task => (  
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
                                {tasks.filter(task => task.status === 'In Progress').map(task => (  
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
                                {tasks.filter(task => task.status === 'Done').map(task => (  
                                    <li key={task.id} className="project__tasks-item">  
                                        <FaTrash className='project__icon-delete' onClick={() => handleDelete(task.id)}/>
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
        
        {showAddTaskModal && 
        <div className="addTaskModal">
            <CreateTask showAddTaskModal={showAddTaskModal} setShowAddTaskModal={setShowAddTaskModal}/>  
        </div> }
        </>
    );
};

export default ProjectDetails;
