'use strict';

const userService = require('../services/user.service');

const getAll = async(req, res) => {
  try {
    const users = await userService.findAllUsers();

    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(`Internal Server Error ${error}`);
  }
};

const findById = async(req, res) => {
  try {
    const { userId } = req.params;
    const user = await userService.findUserById(userId);

    if (!user) {
      return res.status(404).send('No user found.');
    }

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(`Internal Server Error ${error}`);
  }
};

const createNewUser = async(req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send('Bad Request: Name is required');
    }

    const newUser = await userService.createUser(name);

    res.status(201).send(newUser);
  } catch (error) {
    res.status(500).send(`Internal Server Error ${error}`);
  }
};

const deleteUserById = async(req, res) => {
  const { userId } = req.params;

  await userService.deleteUser(userId);
  res.status(204).send();
};

const handleUserUpdate = async(req, res) => {
  try {
    const { userId } = req.params;
    const { name } = req.body;

    if (typeof name !== 'string') {
      return res.status(422)
        .send('Unprocessable Entity: Name should be a string');
    }

    const foundUser = await userService.findUserById(userId);

    const updatedUser = await userService.updateUser({
      id: userId,
      name,
    });

    if (!foundUser || !updatedUser) {
      return res.status(404).send('No user found.');
    }

    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(500).send(`Internal Server Error ${error}`);
  }
};

module.exports = {
  getAll,
  findById,
  createNewUser,
  deleteUserById,
  handleUserUpdate,
};
