const { models } = require('../models/models');
const { User } = models;

async function getAllUsers() {
  return User.findAll();
}

async function getUserById(id) {
  return User.findByPk(id);
}

async function deleteUser(id) {
  if (User.findByPk(id)) {
    return User.findByPk(id).then((user) => user.destroy());
  }

  return null;
}

async function createUser(name) {
  return User.create({ name });
}

async function updateUser(id, data) {
  if (User.findByPk(id)) {
    return User.findByPk(id).then((user) => user.update(data));
  }

  return null;
}

module.exports = {
  getAllUsers,
  getUserById,
  deleteUser,
  createUser,
  updateUser,
};
