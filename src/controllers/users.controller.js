const usersService = require('../services/users.services');
const { statusCodes } = require('../constants/statusode');

const getAllUsers = async (req, res) => {
  const users = await usersService.getAll();

  res.status(statusCodes.ok).json(users);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await usersService.getByUserId(id);

  if (!user) {
    return res.status(statusCodes.not_found).send('User not found');
  }

  res.status(statusCodes.ok).json(user);
};

const createUser = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(statusCodes.bad_request).send('Name is required');
  }

  const newUser = await usersService.createUser(name);

  res.status(statusCodes.created).json(newUser);
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const user = await usersService.getByUserId(Number(id));

  if (!user) {
    return res.status(statusCodes.bad_request).send('User not found');
  }

  if (typeof name !== 'string') {
    return res.status(statusCodes.bad_request).send('Invalid name');
  }

  const updatedUser = await usersService.updateUser({ id, name });

  if (!updatedUser) {
    return res.status(statusCodes.not_found).send('User not found');
  }

  res.status(statusCodes.ok).json(updatedUser);
};

const removeUser = async (req, res) => {
  const { id } = req.params;
  const user = await usersService.getByUserId(id);

  if (!user) {
    return res.status(statusCodes.not_found).send('User not found');
  }

  await usersService.deleteUser(id);
  res.sendStatus(statusCodes.no_content);
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  removeUser,
};
