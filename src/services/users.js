'use strict';

const { User } = require('../models/User');

function normalize({ id, name }) {
  return {
    id,
    name,
  };
}

async function getAll() {
  const users = await User.findAll({
    order: ['createdAt'],
    logging: false,
  });

  return users;
};

async function addUser(name) {
  const newUser = await User.create({ name });

  return newUser;
};

async function getById(userId) {
  const foundUser = await User.findByPk(+userId);

  return foundUser;
};

function removeUser(userId) {
  return User.destroy({
    where: {
      id: +userId,
    },
  });
};

async function updateUser(userId, name) {
  const updatedUser = await User.update({ name }, {
    where: {
      id: +userId,
    },
  });

  return updatedUser;
}

module.exports = {
  normalize,
  getAll,
  addUser,
  getById,
  removeUser,
  updateUser,
};
