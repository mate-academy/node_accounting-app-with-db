const usersRepository = require('../repositories/users.repository.js');

const getAllUsersService = async () => {
  const usersData = await usersRepository.getAllUsersDB();

  return usersData ?? [];
};

const getUserByIdService = async (userId) => {
  const userData = await usersRepository.getUserByIdDB(userId);

  return userData;
};

const createUserService = async (userName) => {
  const newUser = await usersRepository.createUserDB(userName);

  return newUser;
};

const updateUserService = async (updateUserData) => {
  const updatedUser = await usersRepository.updateUserDB(updateUserData);

  return updatedUser;
};

const deleteUserService = async (userId) => {
  const deleteUser = await usersRepository.deleteUserDB(userId);

  return deleteUser;
};

const usersService = {
  getAllUsersService,
  getUserByIdService,
  createUserService,
  updateUserService,
  deleteUserService,
};

module.exports = usersService;
