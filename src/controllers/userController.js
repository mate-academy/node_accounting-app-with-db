const userService = require('../services/user.service');

const getAllUsers = async (req, res) => {
  const users = await userService.getAllUsers();

  res.json(users);
};

const getUserById = (req, res) => {
  const user = req.user;

  res.json(user);
};

const createUser = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  const newUser = await userService.createUser(req.body);

  res.status(201).json(newUser);
};

const deleteUser = async (req, res) => {
  await userService.deleteUser(req.params.id);
  res.status(204).send();
};

const updateUser = async (req, res) => {
  const updatedUser = await userService.updateUser(req.params.id, req.body);

  if (!updatedUser) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.status(200).json(updatedUser);
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
};
