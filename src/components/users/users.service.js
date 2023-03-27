'use strict';

const usersRepository = require('./users.repository');

function create(name) {
  return usersRepository.create(name);
}

async function findAll() {
  const [...users] = await usersRepository.findAll();

  if (!users) {
    return 'User not found';
  }

  return users;
}

async function findByUserId(userId) {
  const user = await usersRepository.findByUserId(userId);

  if (!user) {
    return 'User not found';
  }

  return user;
}

async function updateByUserId(userId, name) {
  const user = await findByUserId(userId);

  if (!user) {
    return 'User not found';
  }

  return usersRepository.updateByUserId(userId, name);
}

async function removeByUserId(userId) {
  const user = await findByUserId(userId);

  if (!user) {
    return 'User not found';
  }

  return usersRepository.removeByUserId(userId);
}

module.exports = {
  create,
  findAll,
  findByUserId,
  updateByUserId,
  removeByUserId,
};
