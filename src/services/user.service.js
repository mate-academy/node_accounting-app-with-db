const { User } = require('../models/User.model');

const createUser = async (name) => {
  return User.create({ name });
};
const updateUser = async (id, name) => {
  await User.update(
    { name },
    {
      where: {
        id,
      },
    },
  );

  return getUserById(id);
};
const removeUser = async (id) => {
  return User.destroy({
    where: {
      id,
    },
  });
};
const getUserById = async (id) => {
  return User.findByPk(id);
};
const getAllUsers = async () => {
  return User.findAll();
};

module.exports = {
  createUser,
  updateUser,
  removeUser,
  getAllUsers,
  getUserById,
};
