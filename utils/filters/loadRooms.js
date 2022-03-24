const mongoConnect = require("../../controller/mongoConnect");

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

module.exports = { getAllRooms, filterRooms };
