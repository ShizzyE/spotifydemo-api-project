// Load in express
const express = require('express');
// Create new express instance called app
const app = express();

// Connecting to front end
const path = require('path');
const cors = require('cors');


const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});