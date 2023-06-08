'use strict';

const { User } = require('../models/users');
const { normalizeUsers } = require('../helpers');

async function getAll() {
  const users = User.findAll({
    order: ['name'],
  });

  return users.map(normalizeUsers);
}

async function getById(id) {
  const user = await User.findByPk(id);

  return normalizeUsers(user);
}

async function create(user) {
  const newUser = await User.create(user);

  return normalizeUsers(newUser);
}

async function removeById(id) {
  await User.destroy({
    where: {
      id,
    },
  });
}

async function updateById(userId, partsToUpdate) {
  const updatedUser = await User.update({ ...partsToUpdate }, {
    where: {
      id: userId,
    },
  });

  return normalizeUsers(updatedUser);
}

module.exports = {
  usersService: {
    getAll,
    getById,
    create,
    removeById,
    updateById,
  },
};
