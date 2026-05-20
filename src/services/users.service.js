'use strict';

const { User } = require('../models/User.model');

function parseId(raw) {
  const id = typeof raw === 'string' ? Number(raw) : raw;

  return Number.isInteger(id) && id >= 1 ? id : null;
}

function toUserDto(user) {
  return {
    id: user.id,
    name: user.name,
  };
}

async function getUsers() {
  return User.findAll();
}

async function getUserById(rawId) {
  const id = parseId(rawId);

  if (id === null) {
    return null;
  }

  return User.findByPk(id);
}

async function createUser(payload) {
  return User.create(payload);
}

async function updateUser(rawId, payload) {
  const user = await getUserById(rawId);

  if (!user) {
    return null;
  }

  return user.update(payload);
}

async function deleteUser(rawId) {
  const user = await getUserById(rawId);

  if (!user) {
    return null;
  }

  await user.destroy();

  return true;
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  toUserDto,
};
