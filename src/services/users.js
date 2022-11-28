'use strict';

const { User } = require('../model/users');

function getAll() {
  return User.findAll({
    order: ['created_at'],
  });
}

function getById(userId) {
  return User.findByPk(userId);
}

function create(name) {
  return User.create({ name });
}

function remove(userId) {
  return User.destroy({
    where: { id: userId },
  });
}

function update(userId, name) {
  return User.update({ name }, {
    where: { id: userId },
  });
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
