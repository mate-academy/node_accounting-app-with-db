'use strict';

const User = require('../models/user');

function normalizeUser({ id, name }) {
  return {
    id, name,
  };
}

function getAll() {
  return User.findAll({
    order: [ 'createdAt' ],
  });
};

function getbyId(userId) {
  return User.findByPk(userId);
}

function create(name) {
  return User.create({ name });
};

function remove(userId) {
  return User.destroy({
    where: { id: +userId },
  });
};

function update({ id, name }) {
  return User.update({ name }, {
    where: { id },
  });
};

module.exports = {
  normalizeUser,
  getAll,
  getbyId,
  create,
  remove,
  update,
};
