const { v4: uuidv4 } = require('uuid');
const { User } = require('../models/models');

async function getAllUsers() {
  return User.findAll();
}

async function getSingleUser(id) {
  return User.findByPk(id);
}

async function addUser(name) {
  const id = uuidv4();

  return User.create({ id, name });
}

async function removeUser(id) {
  await User.destroy({ where: id });
}

async function updateUser({ id, name }) {
  return User.update({ name }, { where: id });
}

module.exports = {
  userService: {
    getAllUsers,
    getSingleUser,
    addUser,
    removeUser,
    updateUser,
  },
};
