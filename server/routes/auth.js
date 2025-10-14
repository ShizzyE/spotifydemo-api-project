const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Redirect user to Spotify login
router.get(
  "/spotify",
  passport.authenticate("spotify", {
    scope: ["user-read-email", "user-read-private"], // Ask permission for email/profile
  })
);

// Spotify redirects back with user info
router.get(
  "/spotify/callback",
  passport.authenticate("spotify", {
    session: false,
    failureRedirect: "/login",
  }),
  (req, res) => {
    // Create a JWT to give to the frontend
    const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Send token to frontend (redirect with token or send JSON response)
    res.redirect(`http://localhost:3000/oauth-success?token=${token}`);
    // res.json({ token }); // Optional
  }
);

module.exports = router;
