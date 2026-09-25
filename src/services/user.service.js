/* eslint-disable no-console */

const { User } = require('../models/User.model');

function getAll() {
  return User.findAll();
}

function getById(id) {
  return User.findByPk(id);
}

function createUser(userData) {
  return User.create(userData);
}

function deleteById(id) {
  return User.destroy({
    where: { id },
  });
}

async function update({ id, body }) {
  const user = await User.findByPk(id);

  if (!user) {
    return null;
  }

  return user.update(body, {
    silent: true,
  });
}

function resetUsers() {
  return User.destroy({
    where: {},
    truncate: true,
  });
}

const usersService = {
  getAll,
  getById,
  createUser,
  deleteById,
  update,
  resetUsers,
};

module.exports = {
  usersService,
};
