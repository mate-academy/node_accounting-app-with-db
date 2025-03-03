'use strict';

const { User } = require('../models/User.model');

async function get() {
  return User.findAll();
}

async function create(name) {
  return User.create({ name });
}

async function getById(id) {
  return User.findByPk(id);
}

async function remove(id) {
  await User.destroy({ where: { id } });
}

function update(id, name) {
  return User.update({ name }, { where: { id } });
}

module.exports = {
  get,
  create,
  getById,
  remove,
  update,
};
