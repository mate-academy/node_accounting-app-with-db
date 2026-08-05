const { User } = require('../models/User.model');

const createUser = (name) => {
  return User.create({ name });
};

const getAllUsers = () => {
  return User.findAll();
};

const getUserById = (id) => {
  return User.findByPk(id);
};

const deleteUser = async (id) => {
  const deleted = await User.destroy({ where: { id } });

  if (deleted === 0) {
    return null;
  }

  return deleted;
};

const updateUser = async (id, name) => {
  const user = await User.findByPk(id);

  if (!user) {
    return null;
  }

  await user.update({ name });

  return user;
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
};
