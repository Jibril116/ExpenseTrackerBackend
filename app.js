const express = require('express');
const cors = require('cors');
const { db } = require('./db/db');
const { readdirSync } = require('fs');
const app = express();

require('dotenv').config();

// Set a default port if the environment variable is not defined
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000', // Change this if your frontend uses a different port
    credentials: true,
}));

app.get('/', (req, res) => {
    res.send('Welcome to the project  Backend!');
});


// Routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)));

// Start the server
const server = () => {
    try {
        // Connect to the database
        db();

        // Start listening on the specified port
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start the server:', error);
        process.exit(1); // Exit the process with failure
    }
};

server();
