const express = require("express");
const axios = require("axios");
const requireAuth = require("../middleware/requireAuth");
const { User } = require("../models");
require("dotenv").config();

const router = express.Router();

router.get("/search", async (req, res) => {
  const { spotifyId, query, type } = req.query;
  try {
    // Make sure user has an access token
    const user = await User.findOne({ where: { spotifyId } });
    if (!user || !user.accessToken) {
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
      },
    });

    // Return Data

    const results = spotifyRes.data;

    res.json(results);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch search results" });
  }
});

router.get("/home", requireAuth, async (req, res) => {
  try {
    const { spotifyId } = req.user;

    const user = await User.findOne({ where: { spotifyId } });
    if (!user || !user.accessToken) {
      return res
        .status(403)
        .json({ message: "Access not available, must login" });
    }

    const headers = { Authorization: `Bearer ${user.accessToken}` };

    // Helper to safely fetch data
    const safeFetch = async (url) => {
      try {
        const response = await axios.get(url, { headers });
        return response.data;
      } catch (err) {
        if (err.response?.status === 404) return null; // Handle 404s gracefully
        console.error(`Error fetching ${url}:`, err.response?.data || err.message);
        return null;
      }
    };

   // Step 1: Fetch the top US playlists from the "toplists" category
    const topLists = await safeFetch(
      "https://api.spotify.com/v1/browse/categories/toplists/playlists?country=US&limit=1"
    );

    let trendingUS = [];
    if (topLists?.playlists?.items?.length > 0) {
      const topPlaylistId = topLists.playlists.items[0].id;

      // Step 2: Fetch the tracks of that playlist
      const topPlaylistData = await safeFetch(
        `https://api.spotify.com/v1/playlists/${topPlaylistId}/tracks?limit=5`
      );

      trendingUS = topPlaylistData?.items || [];
    }

    // Fetch other user-specific data
    const newReleases = await safeFetch(
      "https://api.spotify.com/v1/browse/new-releases?country=US&limit=3"
    );
    const recentlyPlayed = await safeFetch(
      "https://api.spotify.com/v1/me/player/recently-played?limit=5"
    );
    const topArtists = await safeFetch(
      "https://api.spotify.com/v1/me/top/artists?limit=5"
    );
    const likedSongs = await safeFetch(
      "https://api.spotify.com/v1/me/tracks?limit=5"
    );
    const playlists = await safeFetch(
      "https://api.spotify.com/v1/me/playlists?limit=5"
    );

    res.json({
      trending: trendingUS,
      newAlbums: newReleases?.albums?.items || [],
      userPlaylists: {
        recentlyPlayed: recentlyPlayed?.items || [],
        topArtists: topArtists?.items || [],
        likedSongs: likedSongs?.items || [],
        playlists: playlists?.items || [],
      },
    });
  } catch (error) {
    console.error("Homepage fetch error:", error.response?.data || error.message);
    res.status(500).json({ message: "Could not fetch homepage data" });
  }
});

module.exports = router;
