const express = require("express");
const router = express.Router();

const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));

const session = require('express-session');
const passport = require('passport');
router.use(session({ 
  secret: 'process.env.SESSION_SECRET', 
  saveUninitialized: true, 
  resave: true 
}));
router.use(passport.initialize());
router.use(passport.session());

const {
  getAllRooms,
  filterRooms
} = require("../utils/filters/loadRooms");

const { 
  isLoggedIn 
} = require("../utils/register/authentication");


router.get("/", isLoggedIn, async (req, res) => {
  const allRooms = await getAllRooms();

  // ophalen rooms database
  res.render("filter", {
    gameRooms: allRooms
  });
});

router.post("/filter", async (req, res) => {
  const filteredRooms = await filterRooms(req.body);
  console.log(filteredRooms);

  // ophalen dieren database en deze weergeven op de localhost:8000.
  res.render("filter", {
    gameRooms: filteredRooms
  });
  // res.redirect(`/filter?taal=${req.body.taal}`);
});

module.exports = router;
