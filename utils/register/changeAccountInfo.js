const mongoConnect = require("../../controller/mongoConnect");

const changeAccountInfo = async (oldUserInfo, newUserInfo) => {
    const client = await mongoConnect.getDB();

    client
    .db("users")
    .collection("user")
    .updateOne(oldUserInfo, newUserInfo);
};

module.exports = { changeAccountInfo };
