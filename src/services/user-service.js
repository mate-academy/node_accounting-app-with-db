const { requiredFields } = require('../types/user-type');
const { validFields } = require('../utils/validFields');
const { User } = require('../models/User.model');

const createUserService = async (user) => {
  const errors = validFields(user, requiredFields);

  if (errors.length > 0) {
    throw new Error(errors.join(', '));
  }

  const newUser = await User.create(user);

  return newUser;
};

const getAllUsersService = async () => {
  const users = await User.findAll();

  return users;
};

const getUserByIdService = async (id) => {
  const user = await User.findByPk(+id);

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};

const updateUserService = async (id, updateUser) => {
  const user = await getUserByIdService(id);

  await User.update(updateUser, {
    where: { id: user.id },
  });

  const updatedUser = await getUserByIdService(id);

  return updatedUser;
};

const deleteUserService = async (id) => {
  const user = await getUserByIdService(id);

  await User.destroy({ where: { id: user.id } });
};

const resetUsersService = () => {};

module.exports = {
  createUserService,
  getAllUsersService,

  getUserByIdService,
  updateUserService,
  deleteUserService,

  resetUsersService,
};
