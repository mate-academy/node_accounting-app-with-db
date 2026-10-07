const userService = require('../services/users.service');

const getUsers = async (req, res) => {
  const users = await userService.getAllUsers();

  res.status(200).json(users);
};

const getUser = async (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.sendStatus(400);
  }

  const user = await userService.getUserById(id);

  if (!user) {
    return res.sendStatus(404);
  }

  return res.status(200).json(user);
};

const createUser = async (req, res) => {
  const name = req.body.name;

  if (!name) {
    return res.sendStatus(400);
  }

  const newUser = await userService.createUser({ name });

  res.status(201).json(newUser);
};

const deleteUser = async (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.sendStatus(400);
  }

  const user = await userService.getUserById(id);

  if (!user) {
    return res.sendStatus(404);
  }

  await userService.deleteUser(id);

  res.sendStatus(204);
};

const updateUser = async (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.sendStatus(400);
  }

  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  const updatedUser = await userService.updateUser({ id, name });

  if (!updatedUser) {
    return res.sendStatus(404);
  }

  return res.status(200).json(updatedUser);
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
};
