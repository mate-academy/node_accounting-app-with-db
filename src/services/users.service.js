const { User } = require('../models/User.model');

const getAllUsers = async () => {
  const users = await User.findAll();

  return users;
};

const getUserById = async (id) => {
  return User.findByPk(id);
};

const createUser = async (name) => {
  return User.create({ name });
};

const removeUser = async (id) => {
  await User.destroy({
    where: {
      id,
    },
  });
};

const updateUser = async ({ id, name }) => {
  await User.update({ name }, { where: { id } });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  removeUser,
  updateUser,
};
