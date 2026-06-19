const { User } = require('../models/User.model');

const getUsers = async () => {
  return User.findAll();
};

const createUser = async (user) => {
  const { name } = user;

  if (!name) {
    return null;
  }

  return User.create({ name: name });
};

const getUserById = async (id) => {
  return User.findByPk(Number(id));
};

const deleteUserById = async (id) => {
  const deletedUser = await User.destroy({
    where: { id },
  });

  if (!deletedUser) {
    return null;
  }

  return deletedUser;
};

const updateUser = async (user, id) => {
  const { name } = user;

  const updatedUser = await User.update(
    { name },
    { where: { id }, returning: true },
  );

  if (!updatedUser) {
    return null;
  }

  return updatedUser[1][0];
};

module.exports = {
  getUsers,
  createUser,
  deleteUserById,
  getUserById,
  updateUser,
};
