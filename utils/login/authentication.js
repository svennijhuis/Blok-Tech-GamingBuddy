const isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) { 
        return next(); 
    }
    res.redirect('/login');
}

const isLoggedOut = function (req, res, next) {
    if (!req.isAuthenticated()) { 
        return next(); 
    }
    res.redirect('/');
}

module.exports = { isLoggedIn, isLoggedOut };