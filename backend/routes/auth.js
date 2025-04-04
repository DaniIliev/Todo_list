const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');
const dotenv = require('dotenv');
const {findOneByID} = require('../services/UserService');
const authenticateToken = require('../utills/authenticateToken');
dotenv.config();

const router = express.Router();

router.get('/me', authenticateToken, async (req, res) => {  
    const userId = req.user.userId;

    try {
      const user = await findOneByID(userId);
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user data' });
    } 
});  

router.post('/register', (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    const checkQuery = 'SELECT * FROM users WHERE username = ?';
    db.query(checkQuery, [username], (err, results) => {
        if (err) return res.status(500).json({ message: 'Error checking for existing user' });
        if (results.length > 0) {
            return res.status(400).json({ message: 'Username is already taken' });
        }

        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) return res.status(500).json({ message: 'Error hashing password' });

            const query = 'INSERT INTO users (username, password) VALUES(?, ?)';
            db.query(query, [username, hashedPassword], (err, result) => {
                if (err) return res.status(500).json({ message: 'Error registering user' });

                res.status(201).json({ message: 'User registered successfully' });
            });
        });
    });
});


router.post('/login', (req,res) => {
    const {username, password} = req.body;

    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], (err, results) => {
        if(err) return res.status(500).json({message: 'Error fetching user'});
        if(results.length == 0) return res.status(404).json({message: 'User not found'});

        const user = results[0];

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if(err) return res.status(500).json({message: 'Error comparing passwords'});
            if(!isMatch) return res.status(401).json({message: 'Invalid credentials'});

            const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET, { expiresIn: '1h' });
            const data = {
                token: token,
                username: user.username
            }
            res.status(200).json(data)
        })
    })
})

module.exports = router;