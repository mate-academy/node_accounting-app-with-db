const { User } = require('../models/User.model');

const getAllUsers = async () => {
  return User.findAll();
};

const getUserById = async (id) => {
  return User.findByPk(id);
};

const createUser = async (name) => {
  return User.create({ name });
};

const removeUser = async (id) => {
  return User.destroy({ where: { id } });
};

const updateUser = async (id, name) => {
  const [, [updatedUser]] = await User.update(
    { name },
    {
      where: { id },
      returning: true,
    },
  );

  return updatedUser;
};

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  removeUser,
  updateUser,
};
