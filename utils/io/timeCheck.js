// maakt object met tijd van jaar tot seconde
// KIJKEN NAAR GETHOURS, geeft een uur te weinig soms
const getAllDate = () => {
  const date = new Date();
  const fullDate = {
    year: date.getFullYear().toString(),
    month: timeCheck(date.getMonth() + 1).toString(),
    day: timeCheck(date.getDate()).toString(),
    hour: timeCheck(date.getHours()).toString(),
    minute: timeCheck(date.getMinutes()).toString(),
    second: timeCheck(date.getSeconds()).toString()
  };
  return fullDate;
};

// zorgt dat de tijd format altijd yyyy-mm-dd-uu-mm-ss is
function timeCheck (n) {
  return n < 10 ? `0${n}` : n;
}

module.exports = { getAllDate };
