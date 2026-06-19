const usersService = require('../services/users.service.js');

const getAllUsers = async (req, res) => {
  const users = await usersService.getAllUsersService();

  res.json(users);
};

const getUserById = async (req, res) => {
  const userId = Number(req.params.userId);

  if (!userId) {
    return res.sendStatus(400);
  }

  const user = await usersService.getUserByIdService(userId);

  if (!user) {
    return res.sendStatus(404);
  }

  res.status(200).json(user);
};

const createUser = async (req, res) => {
  const userName = req.body.name;

  if (!userName) {
    return res.sendStatus(400);
  }

  const user = await usersService.createUserService(userName);

  res.status(201).json(user);
};

const updateUser = async (req, res) => {
  const updateUserData = { id: Number(req.params.userId), name: req.body.name };

  if (!updateUserData.id) {
    return res.sendStatus(404);
  }

  const user = await usersService.updateUserService(updateUserData);

  if (!user) {
    return res.sendStatus(404);
  }

  res.status(200).json(user);
};

const deleteUser = async (req, res) => {
  const userId = Number(req.params.userId);

  if (!userId) {
    return res.sendStatus(400);
  }

  const user = await usersService.deleteUserService(userId);

  if (!user) {
    return res.sendStatus(404);
  }

  res.status(204).json(user);
};

const usersController = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};

module.exports = usersController;
