const { User } = require('../models/User.model.js');

const getAllUsersService = async () => {
  return User.findAll();
};

const getUserByIdService = async (id) => {
  return User.findByPk(id);
};

const createUserService = async ({ name }) => {
  return User.create({ name });
};

const updateUserService = async (id, name) => {
  await User.update({ name }, { where: { id } });

  return User.findByPk(id);
};

const deleteUserService = async (id) => {
  const user = await User.findByPk(id);

  if (user) {
    await User.destroy({ where: { id } });
  }

  return user;
};

module.exports = {
  getAllUsersService,
  getUserByIdService,
  createUserService,
  updateUserService,
  deleteUserService,
};
