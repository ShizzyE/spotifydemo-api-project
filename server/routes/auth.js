const express = require('express');
const axios = require('axios');

const { User } = require('../models');
require('dotenv').config();

const router = express.Router();

// ENV Variables
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI_DEV; // Change as needed for production
const FRONTEND_URI = 'http://localhost:5173';


/* Routers */

// Redirect user to spotify's authorization page
router.get('/login', (req, res) => { 
    const scope = 'user-read-email';
    const queryParams = new URLSearchParams({
        response_type: 'code',
        client_id: CLIENT_ID,
        scope: scope,
        redirect_uri: REDIRECT_URI,
    });

    res.redirect('https://accounts.spotify.com/authorize?' + queryParams.toString());
});

// Handle callback from spotify after user authorizes app
router.get('/callback', async (req, res) => {
  const code = req.query.code || null;

  try {
    const tokenRes = await axios.post('https://accounts.spotify.com/api/token', querystring.stringify({
      code: code,
      redirect_uri: REDIRECT_URI,
      grant_type: 'authorization_code'
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')
      }
    });

    const { access_token, refresh_token, expires_in } = tokenRes.data;

    // Get Spotify user info
    const userRes = await axios.get('https://api.spotify.com/v1/me', {
      headers: { Authorization: 'Bearer ' + access_token }
    });

    const { id: spotifyId, email } = userRes.data;

    // Store or update user in DB
    await User.upsert({
      spotifyId,
      email,
      accessToken: access_token,
      refreshToken: refresh_token,
      expiresIn: expires_in
    });

    // Redirect to frontend
    res.redirect(`${FRONTEND_URI}/?loggedIn=true`);
  } catch (err) {
    console.error('OAuth error:', err.response?.data || err.message);
    res.status(500).send('Auth failed');
  }
});

module.exports = router;
