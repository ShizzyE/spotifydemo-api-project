const express = require("express");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.get('/search', requireAuth, (req, res) => { 
    // Placeholder
});

router.get('/tracks', requireAuth, (req, res) => { 
    // Placeholder
});

router.get('/playlists', requireAuth, (req, res) => { 
    // Placeholder
}); 

router.get('/tracks/:id', requireAuth, (req, res) => { 
    // Placeholder
});

module.exports = router;
