const express = require("express");
const router = express.Router();

const {
  getAllRooms,
  filterRooms
} = require("../utils/filters/loadRooms");

const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));



router.get("/", async (req, res) => {
  const allRooms = await getAllRooms();

  // for (let i = 0; i < allRooms.length; i++) {
  //   allRooms[i].taal.join(", ");
  //   console.log(allRooms[i].taal);
  // }

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
  // res.redirect(`/filter?taal=${req.body.taal}`);
});

module.exports = router;
