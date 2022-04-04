require("dotenv").config();

const mongoConnect = require("../controller/mongoConnect");

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

router.use((req, res, next) => {
    const error = req.session.error;
  
    delete req.session.error;
  
    if (error) res.locals.error = error;
  
    next();
});

// render account
router.get("/", (req, res) => {
    res.render("account", {
        user: req.user
    });
});


// post to account
router.post("/", async (req,res) => {
    const client = await mongoConnect.getDB();
    
    const hash = bcrypt.hashSync(req.body.password, 10);
    const verification = bcrypt.compareSync(req.body.confirm_password, hash);
    
    if (verification) {
        client
        .db("users")
        .collection("user")
        .updateOne(
        { name: req.user.name,
            email: req.user.email,
            age: req.user.age,
            residence: req.user.residence, 
            username: req.user.username,
            password: req.user.password,
            confirm_password: req.user.confirm_password
        }, 
        {$set: {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
            residence: req.body.residence, 
            username: req.body.username,
            password: hash,
            confirm_password: verification
        }}
        ) 
        res.redirect("/");
    } else {
        console.log("fail");
    }
    
    
});

module.exports = router;