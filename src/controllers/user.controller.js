const services = require('../services');

const getAllUsers = async (req, res) => {
  const users = await services.userService.getAllUsers();

  res.send(users);
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  const user = await services.userService.getUserById(id);

  if (!user) {
    return res.sendStatus(404);
  }

  res.send(user);
};

const createUser = async (req, res) => {
  const { name = null } = req?.body || {};

  if (!name) {
    return res.sendStatus(400);
  }

  const user = await services.userService.createUser({ name });

  res.status(201).send(user);
};

const removeUser = async (req, res) => {
  const { id } = req.params;

  const user = await services.userService.getUserById(id);

  if (!user) {
    return res.sendStatus(404);
  }

  await services.userService.removeUser(id);

  res.sendStatus(204);
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name = null } = req?.body || {};

  const user = await services.userService.getUserById(id);

  if (!user) {
    return res.sendStatus(404);
  }

  if (!name) {
    return res.sendStatus(400);
  }

  const updatedUser = await services.userService.updateUser(id, { name });

  res.send(updatedUser);
};

module.exports = {
  getAllUsers,
  getUserById,
  removeUser,
  createUser,
  updateUser,
};
