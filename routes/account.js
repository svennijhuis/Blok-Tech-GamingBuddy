require("dotenv").config();

const mongoConnect = require("../controller/mongoConnect");

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


// render account
router.get("/", (req, res) => {
    res.render("account", {
        user: req.user
    });
});


// post to account
router.post("/", async (req,res) => {
    const client = await mongoConnect.getDB();
    
    client
    .db("users")
    .collection("user")
    .updateOne(
      { name: req.user.name,
        email: req.user.email,
        age: req.user.age,
        residence: req.user.residence, 
        username: req.user.username
      }, 
      {$set: {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        residence: req.body.residence, 
        username: req.body.username
      }}
    ) 
    res.redirect("/");
});

module.exports = router;