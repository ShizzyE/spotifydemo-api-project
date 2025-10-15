// Load in express
require('dotenv').config();
const express = require('express');

// Create new express instance called app
const app = express();

// Connecting to front end + other
const path = require('path');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded());
app.use(bodyParser.json())
app.use(cors());

// Routes
const routers = require('./routes/index.js')
const authRoutes = require('./routes/auth.js')

app.use('/auth', authRoutes);
app.use('/users', routers.user);
app.use('/favorite_tracks', routers.favorite_track);
// app.use('/favorites', routers.favorite)


app.listen(process.env.PORT || 3001, () => {
    console.log(`Server is running on port ${PORT}`)
});