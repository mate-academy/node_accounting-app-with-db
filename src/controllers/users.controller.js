'use strict';

const userService = require('../services/users.service');

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAll();

    res.json(users);
  } catch {
    res.statusCode = 500;
    res.statusMessage = 'Something went wrong';
    res.end();
  }
};

const getOneUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getById(+id);

    if (!user) {
      res.statusCode = 404;
      res.statusMessage = 'Error';
      res.end();
    }
    res.json(user);
  } catch {
    res.statusCode = 500;
    res.statusMessage = 'Something went wrong';
    res.end();
  }
};

const createUser = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      res.statusCode = 400;
      res.statusMessage = 'Error';
      res.end();
    }

    const newUser = await userService.create(name);

    res.statusCode = 201;
    res.json(newUser);
    res.end();
  } catch {
    res.statusCode = 500;
    res.statusMessage = 'Something went wrong';
    res.end();
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const user = await userService.getById(+id);

    if (!user || !name) {
      res.statusCode = 404;
      res.statusMessage = 'Error';
      res.end();
    }

    const updatedUser = await userService.update(id, name);

    res.json(updatedUser);
  } catch {
    res.statusCode = 500;
    res.statusMessage = 'Something went wrong';
    res.end();
  }
};

const removeUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getById(+id);

    if (!user) {
      res.statusCode = 404;
      res.statusMessage = 'Error';
      res.end();
    }

    userService.remove(+id);
    res.statusCode = 204;
    res.end();
  } catch {
    res.statusCode = 500;
    res.statusMessage = 'Something went wrong';
    res.end();
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  removeUser,
};
