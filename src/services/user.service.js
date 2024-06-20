const { User } = require('../models/User.model');

const getAllUsers = async () => {
  return User.findAll();
};

const getUserById = async (userId) => {
  return User.findByPk(userId);
};

// const existUser = (userId) => users.some((user) => user.id === userId);

const addUser = async (name) => {
  const newUser = {
    name,
  };

  return User.create(newUser);
};

const deleteUser = async (id) => {
  return User.destroy({
    where: { id },
  });
};

const updateUser = async (id, name) => {
  const nameToUpdate = {
    name,
  };
  const idToUpdate = {
    where: {
      id,
    },
  };

  await User.update(nameToUpdate, idToUpdate);

  return User.findByPk(id);
};

module.exports = {
  getAllUsers,
  getUserById,
  deleteUser,
  addUser,
  updateUser,
};
