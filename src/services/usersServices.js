'use strict';

const { User } = require('../models/User');

function normalize({ id, name }) {
  return {
    id, name,
  };
}

function getAll() {
  return User.findAll({
    order: ['createdAt'],
  });
}

function findById(userId) {
  return User.findByPk(+userId);
}

function create(name) {
  return User.create({ name });
};

function remove(userId) {
  return User.destroy({
    where: { id: +userId },
  });
}

function update(userId, name) {
  return User.update({ name }, {
    where: { id: +userId },
  });
}

module.exports = {
  getAll,
  findById,
  create,
  remove,
  update,
  normalize,
};
