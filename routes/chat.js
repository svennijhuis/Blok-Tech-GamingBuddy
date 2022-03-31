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
        callback(null, `${file.originalname}-${uniqid()}`);
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

// upload custom groep afbeelding
// moet nog error handling hebben, bijvoorbeeld als bepaalde velden niet worden ingevuld. Dit is de basis - Laurens
router.post("/roomimg", upload.single("groepimg"), function (req, res) {
  const newRoomData = {
    omschrijving: req.body.omschrijving,
    taal: [req.body.taal1, req.body.taal2, req.body.taal3],
    img: `uploads/${req.file.filename}`
  };

  changeRoomInfo(newRoomData, roomNaam);
  res.status(204).end();
});

module.exports = router;
