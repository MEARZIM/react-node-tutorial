const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRouter = require('./routes/auth');
const db = require('./config/db');

// Environment variables set up
const dotenv = require('dotenv');
dotenv.config();

// Initialize the app
const app = express();

// Middleware
app.use(bodyParser.json())
app.use(cors());

// Routes
app.use('/api/auth', authRouter);

// Port forwarding
const PORT = process.env.PORT || 5000;

// Database connection
db();

// server configuration
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});