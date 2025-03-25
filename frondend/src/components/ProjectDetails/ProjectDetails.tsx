import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import CreateTask from '../CreateTasks/CreateTasks';
import * as tasksService from '../../services/tasksService'
import { Task } from '../../types';
import { UserContext } from '../../context/UserContext';
import { Project } from '../../types';
const ProjectDetails = () => {
    const { projectId } = useParams<{ projectId: string }>();   
    const project_id = projectId ? Number(projectId) : undefined; 

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

    }, [projectId]);

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

    return (
        <>
        
        <div className="project">  
                {/* <h2 className="project__name">Project Details</h2>   */}
                
                <div className="project__list">
                    <h2 className='project__list-title'>Your Projects</h2>
                    <ul className="project__list-ul">
                        {projects?.map((project: Project) => (
                            <li className='project__list-item'>{project.name}</li>
                        ))}
                    </ul>
                </div>
                <div className="project__tasks">  
                    <h2 className="project__tasks-title">Tasks</h2>  
                    <div className="project__tasks-container">  
                        <div className="project__tasks-todo">  
                            <h3 className="project__tasks-section-title">Todo</h3>  
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
