'use strict';

const { User } = require('../models/User');

function getAll() {
  return User.findAll({
    order: ['id'],
  });
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

function update({ id, name }) {
  return User.update({ name }, {
    where: { id: Number(id) },
  });
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
