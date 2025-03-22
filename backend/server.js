const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

// Настройка на конфигурацията от .env файл
dotenv.config()

const app = express();

app.use(cors({
    origin: 'http://localhost:5173', 
    methods: 'GET,POST,PUT,DELETE',  
    allowedHeaders: 'Content-Type,Authorization', 
  }));
  
app.use(bodyParser.json())

const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const taskRoutes = require('./routes/tasks');
const tagRoutes = require('./routes/tags');

// app.get('/api/todos', (req, res) => {
//   res.send([dsaadf, dads, das]);
// });

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/tags', tagRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

