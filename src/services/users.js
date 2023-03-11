'use strict';

const { User } = require('../models/User.js');

function getAll() {
  return User.findAll();
}

function getById(userId) {
  return User.findByPk(userId);
}

function create(name) {
  return User.create({ name });
}

async function remove(id) {
  await User.destroy({
    where: { id },
  });
}

function update(userId, name) {
  return User.update({ name }, {
    where: {
      id: userId,
    },
  });
}

module.exports = {
  getAll,
  getById,
  remove,
  update,
  create,
};
