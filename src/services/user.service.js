const { User } = require('../models/User.model');

const getAllUsers = async () => {
  const users = await User.findAll();

  return users.map((user) => user.toJSON());
};

const getUserById = async (id) => {
  const user = await User.findByPk(id);

  return user ? user.toJSON() : null;
};

const createUser = async (userData) => {
  const newUser = await User.create(userData);

  return newUser.toJSON();
};

const deleteUser = async (id) => {
  const deletedCount = await User.destroy({ where: { id } });

  return deletedCount > 0;
};

const updateUser = async (id, userData) => {
  const [updatedCount] = await User.update(userData, { where: { id } });

  if (updatedCount > 0) {
    const updatedUser = await getUserById(id);

    return updatedUser;
  }

  return null;
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
};
