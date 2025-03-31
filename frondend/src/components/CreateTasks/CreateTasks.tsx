import React, { useState, useEffect, useContext, useRef } from 'react';
import { UserContext } from '../../context/UserContext';
import { useParams } from 'react-router';
import { CreateTaskProps } from '../../types';

const CreateTask: React.FC<CreateTaskProps>  = ({showAddTaskModal ,setShowAddTaskModal}) => {
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');

    const {projectId} = useParams()

    const context = useContext(UserContext)
    if (!context) {  
        throw new Error("UserProfile must be used within a UserProvider");  
    }  
    const {user} = context;

    const modalRef = useRef<HTMLDivElement>(null);  

    useEffect(() => {  
      const handleClickOutside = (event: MouseEvent) => {  
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {  
            setShowAddTaskModal(false);
          }    
      };  
  
      if (showAddTaskModal) {  
        document.addEventListener('mousedown', handleClickOutside);  
      } else {  
        document.removeEventListener('mousedown', handleClickOutside);  
      }  
  
      return () => {  
        document.removeEventListener('mousedown', handleClickOutside);  
      };  
    }, [showAddTaskModal]);  
  
    if (!showAddTaskModal) return null; 

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!taskTitle || !projectId) {
            console.error('Заглавието и проектът са задължителни');
            return;
        }

        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5500/api/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                title: taskTitle,
                description: taskDescription,
                userId: user?.id,
                projectId: projectId,
            }),
        });

        const data = await response.json();
        if (response.ok) {
            console.log('Задачата е създадена успешно!', data);
            setShowAddTaskModal(false)
        } else {
            console.log('Грешка при създаването на задача:', data.message);
        }
    };

    return (
        <>
        <div className="addTask container" ref={modalRef}>
        <h3 className="addTask__title">Add Task</h3>  
            <form onSubmit={handleSubmit} className='form'>
            <label className='form__label'>Task Title</label>
            <input
                className='form__input'
                type="text"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                required
            />

            <label className='form__label'>Description</label>
            <textarea
                className='form__textarea'
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
            />

            <button className='btn' type="submit">Create Task</button>
        </form>
        </div>
        </>
    );
};

export default CreateTask;
