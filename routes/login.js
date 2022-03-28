const express = require("express");
const router = express.Router();
const passport = require('passport');

router.get('/', isLoggedIn, (req, res) => {
    res.render("main");
});

router.get('/login', isLoggedOut, (req, res) => {
    const response = {
        error: req.query.error
    }
    res.render("login", response);
});

router.post('/login', passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/login?error=true'
}));

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});