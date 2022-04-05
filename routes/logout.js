const express = require("express");
const router = express.Router();

const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
router.use(session({
  secret: "process.env.SESSION_SECRET",
  saveUninitialized: true,
  resave: true
}));
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(passport.initialize());
router.use(passport.session());


// logout
router.get("/", (req, res) => {
    const name = req.user.username;
    console.log(`Logout ${req.user.username}`);
    req.logout();
    res.redirect("/");
    req.session.notice = `Succesfully logged out ${name}!`;
});

module.exports = router;