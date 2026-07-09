const userModel = require('../models/User.model.js');

const getAllUsers = async (req, res) => {
  const users = await userModel.getAllUsers();

  res.json(users.map(userModel.normalize));
};

const getUserById = async (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.sendStatus(404);
  }

  const user = await userModel.getUserById(id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(userModel.normalize(user));
};

const createUser = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  const newUser = await userModel.createUser(name);

  res.status(201).json(userModel.normalize(newUser));
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  const user = await userModel.getUserById(id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  await userModel.updateUser({ id, name });

  const updatedUser = await userModel.getUserById(id);

  res.json(userModel.normalize(updatedUser));
};

const removeUser = async (req, res) => {
  const { id } = req.params;
  const user = await userModel.getUserById(id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  await userModel.removeUser(id);
  res.status(204).send();
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  removeUser,
};
