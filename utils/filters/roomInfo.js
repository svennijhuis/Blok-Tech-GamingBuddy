// check of object met roomName bestaat in mongodb filters > rooms
const checkRoomData = async (client, roomName) => {
  const joinedRoom = await client.db("filters")
    .collection("rooms")
    .find({ roomNaam: roomName })
    .toArray();

    // als er nog geen room object met de naam is, maak er dan een
  if (joinedRoom.length === 0) {
    createRoomInfo(client, roomName);
  }
};



// template voor roominfo voor iedere kamer, moet nog aanpasbaar worden
const createRoomInfo = async (client, roomName) => {
    const roomInfo = {
        roomNaam: roomName,
        taal: [""],
        genre: "",
        img: ""
    };

    // insert room metadata in database
    try {
      client.db("filters")
        .collection("rooms")
        .insertOne(roomInfo);
      console.log(`Room opgeslagen met naam: ${roomName}`);
    } catch (e) {
      console.error(e);
    }
};

// laadt room data in sidebar
const loadRoomData = async function (client, currentRoom) {
  const cursor =
  client.db("filters")
  .collection("rooms")
  .findOne({ roomNaam: currentRoom });

  return await cursor;
};


module.exports = { checkRoomData, createRoomInfo, loadRoomData };
