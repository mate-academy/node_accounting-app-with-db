const { User } = require('../models/User.model');

async function getAllUsers() {
  const result = await User.findAll();

  return result;
}

async function getUserById(id) {
  return User.findByPk(id);
}

async function createUser(newUser) {
  return User.create(newUser);
}

async function deleteUser(id) {
  await User.destroy({ where: { id } });
}

async function updateUser({ id, name }) {
  const user = await User.findByPk(id);

  if (!user) {
    return null;
  }

  const updatedUser = await user.update({ name }, { silent: true });

  return updatedUser;
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
};
