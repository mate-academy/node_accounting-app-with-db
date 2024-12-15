const { userService } = require('../services/user.service.js');

const getUsers = async (req, res) => {
  const users = await userService.getUsers();

  res.json(users);
};

const createUser = async (req, res) => {
  const name = req.body.name;

  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  const user = await userService.createUser(name);

  res.status(201).json(user);
};

const getUserById = async (req, res) => {
  const user = await userService.getUserById(+req.params.id);

  if (!user) {
    return res.sendStatus(404);
  }

  res.json(user);
};

const updateUser = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  const normalizedId = +id;

  if (!name) {
    return res.sendStatus(400);
  }

  const user = await userService.getUserById(normalizedId);

  if (!user) {
    return res.sendStatus(404);
  }

  const updatedUser = await userService.updateUser({
    id: normalizedId,
    name,
  });

  res.json(updatedUser);
};

const deleteUser = async (req, res) => {
  const user = await userService.deleteUser(+req.params.id);

  if (!user) {
    return res.sendStatus(404);
  }

  res.sendStatus(204);
};

const userController = {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};

module.exports = {
  userController,
};
