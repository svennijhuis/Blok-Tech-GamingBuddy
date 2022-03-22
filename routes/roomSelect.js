const express = require("express");
const router = express.Router();

const {
  getAllRooms,
  filterRooms
} = require("../db/mongodb.js");

const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));



router.get("/", async (req, res) => {
  const allRooms = await getAllRooms();

  // ophalen rooms database
  res.render("filter", {
    gameRooms: allRooms
  });
});

router.post("/filter", async (req, res) => {
  const filteredRooms = await filterRooms(req.body);

  // ophalen dieren database en deze weergeven op de localhost:8000.
  res.render("filter", {
    gameRooms: filteredRooms
  });
});

module.exports = router;
