import React, { useState } from 'react'
import { Project, SideNavProps } from '../../types'
import { Link, useParams } from 'react-router-dom'
import { IoMdAddCircleOutline } from 'react-icons/io'
import CreateProject from '../CreateProject/CreateProject'


const SideNav: React.FC<SideNavProps> = ({ projects }) => {
    const { projectId } = useParams();  
    const id = Number(projectId); 

    const [showAddProjectModal, setShowAddProjectModal] = useState<boolean>(false)

    
  return (
    <>
        <div className="project__list">
            <h2 className='project__list-title'>Your Projects
               <IoMdAddCircleOutline 
                className='project__tasks-section-title-addIcon  project__addIcon'
                onClick={() => setShowAddProjectModal(true)}
                />
            </h2>
            <ul className="project__list-ul">
                {projects?.map((project: Project) => (
                    <Link 
                        to={`/project/${project.id}`} 
                        key={project.id} 
                        className={`project__list-item ${project.id === id ? 'active' : ''}`} 
                        ><li>{project.name}</li></Link>
                ))}
            </ul>
        </div>

        {showAddProjectModal && 
            <div className="addTaskModal">
                <CreateProject showAddProjectModal={showAddProjectModal} setShowAddProjectModal={setShowAddProjectModal}/>  
                      
            </div>  

        }
    </> 
  )
}

export default SideNav