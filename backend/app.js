const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

// Настройка на конфигурацията от .env файл
dotenv.config()

const app = express();

app.use(cors())
app.use(bodyParser.json())

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

