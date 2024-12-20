const { User } = require('../models/User.model.js');

const getUsers = async () => {
  const users = await User.findAll();

  return users;
};

const createUser = (name) => {
  return User.create({ name });
};

const getUserById = async (id) => {
  return User.findByPk(id);
};

const updateUser = async ({ id, name }) => {
  const [numberOfAffectedRows] = await User.update({ name }, { where: { id } });

  if (numberOfAffectedRows === 0) {
    return null;
  }

  const updatedUser = await getUserById(id);

  return updatedUser;
};

const deleteUser = async (id) => {
  const deletedRows = await User.destroy({ where: { id } });

  return deletedRows > 0;
};

const userService = {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};

module.exports = {
  userService,
};
