const express = require("express");
const router = express.Router();

const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));

const session = require("express-session");
const passport = require("passport");
router.use(session({
  secret: "process.env.SESSION_SECRET",
  saveUninitialized: true,
  resave: true
}));
router.use(passport.initialize());
router.use(passport.session());

const { changeUser } = require("../utils/information/personInformation.js");

const {
  isLoggedIn
} = require("../utils/register/authentication");


router.get("/", isLoggedIn, (req, res) => {
  res.render("changeInformation");
});


let userData;

router.post("/information", isLoggedIn, (req, res) => {
  console.log(req.body.name);
  const newUserData = {
    name: req.body.name
  };

  changeUser(userData, newUserData);
});

module.exports = router;
