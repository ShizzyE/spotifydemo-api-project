// Load in express
require("dotenv").config();
require("./config/passport");

const express = require("express");
const passport = require("passport");

// Create new express instance called app
const app = express();

// Other middleware
const cors = require("cors");
const bodyParser = require("body-parser");

// Connecting to front end + other
const path = require("path");
const axios = require("axios");

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());

// Routes
const routers = require("./routes/index.js");
const authRoutes = require("./routes/auth.js");

app.use("/auth", authRoutes);
app.use("/users", routers.user);
app.use("/favorite_tracks", routers.favorite_track);
// app.use('/favorites', routers.favorite)

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(process.env.PORT || 3001, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
