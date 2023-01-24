'use strict';

const { User } = require('../models/User');

function getAll() {
  return User.findAll({
    order: ['created_at'],
  });
}

function getById(userId) {
  return User.findByPk(userId);
}

function addOne(name) {
  return User.create({
    name,
  });
}

function deleteOne(id) {
  return User.destroy({
    where: { id },
  });
}

function updateOne(id, name) {
  return User.update({ name }, {
    where: { id },
  });
}

module.exports = {
  getAll,
  getById,
  addOne,
  deleteOne,
  updateOne,
};
