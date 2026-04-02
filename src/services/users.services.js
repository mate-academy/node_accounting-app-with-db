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

function updateUser({ id, name }) {
  return User.update({ name }, { where: { id } });
}

module.exports = {
  getUsers,
  createUser,
  deleteUser,
  getUserById,
  updateUser,
  normilize,
};
