const express = require('express');
const db = require('../db');
const router = express.Router();

router.post('/', (req,res) => {
    const {title, description, userId, projectId} = req.body;

    const query = 'INSERT INTO tasks (title, description, user_id, project_id) VALUES (?, ?, ?, ?)';
    db.query(query, [title, description, userId,projectId], (err, result) => {
        if(err) return res.status(500).json({message: 'Error creating task'});
        
        res.status(201).json({message: 'Task create successfully', taskId: result.insertId});
    })
})

router.get('/:projectId', (req, res) => {
    const {projectId} = req.params;

    const query = 'SELECT * FROM tasks WHERE project_id = ?';
    db.query(query, [projectId], (err, result) => {
        if(err) return res.status(500),json({message: 'Error fetching tasks'});

        res.status(200).json(result)
    })
})

router.put('/:id', (req, res) => {  
    const taskId = req.params.id;  
    const { status } = req.body;   
    console.log('hello', taskId, status)
    const query = 'UPDATE tasks SET status = ? WHERE id = ?';  
    db.query(query, [status, taskId], (error, results) => {  
        if (error) {  
            return res.status(500).json({ message: 'Error updating task', error });  
        }  
        if (results.affectedRows === 0) {  
            return res.status(404).json({ message: 'Task not found' });  
        }  
        res.status(200).json({ message: 'Task updated successfully' });  
    });  
});  

module.exports = router;