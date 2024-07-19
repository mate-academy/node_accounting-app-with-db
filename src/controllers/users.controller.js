const userService = require('../services/user.service');

const getAllUsers = async (req, res) => {
  const users = await userService.getAllUsers();

  res.send(users);
};

const createUser = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = await userService.createUser(name);

  return res.status(201).json(newUser);
};

const getUser = async (req, res) => {
  const { id } = req.params;

  const user = await userService.getUserById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  const user = await userService.getUserById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  await userService.deleteUser(id);

  res.sendStatus(204);
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = await userService.getUserById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const updatedUser = await userService.updateUser(id, name);

  res.send(updatedUser);
};

module.exports = {
  getAllUsers,
  createUser,
  getUser,
  deleteUser,
  updateUser,
};
