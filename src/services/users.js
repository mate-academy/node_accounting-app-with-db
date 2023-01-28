'use strict';

const { User } = require('../models/users');

function normalize({ id, name }) {
  return {
    id,
    name,
  };
}

function getAll() {
  return User.findAll({
    order: ['createdAt'],
    logging: false,
  });
};

function getbyId(userId) {
  return User.findByPk(Number(userId));
}

function create(name) {
  return User.create({ name });
};

function remove(userId) {
  return User.destroy({
    where: { id: Number(userId) },
  });
};

function update({ id, name }) {
  return User.update({ name }, {
    where: { id: Number(id) },
  });
};

module.exports = {
  normalize,
  getAll,
  getbyId,
  create,
  remove,
  update,
};
