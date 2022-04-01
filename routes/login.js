const express = require("express");
const router = express.Router();

const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
router.use(session({ 
  secret: 'process.env.SESSION_SECRET', 
  saveUninitialized: true, 
  resave: true 
}));
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(passport.initialize());
router.use(passport.session());

const { 
  isLoggedOut
} = require("../utils/register/authentication");

// render login
router.get('/', isLoggedOut, (req,res) => {
    const response = {
      error: req.query.error
    }
    res.render("login", response);
});


// post to login
router.post('/', passport.authenticate('local-signin', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
    })
);

module.exports = router;