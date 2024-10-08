'use strict';

const createId = require('../utils/createId');

const users = [];

function init() {
  users.length = 0;
}

function get() {
  return users;
}

function create(name) {
  const user = {
    id: createId(users),
    name,
  };

  users.push(user);

  return user;
}

function getById(id) {
  return users.find((user) => user.id === id);
}

function remove(id) {
  const index = users.findIndex((user) => user.id === id);

  if (index > -1) {
    users.splice(index, 1);
  }
}

function update(id, name) {
  const user = getById(id);

  if (user) {
    user.name = name;
  }

  return user;
}

module.exports = {
  init,
  get,
  create,
  getById,
  remove,
  update,
};
