'use strict';

let users = [];

function getNewId() {
  if (!users.length) {
    return 1;
  }

  return Math.max(...users.map(user => user.id)) + 1;
}

function getAll() {
  return users;
};

function getById(userId) {
  const foundUser = users.find(user => user.id === +userId);

  return foundUser || null;
};

function create(name) {
  const newUser = {
    id: getNewId(),
    name,
  };

  users.push(newUser);

  return newUser;
}

function remove(userId) {
  users = users.filter(user => user.id !== +userId);
}

function update(userId, name) {
  const user = getById(userId);

  Object.assign(user, { name });

  return user;
}

function reset() {
  users = [];
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  reset,
};
