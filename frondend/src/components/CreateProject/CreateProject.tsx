import React, { useState } from 'react';

const CreateProject = () => {
    const [projectName, setProjectName] = useState('');

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
            console.log('Проектът е създаден успешно!', data);
        } else {
            console.log('Грешка при създаването на проект:', data.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='form project__form'>
            <label className='form__label'>Project Name</label>
            <input
                className='form__input'
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                required
            />
            <button type="submit" className='btn project__button'>Create Project</button>
        </form>
    );
};

export default CreateProject;
