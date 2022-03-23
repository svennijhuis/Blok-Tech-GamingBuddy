const mongoConnect = require("../../db/mongoConnect");

// check of object met roomName bestaat in mongodb filters > rooms
const checkRoomData = async (roomName) => {
  const client = await mongoConnect.getDB();

  const joinedRoom = await client.db("filters")
    .collection("rooms")
    .find({ roomNaam: roomName })
    .toArray();

    // als er nog geen room object met de naam is, maak er dan een
  if (joinedRoom.length === 0) {
    createRoomInfo(roomName);
  }
};



// template voor roominfo voor iedere kamer, moet nog aanpasbaar worden
const createRoomInfo = async (roomName) => {
    const client = await mongoConnect.getDB();
    const roomInfo = {
        roomNaam: roomName,
        taal: [""],
        genre: "",
        img: ""
    };

    try {
      client.db("filters")
        .collection("rooms")
        .insertOne(roomInfo);
      console.log(`Room opgeslagen met naam: ${roomName}`);
    } catch (e) {
      console.error(e);
    }
};

module.exports = { checkRoomData };
