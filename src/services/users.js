'use strict';

const Users = require('../db/models/users');

function normalizeUser({ id, name }) {
  return {
    id, name,
  };
}

async function getAll() {
  const users = await Users.findAll();

  return users;
}

async function getUserById(userId) {
  const user = await Users.findByPk(+userId);

  return user;
}

async function createNewUser(name) {
  if (typeof name !== 'string') {
    throw new Error('The name must be a string');
  }

  await Users.create({ name });
}

async function deleteUser(userId) {
  await Users.destroy({
    where: {
      id: +userId,
    },
  });
}

async function updateUserInfo({ id, name }) {
  await Users.update({ name }, {
    where: {
      id,
    },
    returning: true,
  });
}

module.exports = {
  normalizeUser,
  getAll,
  getUserById,
  createNewUser,
  deleteUser,
  updateUserInfo,
};
