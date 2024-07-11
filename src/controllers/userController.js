'use strict';

const userService = require('../services/userService');

async function createUser(req, res) {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send('Name and  are required');
  }

  try {
    const newUser = await userService.createUser({ name });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).send('Error creating user');
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await userService.getAllUsers(req.query);

    res.json(users);
  } catch (error) {
    res.status(500).send('Error fetching users');
  }
}

async function getUser(req, res) {
  try {
    const users = await userService.getAllUsers({
      id: parseInt(req.params.id),
    });
    const user = users[0];

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.json(user);
  } catch (error) {
    res.status(500).send('Error fetching user');
  }
}

async function updateUser(req, res) {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send('Name and  are required');
  }

  try {
    const user = await userService.updateUser(parseInt(req.params.id), {
      name,
    });

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.json(user);
  } catch (error) {
    res.status(500).send('Error updating user');
  }
}

async function deleteUser(req, res) {
  try {
    const success = await userService.deleteUser(parseInt(req.params.id));

    if (!success) {
      return res.status(404).send('User not found');
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).send('Error deleting user');
  }
}

module.exports = {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};
