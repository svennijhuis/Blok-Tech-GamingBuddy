const mongoConnect = require("../../controller/mongoConnect");

const saveUser = async (user) => {
  const client = await mongoConnect.getDB();
  try {
    client.db("users").collection("user").insertOne(user);
    console.log(`User saved with username: ${user.username}`);
  } catch (e) {
    console.error(e);
  }
};

module.exports = { saveUser };
