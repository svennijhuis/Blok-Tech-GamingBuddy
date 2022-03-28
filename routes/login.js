const express = require("express");
const router = express.Router();
const passport = require('passport');

router.get('/', (req, res) => {
    const response = {
        error: req.query.error
    }
    res.render("login", response);
});

router.post('/', passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/login?error=true'
}));

// router.get('/logout', function(req, res) {
//     req.logout();
//     res.redirect('/');
// });

module.exports = router;