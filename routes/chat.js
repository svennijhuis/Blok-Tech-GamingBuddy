const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const uniqid = require("uniqid");

router.use(bodyParser.urlencoded({ extended: true }));

const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, "public/uploads/");
    },
    filename: function (request, file, callback) {
        callback(null, `${uniqid()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

const { changeRoomInfo } = require("../utils/filters/changeRoomInfo");
// room variabele wordt opgeslagen zodat de roomNaam kan worden gebruikt in router.post("/roomimg")
let roomNaam;

// render chat
router.get("/", (req, res) => {
  res.render("chat", {
    groepsnaam: req.query.room
    // groepsnaam: req.query.room.charAt(0).toUpperCase() + req.query.room.slice(1)
  });
  roomNaam = req.query.room;
});

// stuur user naar chat met username en room als query parameters
router.post("/", (req, res) => {
  res.redirect(`/messages?username=${req.body.username}&room=${req.body.room}`);
});

// Hiermee kan je de huidige room info als gebruiker veranderen
router.post("/roomimg", upload.single("groepimg"), function (req, res) {
  // huidige data vervangen met newRoomData
  const newRoomData = {
    beschrijving: req.body.beschrijving,
    taal: [req.body.taal1, req.body.taal2, req.body.taal3]
  };

  // Als geen img is toegevoegd dan de huidige img behouden.
  if (req.file !== undefined) {
    newRoomData.img = `uploads/${req.file.filename}`;
  }

  changeRoomInfo(newRoomData, roomNaam);
  res.status(204).end();
});

module.exports = router;
