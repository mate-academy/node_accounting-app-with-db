'use strict';

const userService = require('../services/userService');

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAll();

    res.status(200).json(users);
  } catch (error) {
    // console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    // console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Failed to fetch user' });
  }
};

// Create new user
const createUser = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Bad request' });
    }

    const newUser = await userService.create(req.body);

    // newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    // console.error('Error creating user:', error);
    res.status(400).json({ message: 'Failed to create user' });
  }
};

// Update existing user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the user exists before trying to update
    const user = await userService.getById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // If user exists, update the user and return a success message
    await userService.update({ id, ...req.body });

    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    // console.error('Error updating user:', error);
    res.status(400).json({ message: 'Failed to update user' });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedRows = await userService.remove(id);

    if (deletedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    // console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Failed to delete user' });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
