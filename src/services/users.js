'use strict';

const { User } = require('../models/user');

function getAll() {
  return User.findAll({});
}

function getById(userId) {
  return User.findAll({
    where: {
      id: userId,
    },
  });
}

function create(name) {
  return User.create({ name });
}

async function update(userId, name) {
  return User.update({ name }, {
    where: {
      id: userId,
    },
    returning: true,
  });
}

function remove(userId) {
  User.destroy({
    where: {
      id: userId,
    },
  });
}

module.exports = {
  getAll, getById, create, update, remove,
};
