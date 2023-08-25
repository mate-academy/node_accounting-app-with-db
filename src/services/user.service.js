'use strict';

let users = [];

function getAll() {
  return users;
}

function getUserById(userId) {
  const foundUser = users.find(({ id }) => id === +userId);

  return foundUser || null;
}

function createUser(name) {
  const newUser = {
    id: +Date.now(),
    name,
  };

  users.push(newUser);

  return newUser;
}

function removeUser(userId) {
  users = users.filter(user => user.id !== +userId);
}

function updateUser(currentUser, editedName) {
  currentUser.name = editedName;

  return currentUser;
}

function removeAllUsers() {
  users = [];
}

module.exports = {
  getAll,
  getUserById,
  createUser,
  removeUser,
  updateUser,
  removeAllUsers,
};
