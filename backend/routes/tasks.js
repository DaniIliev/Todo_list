const express = require('express');
const db = require('../db');
const router = express.Router();

router.post('/', (req,res) => {
    const {title, description, due_date, userId, projectId} = req.body;

    const query = 'INSERT INTO tasks (title, description, due_date, user_id, project_id) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [title, description, due_date, userId,projectId], (err, result) => {
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

module.exports = router;