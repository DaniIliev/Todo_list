import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext';
import CreateProject from '../CreateProject/CreateProject';
import { Link } from 'react-router';
import * as projectService from '../../services/projectService'
import { Project } from '../../types';
import SideNav from '../shared/SideNav';

const Dashboard = () => {
    // const [projects, setProjects] = useState<Project[]>([]);

    const context = useContext(UserContext)

    if (!context) {  
        throw new Error("UserProfile must be used within a UserProvider");  
    }  

    const {user, projects} = context

    useEffect(() => {

        console.log('projects')
    }, [projects]);

  return (
    <>
    <div className="project">
        <SideNav projects={projects} /> 
    <div className="dashboard">
        <h1>Welcome, {user?.username}</h1>
        <div className="dashboard__container">
            <div className='dashboard__projects'>
                <h2>Your Projects</h2>
                <ul>
                    {projects?.map((project: Project) => (
                        <li key={project.id}>
                            <Link to={`/project/${project.id}`}>{project.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="dashboard__createProject">
                <CreateProject />
            </div>
        </div>
    </div>
    </div>
    </>
  )
}

export default Dashboard