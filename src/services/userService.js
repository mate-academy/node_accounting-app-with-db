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

const patchUser = async ({ id, name }) => {
  await User.update({ name }, { where: { id } });

  return User.findByPk(id);
};

const deleteUser = async (id) => {
  const deletedRows = await User.destroy({
    where: { id },
  });

  return deletedRows > 0;
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  patchUser,
  deleteUser,
};
