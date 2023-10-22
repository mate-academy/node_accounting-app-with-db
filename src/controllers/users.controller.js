'use strict';

const usersService = require('../service/users.services');

const getAllUsers = async(req, res) => {
  try {
    const users = await usersService.getAllUsers();

    res.send(users);
  } catch (error) {
    res.status(500).send('An error occurred while fetching users.');
  }
};

const getUser = async(req, res) => {
  try {
    const { userId } = req.params;
    const foundUser = await usersService.getUserById(userId);

    if (!foundUser) {
      res.status(404).send('User Not Found');

      return;
    }

    res.send(foundUser);
  } catch (error) {
    res.status(500).send('An error occurred while fetching the user.');
  }
};

const createUser = async(req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      res.status(400).send('Username Not Found');

      return;
    }

    const newUser = await usersService.createUser(name);

    res.status(201).send(newUser);
  } catch (error) {
    res.status(500).send('An error occurred while creating the user.');
  }
};

const updateUser = async(req, res) => {
  try {
    const { userId } = req.params;
    const { name } = req.body;
    const foundUser = await usersService.getUserById(userId);

    if (!foundUser) {
      res.status(404).send('User Not Found');

      return;
    }

    if (!name) {
      res.status(400).send('Username Not Found');

      return;
    }

    await usersService.updateUser(userId, name);
    res.send(foundUser);
  } catch (error) {
    res.status(500).send('An error occurred while updating the user.');
  }
};

const removeUser = async(req, res) => {
  try {
    const { userId } = req.params;
    const foundUser = await usersService.getUserById(userId);

    if (!foundUser) {
      res.status(404).send('User Not Found');

      return;
    }

    await usersService.removeUser(userId);

    res.sendStatus(204);
  } catch (error) {
    res.status(500).send('An error occurred while removing the user.');
  }
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  removeUser,
};
