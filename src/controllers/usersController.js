'use strict';

const userService = require('../services/usersService');

const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getUsers();

    res.json(users);
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await userService.getUserById(parseInt(req.params.id, 10));

    if (user === null) {
      return res.status(404).send('User not found');
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const name = req.body.name;

    if (name === undefined) {
      return res.status(400).send('Name is not passed');
    }

    const user = await userService.createUser(name);

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await userService.getUserById(parseInt(req.params.id, 10));

    if (user === null) {
      return res.status(404).send('User not found');
    }

    await userService.deleteUserById(parseInt(req.params.id, 10));

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (name === undefined) {
      return res.status(400).send('Name is not passed');
    }

    const user = await userService.getUserById(parseInt(req.params.id, 10));

    if (user === null) {
      return res.status(404).send('User not found');
    }

    const updatedUser = await userService.updateUserById({
      id: parseInt(req.params.id, 10),
      name,
    });

    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
};
