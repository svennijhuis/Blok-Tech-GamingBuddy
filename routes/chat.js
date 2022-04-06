const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const uniqid = require("uniqid");

router.use(bodyParser.urlencoded({ extended: true }));

const {
  isLoggedIn
} = require("../utils/register/authentication");

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
router.get("/", isLoggedIn, (req, res) => {
  res.render("chat", {
    groepsnaam: req.query.room,
    user: req.user
    // groepsnaam: req.query.room.charAt(0).toUpperCase() + req.query.room.slice(1)
  });
  roomNaam = req.query.room;
});


// stuur user naar chat met username en room als query parameters
router.post("/", isLoggedIn, (req, res) => {
  res.redirect(`/messages?username=${req.body.username}&room=${req.body.room}`);
});


// upload custom groep afbeelding
router.post("/roomimg", isLoggedIn, upload.single("groepimg"), function (req, res) {
  const newRoomData = {
    beschrijving: req.body.beschrijving,
    taal: [req.body.taal1, req.body.taal2, req.body.taal3]
  };

  if (req.file !== undefined) {
    newRoomData.img = `uploads/${req.file.filename}`;
  }

  changeRoomInfo(newRoomData, roomNaam);
  res.status(204).end();
});

module.exports = router;
