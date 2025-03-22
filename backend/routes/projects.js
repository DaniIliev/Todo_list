const express = require('express');
const db = require('../db');
const router = express.Router();

router.post('/', (req,res) => {
    const {name, userId} = req.body;

    const query = 'INSERT INTO projects (name, user_id) VALUES (?, ?)';
    db.query(query, [name, userId], (err, result) => {
        if(err) return res.status(500).json({message: 'Error creating project'})
        
        res.status(201).json({message: 'Project created successfully', projectId: result.insertId})
    });
});

router.get('/:userId', (req, res) => {
    const {userId} = req.params;

    const query = 'SELECT * FROM projects WHERE user_id = ?';
    db.query(query, [userId], (err, results) => {
        if(err) return res.status(500).json({message: 'Error fetching projects'});

        res.status(200).json(results)
    });
})

module.exports = router;

