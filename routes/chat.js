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
        callback(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

const { changeRoomInfo } = require("../utils/filters/changeRoomInfo");

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
// moet nog error handling hebben, bijvoorbeeld als bepaalde velden niet worden ingevuld. Dit is de basis - Laurens
router.post("/roomimg", upload.single("groepimg"), function (req, res) {
  if (!req.file) return;
  const newRoomData = {
    omschrijving: req.body.omschrijving,
    taal: req.body.taal,
    img: `uploads/${req.file.filename}`
  };

  changeRoomInfo(newRoomData);
  res.status(204).end();
});

module.exports = router;
