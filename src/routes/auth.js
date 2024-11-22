// routes/auth.js
const express = require("express");
const passport = require("passport");
const { google } = require("googleapis");
const User = require("../models/User");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const router = express.Router();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      let user = await User.findOne({ googleId: profile.id });
      if (!user) {
        user = new User({
          googleId: profile.id,
          email: profile.emails[0].value,
          accessToken,
        });
        await user.save();
      } else {
        user.accessToken = accessToken;
        await user.save();
      }
      done(null, user);
    }
  )
);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email", "https://www.googleapis.com/auth/calendar"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("http://localhost:3000/dashboard");
  }
);

router.get("/status", (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({ loggedIn: true });
  } else {
    return res.json({ loggedIn: false });
  }
});

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: "Failed to log out" });
    req.session.destroy((err) => {
      if (err)
        return res.status(500).json({ message: "Failed to destroy session" });
      res.clearCookie("connect.sid");
      res.status(200).json({ message: "Logged out successfully" });
    });
  });
});

module.exports = router;
