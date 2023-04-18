'use strict';

const { User } = require('../models/User.js');

let users = [];

function getInitialValue() {
  users = [];

  return users;
}

async function getAll() {
  await User.findAll({
    order: [ 'createdAt' ],
  });
}

function getById(userId) {
  return User.findByPk(+userId);
}

function create(name) {
  const maxId = Math.max(users.map(user => user.id), 0);

  const newUser = {
    id: maxId + 1,
    name,
  };

  return User.create(newUser);
}

function remove(userId) {
  return User.destroy({
    where: { id: +userId },
  });
}

function update({ id, name }) {
  return User.update({ name }, {
    where: { id: +id },
  });
}

module.exports = {
  getInitialValue,
  getAll,
  getById,
  create,
  remove,
  update,
};
