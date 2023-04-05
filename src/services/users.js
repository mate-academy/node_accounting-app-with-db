/* eslint-disable no-console */
'use strict';

const { User } = require('../models/user');

async function getAll() {
  const result = await User.findAll();

  return result;
}

function getById(id) {
  return User.findByPk(id);
}

function create(name) {
  return User.create({ name });
}

function update({ id, name }) {
  return User.update({ name }, { where: { id } });
}

function remove(id) {
  User.destroy({ where: { id } });
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
