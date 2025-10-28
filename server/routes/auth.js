const express = require("express");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const requireAuth = require("../middleware/requireAuth");
const querystring = require("querystring");
const { User } = require("../models");
require("dotenv").config();

const router = express.Router();

// ENV Variables
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI_DEV; // Change as needed for production
const FRONTEND_URI = "http://localhost:5173";

/* Routers */

// Redirect user to spotify's authorization page
router.get("/login", (req, res) => {
  
  const scope = "user-read-email";
  // Query string parameters for spotify auth
  const queryParams = new URLSearchParams({
    response_type: "code",
    client_id: CLIENT_ID,
    scope: scope,
    redirect_uri: REDIRECT_URI,
    show_dialog: "true",
  });

  res.redirect(
    "https://accounts.spotify.com/authorize?" + queryParams.toString()
  );
});

// Handle callback from spotify after user authorizes app
router.get("/callback", async (req, res) => {
  // Get authorization code from query parameters
  const code = req.query.code || null;

  try {
    // Exchange authorization code for access and refresh tokens
    const tokenRes = await axios.post(
      "https://accounts.spotify.com/api/token",
      querystring.stringify({
        // Send required data to exchange code for tokens
        code: code,
        redirect_uri: REDIRECT_URI,
        grant_type: "authorization_code",
      }),
      {
        // Sends headers required by Spotify API
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64"),
        },
      }
    );

    // Destructure tokens from response
    const { access_token, refresh_token, expires_in } = tokenRes.data;

    // Use access token for getting user info
    const userRes = await axios.get("https://api.spotify.com/v1/me", {
      headers: { Authorization: "Bearer " + access_token },
    });

    // Gets user data from response
    const { id: spotifyId, email } = userRes.data;

    // Store or update user in DB
    await User.upsert({
      spotifyId,
      email,
      accessToken: access_token,
      refreshToken: refresh_token,
      expiresIn: expires_in,
    });

    // Create my own JWT token for frontend
    const jwtToken = jwt.sign({ spotifyId }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Redirect to frontend
    res.redirect(`${FRONTEND_URI}/?loggedIn=${jwtToken}`);
  } catch (err) {
    console.error("OAuth error:", err.response?.data || err.message);
    res.status(500).send("Auth failed");
  }
});

// Refresh Token Logic 🔁🔁🔁
router.post("/refresh_token", async (req, res) => {
  const { spotifyId } = req.body;

  try {
    // Find user in DB
    const user = await User.findOne({ where: { spotifyId } });

    // Check if user and refresh token exist
    if (!user || !user.refreshToken) {
      return res.status(400).json({ message: "User/Refresh token not found" });
    }

    // Request new access token from Spotify
    const tokenRefreshRes = await axios.post(
      "https://accounts.spotify.com/api/token",
      querystring.stringify({
        grant_type: "refresh_token",
        refresh_token: user.refreshToken,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64"),
        },
      }
    );

    // Destructure new tokens from response
    const { access_token, expires_in } = tokenRefreshRes.data;

    // Update user's access token and expiry in DB
    user.accessToken = access_token;
    user.expiresIn = expires_in;
    await user.save();

    return res.json({
      access_token: access_token,
      expires_in: expires_in,
    });
  } catch (err) {
    console.error("Refresh token error:", err.response?.data || err.message);
    res.status(500).send("Could not refresh token");
  }
});

/* Validate JWT route */
// Protected route to validate JWT token
router.get("/validate", requireAuth, (req, res) => {
  res.json({ valid: true, user: req.user });
});

module.exports = router;
