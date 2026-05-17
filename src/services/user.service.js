const { User } = require('../models/User.model');

const getUsers = async () => {
  try {
    const users = await User.findAll();

    return users;
  } catch (e) {
    return [];
  }
};

const getUserById = async (id) => {
  return User.findByPk(id);
};

const createUser = async (name) => {
  return User.create({ name });
};

const updateUser = async (name, id) => {
  const [, [updatedUser]] = await User.update(
    { name },
    { where: { id }, returning: true },
  );

  return updatedUser;
};

const removeUser = async (id) => {
  return User.destroy({ where: { id } });
};

module.exports = {
  getUsers,
  getUserById,
  removeUser,
  updateUser,
  createUser,
};
