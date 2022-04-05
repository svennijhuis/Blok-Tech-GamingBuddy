require("dotenv").config();

const bcrypt = require("bcryptjs");

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
    isLoggedIn
} = require("../utils/register/authentication");

const {
    changeAccountInfo
} = require("../utils/register/changeAccountInfo");


// render account
router.get("/", isLoggedIn, (req, res) => {
    res.render("account", {
        user: req.user
    });
});


// post to account
router.post("/", isLoggedIn, async (req, res) => {
    const pass = req.body.password;
    const hash = bcrypt.hashSync(req.body.password, 10); // hash given password

    const oldUserInfo = {
        name: req.user.name,
        email: req.user.email,
        age: req.user.age,
        residence: req.user.residence,
        username: req.user.username,
        password: req.user.password
    };

    const newUserInfo = {
        $set: {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
            residence: req.body.residence,
            username: req.body.username
          }
        };

    if (pass !== "") {
        const verification = bcrypt.compareSync(req.body.confirm_password, hash); // check if password === confirm_password

        if (verification) {
            newUserInfo.$set.password = hash;
        } else {
            // rerender page with message
            res.render("account", {
                user: req.user,
                message: "Passwords don't match, please try again"
            });
            return;
        }
    }
    await changeAccountInfo(oldUserInfo, newUserInfo);
    res.redirect("/logout");
});

module.exports = router;
