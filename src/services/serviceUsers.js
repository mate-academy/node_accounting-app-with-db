const { User } = require('../models/User.model');

const getAllUsers = async () => {
  const users = await User.findAll();

  return users;
};

const getUserById = async (id) => {
  const user = await User.findByPk(id);

  return user;
};

const createUser = async (name) => {
  const user = await User.create({ name });

  return user;
};

const updateUser = async (id, name) => {
  const user = await getUserById(id);

  if (user) {
    await user.update({ name });
  }

  return user;
};

const deleteUser = async (id) => {
  const user = await getUserById(id);

  if (user) {
    await user.destroy();

    return true;
  }

  return false;
};

const clearUsers = async () => {
  await User.destroy({
    where: {},
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  clearUsers,
};
