const { getAllDate } = require("./timeCheck.js");
const uniqid = require("uniqid");

// hangt alle metadata aan message object
function formatMessage (user, msg) {
  const allDate = getAllDate();
  return {
    naam: user.username || "Server",
    bericht: msg,
    room: user.room,
    time: `${allDate.hour}:${allDate.minute}`,
    tijdVolledig:
      allDate.year +
      allDate.month +
      allDate.day +
      allDate.hour +
      allDate.minute +
      allDate.second,
    uniqid: uniqid()
  };
}

module.exports = { formatMessage };
