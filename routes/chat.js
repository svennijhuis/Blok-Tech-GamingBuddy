const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: true }));

const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, "public/uploads/");
    },
    filename: function (request, file, callback) {
        console.log(file);
        callback(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// render chat
router.get("/", (req, res) => {
  res.render("chat", {
    groepsnaam: req.query.room.charAt(0).toUpperCase() + req.query.room.slice(1)
  });
});

// stuur user naar chat met username en room als query parameters
router.post("/", (req, res) => {
  res.redirect(`/messages?username=${req.body.username}&room=${req.body.room}`);
});

// upload custom groep afbeelding
router.post("/roomimg", upload.single("groepimg"), function (req, res) {
  res.status(204).end();
});

module.exports = router;
