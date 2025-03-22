const express = require('express');
const db = require('../db');
const router = express.Router();

router.post('/', (req,res) => {
    const {name} = req.body;

    const query = 'INSERT INTO tags (name) VALUES (?)';
    db.query(query, [name], (err, result) => {
        if(err) return res.status(500).json({message: 'Error creating tags'});

        res.status(201).json({message: 'Tag created successfully', tagId: result.insertId})
    })
})

router.post('/assign', (req,res) => {
    const {taskId, tagId} = req.body;

    db.query = 'INSERT INTO task_tags (task_id, tag_id) VALUES (?, ?)';
    db.query(query, [taskId, tagId], (err, result) => {
        if(err) return res.status(500).json({message: 'Error assigning tag to task'});

        res.status(201).json({message:'Tag assigned to task'});
    })
})

router.get('/task/:taskId', (req,res) => {
    const {taskId} = req.params;

    const query = `
    SELECT tags.id, tags.name 
    FROM tags
    JOIN task_tags ON tags.id = task_tags.tag_id
    WHERE task_tags.task_id = ?
    `;

    db.query(query, [taskId], (err, results) => {
        if(err) return res.status(500).json({message: 'Error fetching tags for task'})

        res.status(200).json(results)
    })
})

module.exports = router;