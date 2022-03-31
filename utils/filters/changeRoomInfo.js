const mongoConnect = require("../../controller/mongoConnect");

// verander room info (moet nog aan gewerkt worden)
const changeRoomInfo = async (newRoomData, roomNaam) => {
    const client = await mongoConnect.getDB();

    // naam van room (moet nog dynamisch worden meegegeven)
    const filter = { roomNaam: roomNaam };

    // object keys die moeten worden aangepast + nieuwe waardes
    const update = {
        $set: {
          taal: newRoomData.taal,
          beschrijving: newRoomData.beschrijving,
          img: newRoomData.img
        }
      };

    await client.db("filters")
    .collection("rooms")
    .updateOne(filter, update);
};

module.exports = { changeRoomInfo };
