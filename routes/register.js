const express = require("express");
const router = express.Router();

const session = require("express-session");
const passport = require("passport");
router.use(session({
  secret: "process.env.SESSION_SECRET",
  saveUninitialized: true,
  resave: true
}));
router.use(passport.initialize());
router.use(passport.session());

const {
  isLoggedOut
} = require("../utils/register/authentication");


// render register
router.get("/", isLoggedOut, (req, res) => {
  res.render("register");
});


// post to register
router.post("/", passport.authenticate("local-signup", {
  successRedirect: "/",
  failureRedirect: "/register",
  failureFlash: true
  })
);

module.exports = router;
