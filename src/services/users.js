'use strict';

let users = [];
let nextUserId = 1;

function getAll() {
  return users;
}

function getOne(userId) {
  const foundUser = users.find(({ id }) => +userId === id);

  return foundUser || null;
}

function create(name) {
  const newUser = {
    id: nextUserId++,
    name,
  };

  users.push(newUser);

  return newUser;
}

function remove(userId) {
  const filteredUsers = users.filter(({ id }) => +userId !== id);
  const isUserFound = users.length !== filteredUsers.length;

  users = filteredUsers;

  return isUserFound;
}

function update(userId, name) {
  const foundUser = users.find(({ id }) => +userId === id);

  Object.assign(foundUser, { name });

  return foundUser;
}

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
