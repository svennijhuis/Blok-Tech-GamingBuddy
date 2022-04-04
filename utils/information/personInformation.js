const mongoConnect = require("../../controller/mongoConnect");

// verander room info (moet nog aan gewerkt worden)
const changeUser = async (newUserData, name) => {
    const client = await mongoConnect.getDB();

    // naam van room (moet nog dynamisch worden meegegeven)
    const userData = { name: name };

    // object keys die moeten worden aangepast + nieuwe waardes
    const update = {
        $set: {
          name: newUserData.name
        }
      };
      console.log(update);
    await client.db("users")
    .collection("user")
    .updateOne(userData, update);
};

module.exports = { changeUser };
