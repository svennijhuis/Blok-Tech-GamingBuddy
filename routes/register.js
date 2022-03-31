const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));
const { sendWelcomeEmail } = require('../utils/email/email.js');

const {
    saveUser
} = require("../utils/register/saveUser");

// render register
router.get("/", (req, res) => {
 res.render("register");
});

router.post('/', async (req, res, next) => {

    const user = req.body;
    await saveUser(user)
    console.log(user)
    sendWelcomeEmail(user.name, user.email);
});

module.exports = router;