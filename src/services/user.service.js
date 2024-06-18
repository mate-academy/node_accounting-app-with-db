require('sequelize');

const {
  models: { User },
} = require('../models/models');

function getUsers() {
  return User.findAll();
}

function getUser(id) {
  return User.findByPk(id);
}

async function deleteUser(id) {
  const rows = await User.destroy({
    where: {
      id: id,
    },
  });

  return rows === 1;
}

async function createUser({ name }) {
  return User.create({ name });
}

async function updateUser(id, userData) {
  const [, [user]] = await User.update(userData, {
    where: {
      id,
    },
    returning: true,
  });

  return user;
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
};
