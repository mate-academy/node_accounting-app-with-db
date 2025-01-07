const usersServices = require('../services//usersService.js');

const { asyncHandler } = require('../utils/asyncHandler');
const { getErrorWithStatus } = require('../utils/getError');
const { getValidId, getValidString } = require('../utils/validation');

const getUsers = async (_, res) => {
  const users = await usersServices.getUsers();

  res.status(200).json(users);
};

const getUserById = async (req, res) => {
  const userId = getValidId(req.params.id, 'User ID is invalid');

  const user = usersServices.getUserById(userId);

  if (!user) {
    throw getErrorWithStatus(404, 'User not found');
  }

  res.status(200).json(user);
};

const createUser = async (req, res) => {
  const name = getValidString(req.body.name, 'name');

  const newUser = usersServices.createUser(name);

  res.status(201).json(newUser);
};

const updateUser = async (req, res) => {
  const userId = getValidId(req.params.id, 'User ID is invalid');
  const name = getValidString(req.body.name, 'name');

  const updatedUser = usersServices.updateUser(userId, name);

  res.status(200).json(updatedUser);
};

const removeUser = async (req, res) => {
  const userId = getValidId(req.params.id, 'User ID is invalid');

  const user = usersServices.getUserById(userId);

  if (!user) {
    throw getErrorWithStatus(404, 'User not found');
  }
  await usersServices.removeUser(+userId);

  return res.sendStatus(204);
};

module.exports = {
  getUsers: asyncHandler(getUsers),
  getUserById: asyncHandler(getUserById),
  createUser: asyncHandler(createUser),
  updateUser: asyncHandler(updateUser),
  removeUser: asyncHandler(removeUser),
};
