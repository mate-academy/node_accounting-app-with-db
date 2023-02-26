'use strict';

const { User } = require('../models/User');

function normalize({ id, name }) {
  return {
    id,
    name,
  };
}

function getAll() {
  return User.findAll({
    order: ['createdAt'],
  });
}

function findById(userId) {
  return User.findByPk(Number(userId));
}

function create(name) {
  return User.create({ name });
}

function update(userId, name) {
  return User.update({ name }, {
    where: { id: Number(userId) },
  });
}

function remove(userId) {
  User.destroy({
    where: { id: Number(userId) },
  });
}

module.exports = {
  getAll,
  findById,
  create,
  update,
  remove,
  normalize,
};
