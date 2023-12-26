const express = require('express');
const cors = require('cors'); // Import the cors package
const app = express();

// Configure environment variables
const dotenv = require('dotenv');
dotenv.config();

// Configure Middleware
app.use(cors());

// Configure Routers
const recipeRouter = require('./routes/recipeRouter'); // Replace with the path to your router file
app.use('/api', recipeRouter); // Mount the router at '/api'

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});