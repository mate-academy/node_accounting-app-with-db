const { User } = require('../models/User.model');

async function getAllUsers() {
  return User.findAll();
}

async function createUser(name) {
  return User.create({ name });
}

async function getUserById(id) {
  return User.findByPk(id);
}

async function deleteUser(id) {
  const userForDelete = await User.findByPk(id);

  if (!userForDelete) {
    return null;
  }

  await userForDelete.destroy();

  return true;
}

async function updateUser(id, data) {
  const userForUpdate = await User.findByPk(id);

  if (!userForUpdate) {
    return null;
  }

  if (data.name === undefined || data.name === null) {
    return null;
  }

  userForUpdate.name = data.name;

  await userForUpdate.save();

  return userForUpdate;
}

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  deleteUser,
  updateUser,
};
