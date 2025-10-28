const express = require("express");
const axios = require("axios");
const requireAuth = require("../middleware/requireAuth");
const { User } = require("../models/user");
require("dotenv").config();

const router = express.Router();

router.get("/search", async (req, res) => {
  const { spotifyId, query, type } = req.query;
  try {
    // Make sure user has an access token
    const user = await User.findOne({ where: { spotifyId } });
    if (!user || !user.access.Token) {
      return res
        .status(403)
        .json({ message: "Access not available, must login" });
    }

    // Make req to spotify API
    const spotifyRes = await axios.get("https://api.spotify.com/v1/search", {
      params: {
        q: query,
        type: type,
        limit: 10,
      },
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      }
    });

    // Return Data

    const results = spotifyRes.data;

    res.json(results);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch search results" });
  }
});

module.exports = router;
