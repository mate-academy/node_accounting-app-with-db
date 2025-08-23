const { User } = require('../models/User.model');

const getAllUsers = async () => {
  return User.findAll();
};

const getOneUser = async (id) => {
  return User.findByPk(id);
};

const createUser = async (userData) => {
  const newUser = await User.create(userData);

  return newUser;
};

const updateUser = async (id, paramsToUpdate) => {
  const [updatedCount, updatedUsers] = await User.update(paramsToUpdate, {
    where: { id },
    returning: true,
  });

  if (updatedCount === 0) {
    return null;
  }

  return updatedUsers[0];
};

const deleteUser = async (id) => {
  const deletedCount = await User.destroy({ where: { id } });

  return deletedCount > 0;
};

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
};
