const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));

const {
    saveUser
} = require("../utils/register/saveUser");

// render register
router.get("/", (req, res) => {
 res.render("register");
});

router.post('/', async (req, res, next) => {
    console.log(req.body)
    saveUser(req.body)
});

module.exports = router;