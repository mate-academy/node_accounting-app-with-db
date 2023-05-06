'use strict';

const { User } = require('../models/users');

async function getAll() {
  return User.findAll();
}

async function getById(id) {
  return User.findByPk(id);
}

async function create(name) {
  return User.create({ name });
}

async function remove(id) {
  User.destroy({
    where: { id },
  });
}

async function update({ id, name }) {
  return User.update({ name }, {
    where: { id },
    returning: true,
    plain: true,
  });
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
