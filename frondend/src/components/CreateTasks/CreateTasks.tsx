import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { useParams } from 'react-router';

const CreateTask = () => {
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');

    const {projectId} = useParams()

    const context = useContext(UserContext)
    if (!context) {  
        throw new Error("UserProfile must be used within a UserProvider");  
    }  
    const {user} = context

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
        } else {
            console.log('Грешка при създаването на задача:', data.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Task Title</label>
            <input
                type="text"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                required
            />

            <label>Description</label>
            <textarea
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
            />

            <button type="submit">Create Task</button>
        </form>
    );
};

export default CreateTask;
