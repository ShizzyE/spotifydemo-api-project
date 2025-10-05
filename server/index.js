// Load in express
const express = require('express');
// Create new express instance called app
const app = express();

// Connecting to front end + other
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded());
app.use(bodyParser.json())

// Routes
const routers = require('./routes/index.js')

app.use('/users', routers.user);
app.use('/favorites', routers.favorite)


// Set app port Connection
const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});