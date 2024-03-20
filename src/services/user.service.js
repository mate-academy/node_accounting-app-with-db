'use strict';

const { User } = require('../models/User.model');

async function getAll() {
  const result = await User.findAll();

  return result;
}

async function getById(id) {
  return User.findByPk(id);
}

async function create(name) {
  return User.create({ name });
}

async function update({ id, name }) {
  await User.update({ name }, { where: { id } });
}

async function remove(id) {
  await User.destroy({ where: { id } });
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
