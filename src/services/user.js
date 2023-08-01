'use strict';

const { User } = require('../utils/db');

async function getAll() {
  const allUsers = await User.findAll({
    attributes: ['id', 'name'],
  });

  return allUsers;
}

async function getById(userId) {
  const foundUser = await User.findOne({ where: { id: userId } });

  return foundUser;
}

async function create(name) {
  const newUser = await User.create({ name });

  return newUser;
}

async function remove(userId) {
  await User.destroy({ where: { id: userId } });
}

async function update({ id, name }) {
  const user = await User.update({ name }, { where: { id } });

  return user;
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
