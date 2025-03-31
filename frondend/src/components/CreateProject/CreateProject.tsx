import React, { useEffect, useRef, useState } from 'react';
import { CreateProjectProps } from '../../types';

const CreateProject: React.FC<CreateProjectProps> = ({showAddProjectModal, setShowAddProjectModal}) => {
    const [projectName, setProjectName] = useState('');

     const modalRef = useRef<HTMLDivElement>(null);  
    
        useEffect(() => {  
          const handleClickOutside = (event: MouseEvent) => {  
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {  
                setShowAddProjectModal(false);
              }    
          };  
      
          if (showAddProjectModal) {  
            document.addEventListener('mousedown', handleClickOutside);  
          } else {  
            document.removeEventListener('mousedown', handleClickOutside);  
          }  
      
          return () => {  
            document.removeEventListener('mousedown', handleClickOutside);  
          };  
        }, [showAddProjectModal]);  
      
        if (!showAddProjectModal) return null;
     
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5500/api/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({projectName}),
        });

        const data = await response.json();
        if (response.ok) {
            setProjectName('')
            console.log('Проектът е създаден успешно!', data);
        } else {
            console.log('Грешка при създаването на проект:', data.message);
        }
    };

    

    return (
        <div className="addTask" ref={modalRef}>
        <form onSubmit={handleSubmit} className='form project__form'>
            <label className='form__label'>Create Project
            </label>
            <input
                placeholder='Enter your project name...'
                className='form__input'
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                required
            />
            <button type="submit" className='btn project__button'>Create Project</button>
        </form>
        </div>
    );
};

export default CreateProject;
