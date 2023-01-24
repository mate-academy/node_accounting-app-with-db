'use strict';

const { User } = require('../models/users');

function getAll() {
  return User.findAll();
}

function getById(userId) {
  return User.findByPk(Number(userId));
}

function create(name) {
  return User.create({ name });
}

function remove(userId) {
  return User.destroy({
    where: { id: Number(userId) },
  });
}

function update({ name, id }) {
  return User.update({ name }, {
    where: { id },
    returning: true,
    plain: true,
  });
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
