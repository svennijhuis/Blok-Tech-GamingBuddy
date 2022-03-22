// mongodb connection, 1 connection die hergebruikt wordt, sneller dan telkens connect en close
const mongoConnect = require("./mongoConnect");

// laad chat uit database voor room van gebruiker
const loadChat = async function (room, socket) {
  const client = await mongoConnect.getDB();
  const cursor =
  client.db("chatlog")
    .collection(room)
    .find()
    .sort({ tijdVolledig: -1 })
    .limit(20);
  const chatResults = await cursor.toArray();

  // goede volgorde van array
  chatResults
    .slice()
    .reverse()
    .forEach((chatResults) => {
      socket.emit("message", chatResults);
    });
  console.log("Chat geladen uit database");
};



// sla berichten + metadata op in database
const saveChat = async function (msgMetaData) {
  const client = await mongoConnect.getDB();
  try {
    client.db("chatlog")
      .collection(msgMetaData.room)
      .insertOne(msgMetaData);
    console.log(`Bericht opgeslagen met id: ${msgMetaData.uniqid}`);
  } catch (e) {
    console.error(e);
  }
};



// verwijder berichten uit database
const deleteChat = async function (room, messageId) {
  const client = await mongoConnect.getDB();
  try {
    client.db("chatlog")
      .collection(room)
      .deleteOne({ uniqid: messageId });
    console.log(`Bericht verwijderd met id: ${messageId}`);
  } catch (e) {
    console.error(e);
  }
};



// haalt alle kamers op uit db
const getAllRooms = async function () {
  const client = await mongoConnect.getDB();

  const cursor =
  client.db("filters")
    .collection("rooms")
    .find();

  return await cursor.toArray();
};



// filter kamers uit db
const filterRooms = async function (filters) {
  const client = await mongoConnect.getDB();

  const cursor =
  client.db("filters")
    .collection("rooms")
    .find({ taal: filters.taal });

  return await cursor.toArray();
};

module.exports = { loadChat, saveChat, deleteChat, getAllRooms, filterRooms };
