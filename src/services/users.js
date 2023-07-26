'use strict';

const { User } = require('../models/users');

const normalize = ({ id, name }) => ({
  id,
  name,
});

async function getAllUsers() {
  const result = await User.findAll({
    order: [
      'created_at',
    ],
  });

  return result;
}

function getUserByID(userId) {
  return User.findByPk(userId);
};

async function createUser(name) {
  const newUser = await User.create({ name });

  return newUser;
};

function deleteUser(userId) {
  return User.destroy({
    where: { id: userId },
  });
};

function updateUser({ userId, name }) {
  return User.update({ name }, {
    where: { id: userId },
  });
};

module.exports = {
  normalize,
  getAllUsers,
  getUserByID,
  createUser,
  deleteUser,
  updateUser,
};
