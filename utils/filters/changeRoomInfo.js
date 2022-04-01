const mongoConnect = require("../../controller/mongoConnect");

// Hiermee kun je de room info veranderen
const changeRoomInfo = async (newRoomData, roomNaam) => {
    const client = await mongoConnect.getDB();

    // Naam van room (moet nog dynamisch worden meegegeven)
    const filter = { roomNaam: roomNaam };

    // Object keys die moeten worden aangepast veranderen naar nieuwe waardes
    const update = {
        $set: {
          taal: newRoomData.taal,
          beschrijving: newRoomData.beschrijving
        }
      };

      // Als de nieuwe roomdata defined is dan img veranderen
      if (newRoomData.img !== undefined) {
        update.$set.img = newRoomData.img;
      }

    await client.db("filters")
    .collection("rooms")
    .updateOne(filter, update);
};

module.exports = { changeRoomInfo };
