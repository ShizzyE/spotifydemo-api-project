const passport = require("passport");
const SpotifyStrategy = require("passport-spotify").Strategy;
const { User } = require("../models/user");
const jwt = require("jsonwebtoken");

passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      callbackURL: process.env.SPOTIFY_CALLBACK_URL,
    },
    async (accessToken, refreshToken, expires_in, profile, done) => {
      try {
        // Find a user with the spotify ID
        let user = await User.findOne({ where: { spotifyId: profile.id } });

        // No user found? create one ->
        if (!user) {
          user = await User.create({
            spotifyId: profile.id,
            email: profile.emails?.[0]?.value || null, // Grab email from Spotify (if available)
            name: profile.displayName, // Display name from Spotify profile
          });
        }

        // Sends user info to next step
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);
