'use strict';

const { User } = require('../models/User.js');

async function getAll() {
  return User.findAll({
    order: ['createdAt'],
  });
};

function getById(id) {
  return User.findByPk(id);
};

let nextUserId = 1;

function create(name) {
  const id = nextUserId++;

  return User.findOrCreate({
    where: { id },
    defaults: { name },
  });
}

function remove(id) {
  User.destroy({
    where: { id },
  });
}

function update({ id, name }) {
  return User.update({ name }, {
    where: { id },
  });
}

module.exports.userService = {
  getAll,
  getById,
  create,
  remove,
  update,
};
