'use strict';

const { User } = require('./../models/User.model');

const getAllUsers = async (req, res) => {
  const users = await User.findAll();

  res.status(200).json(users);
};

const createUser = async (req, res) => {
  const name = req.body.name;

  if (!name) {
    res.status(400).json({ message: 'Name is required' });

    return;
  }

  const newUser = await User.create({ name });

  res.status(201).json(newUser);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);

  if (!user) {
    res.status(404).json({ message: 'User not found' });

    return;
  }

  res.status(200).json(user);
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const name = req.body.name;
  const user = await User.findByPk(id);

  if (!user) {
    res.status(404).json({ message: 'User not found' });

    return;
  }

  const updatedUser = await user.update({ name });

  res.status(200).json(updatedUser);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);

  if (!user) {
    res.status(404).json({ message: 'User not found' });

    return;
  }

  await user.destroy();

  res.status(204).end();
};

module.exports = {
  getAllUsers,
  createUser,
  getById,
  updateUser,
  deleteUser,
};
