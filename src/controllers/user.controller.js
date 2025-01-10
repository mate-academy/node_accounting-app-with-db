/* eslint-disable no-console */
const {
  getAll,
  getById,
  create,
  update,
  remove,
} = require('../services/user.services');

const getAllUsers = async (req, res) => {
  const users = await getAll();

  return res.status(200).json(users);
};

const getOneUser = async (req, res, next) => {
  const { id } = req.params;

  const user = await getById(id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  return res.status(200).json(user);
};

const createUser = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  const newUser = await create({ name });

  res.status(201).json(newUser);
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = req.body;

  await update(id, user);

  const updatedUser = await getById(id);

  return res.status(200).json(updatedUser);
};

const removeUser = async (req, res) => {
  const { id } = req.params;

  const user = await getById(id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  await remove(id);

  return res.status(204).end();
};

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  removeUser,
};
