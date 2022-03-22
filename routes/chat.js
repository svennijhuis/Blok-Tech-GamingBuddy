const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: true }));

// render chat
router.get("/", (req, res) => {
  res.render("chat", {
    groepsnaam: req.query.room.charAt(0).toUpperCase() + req.query.room.slice(1)
  });
});

router.post("/", (req, res) => {
  res.redirect(`/messages?username=${req.body.username}&room=${req.body.room}`);
});

module.exports = router;
