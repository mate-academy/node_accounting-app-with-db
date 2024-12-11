const usersServices = require('../services/users.services');
const { asyncHandler } = require('../utils/asyncHandler');
const { getErrorWithStatus } = require('../utils/getError');

const getUsers = async (_, res) => {
  const users = await usersServices.getUsers();

  res.status(200).json(users);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const userId = Number(id);

  if (isNaN(userId)) {
    throw getErrorWithStatus(400, 'Invalid user ID');
  }

  const user = await usersServices.getUserById(userId);

  if (!user) {
    throw getErrorWithStatus(404, 'User not found');
  }

  res.status(200).json(user);
};

const createUser = async (req, res) => {
  const { name } = req.body;

  if (typeof name !== 'string') {
    throw getErrorWithStatus(400, 'Wrong name field type,must be string');
  }

  const newUser = await usersServices.createUser(name);

  return res.status(201).json(newUser);
};

const removeUser = async (req, res) => {
  const { id } = req.params;

  const userId = Number(id);
  const user = await usersServices.getUserById(userId);

  if (!user) {
    throw getErrorWithStatus(404, 'User not found');
  }
  await usersServices.removeUser(+userId);

  res.sendStatus(204);
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const userId = Number(id);

  if (isNaN(userId)) {
    throw getErrorWithStatus(400, 'User not found');
  }

  if (typeof name !== 'string') {
    throw getErrorWithStatus(400, 'Type of name must be string');
  }

  const updatedUser = await usersServices.updateUser(userId, name);

  res.status(200).json(updatedUser);
};

module.exports = {
  getUsers: asyncHandler(getUsers),
  getUserById: asyncHandler(getUserById),
  createUser: asyncHandler(createUser),
  removeUser: asyncHandler(removeUser),
  updateUser: asyncHandler(updateUser),
};
