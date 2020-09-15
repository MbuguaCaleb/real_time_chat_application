/*Helper functions for managing users*/
const users = [];

const addUser = ({ id, name, room }) => {
  //Javacript Mastery = javascriptMastery
  //trim removes spaces from a String
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  //ensuring that each username is unique in the same room
  //find in javscript returns the first instance that returns true.
  //find is like a Higer order array method
  const existingUser = users.find(
    (user) => user.room === room && user.name === name
  );

  if (existingUser) {
    return { error: 'Username is taken' };
  }

  const user = { id, name, room };

  users.push(user);

  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index != -1) {
    return users.splice(index, 1)[0];
  }
};

//ES6 have return implemented to it by default
const getUser = (id) => users.find((user) => user.id === id);

//Filter as an array method
const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
