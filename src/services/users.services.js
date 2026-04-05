const { User } = require('../models/User.model');

function normilize({ id, name }) {
  return {
    id,
    name,
  };
}

function getUsers() {
  return User.findAll();
}

function getUserById(id) {
  return User.findByPk(id);
}

function createUser(name) {
  return User.create({ name });
}

function deleteUser(id) {
  return User.destroy({ where: { id } });
}

async function updateUser({ id, name }) {
  await User.update({ name }, { where: { id } });

  return User.findByPk(id);
}

module.exports = {
  getUsers,
  createUser,
  deleteUser,
  getUserById,
  updateUser,
  normilize,
};
