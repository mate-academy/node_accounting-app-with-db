'use strict';

const { User } = require('../data-models/user-model.js');

function getAll() {
  return User.findAll({
    order: ['createdAt'],
  });
}

function getOne(userId) {
  return User.findByPk(userId);
}

function create(name) {
  return User.create({ name });
}

async function deleteOne(userId) {
  await User.destroy({
    where: {
      id: userId,
    },
  });
}

async function modifyOne(userId, name) {
  await User.update({ name }, {
    where: {
      id: userId,
    },
  });
}

module.exports = {
  getAll,
  getOne,
  create,
  deleteOne,
  modifyOne,
};
