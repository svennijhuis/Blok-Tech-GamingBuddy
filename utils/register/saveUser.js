const mongoConnect = require("../../controller/mongoConnect");

const saveUser = async (user) => {
  const client = await mongoConnect.getDB();
  console.log(user);
  try {
    client.db("users").collection("user").insertOne(user);
    console.log(`User opgeslagen met naam: ${user.name}`);
  } catch (e) {
    console.error(e);
  }
};

module.exports = { saveUser };
