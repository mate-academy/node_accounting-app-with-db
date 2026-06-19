const userService = require('../services/userService');

const getUsers = async (req, res) => {
  const users = await userService.getUsers();

  res.json(users);
};

const getUserById = async (req, res) => {
  const id = Number(req.params.id);
  const user = await userService.getUserById(id);

  if (!user) {
    return res.sendStatus(404);
  }

  res.json(user);
};

const createUser = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  const newUser = await userService.createUser({ name });

  res.status(201).json(newUser);
};

const updateUser = async (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  const updatedUser = await userService.updateUser({ id, name });

  if (!updatedUser) {
    return res.sendStatus(404);
  }

  const updatedUserResult = await userService.getUserById(id);

  res.json(updatedUserResult);
};

const deleteUser = async (req, res) => {
  const id = Number(req.params.id);
  const user = await userService.getUserById(id);

  if (!user) {
    return res.sendStatus(404);
  }

  await userService.deleteUser(id);
  res.sendStatus(204);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
