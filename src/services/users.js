'use strict';

const { idGenerator } = require('../tools/idGenerator');

let users = [];

const getNextId = idGenerator(users);

function reset() {
  users = [];
}

function getAll() {
  return users;
}

function getById(id) {
  const foundUser = users.find(user => user.id === id);

  return foundUser || null;
}

function create(name) {
  const newUser = {
    id: getNextId(),
    name,
  };

  users.push(newUser);

  return newUser;
}

function remove(id) {
  users = users.filter(user => user.id !== id);
}

function update({ id, name }) {
  const user = getById(id);

  Object.assign(user, { name });
}

module.exports = {
  reset,
  getAll,
  getById,
  create,
  remove,
  update,
};
