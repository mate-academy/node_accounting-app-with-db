'use strict';

const { User } = require('../models/User');

async function getAll() {
  const users = await User.findAll({
    order: [
      'id',
    ],
  });

  return users;
}

async function getById(userId) {
  const user = await User.findByPk(+userId);

  return user;
}

function addNew(name) {
  return User.create({ name });
}

function remove(userId) {
  return User.destroy({ where: { id: userId } });
}

function change(id, name) {
  return User.update(
    { name },
    { where: {
      id,
    } });
}

module.exports = {
  getAll,
  getById,
  addNew,
  remove,
  change,
};
