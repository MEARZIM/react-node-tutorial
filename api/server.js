const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Environment variables set up
const dotenv = require('dotenv');
dotenv.config();

// Initialize the app
const app = express();

// Middleware
app.use(bodyParser.json())
app.use(cors());

// Routes
app.use('/api/auth', async (req, res) => {
    console.log("Hello")
    res.send("success");
});


// Port forwarding
const PORT = process.env.PORT || 5000;

// server configuration
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});