const { User } = require('../models/User.model');

const getAllUsers = async () => {
  const users = await User.findAll();

  return users;
};

const createUser = async (name) => {
  const user = await User.create({ name });

  return user;
};

const getUserById = async (userId) => {
  const findUser = await User.findByPk(userId);

  return findUser;
};

const deleteUser = async (userId) => {
  await User.destroy({ where: { id: userId } });
};

const updateUser = async (userId, name) => {
  const user = await User.update(
    { name },
    { where: { id: userId }, returning: true },
  );

  return user;
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
};
