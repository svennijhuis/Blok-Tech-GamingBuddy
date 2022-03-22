// bron: https://github.com/bradtraversy/chatcord/blob/master/utils/users.js

const users = [];

// Zet users in array voor sidebar
function userJoin (id, username, room) {
  const user = { id, username, room };

  users.push(user);

  return user;
}

// Haalt user uit array voor sidebar
function userLeave (id) {
  const index = users.findIndex(user => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

// Vind eigen user
function getCurrentUser (id) {
  return users.find(user => user.id === id);
}

// Haalt users uit array op
function getRoomUsers (room) {
  return (users.filter(user => user.room === room));
}

module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
};
