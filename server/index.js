require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');

const app = express();
const port = process.env.PORT || 3002;

// APP.USE 
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes)

app.get('/', (req, res) => {
  res.send({
    message: 'Server is running',
    welcome: 'Hello from the server!'
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${port}`);
});