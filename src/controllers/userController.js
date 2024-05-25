'use strict';

const { User } = require('../models/User.model');

const createUser = async (req, res) => {
  const { name } = req.body;

  try {
    if (!name) {
      return res.status(400).json({ message: 'Missing required parameters' });
    }

    const newUser = await User.create({ name });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { name } = req.body;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.name = name;
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.destroy();

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
