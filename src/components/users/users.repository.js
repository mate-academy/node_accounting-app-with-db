'use strict';

const { User } = require('../models/user.module');

function create(name) {
  return User.create({ name });
}

function findAll() {
  return User.findAll();
}

function findByUserId(id) {
  return User.findOne({
    where: { id },
  });
}

function updateByUserId(userId, name) {
  return User.update({ name }, {
    where: { id: userId },
  });
}

function removeByUserId(userId) {
  return User.destroy({
    where: { id: userId },
  });
}

module.exports = {
  create,
  findAll,
  findByUserId,
  updateByUserId,
  removeByUserId,
};
