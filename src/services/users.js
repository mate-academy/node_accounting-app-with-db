'use strict';

const { User } = require('../models/User.js');

async function getAll() {
  await User.findAll({
    order: [ 'createdAt' ],
  });
}

function getById(userId) {
  return User.findByPk(+userId);
}

function create(name) {
  return User.create({ name });
}

function remove(userId) {
  return User.destroy({
    where: { id: +userId },
  });
}

function update({ id, name }) {
  return User.update({ name }, {
    where: { id: +id },
  });
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
