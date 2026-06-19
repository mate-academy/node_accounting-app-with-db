/* eslint-disable no-console */
/* eslint-disable no-useless-return */
const usersService = require('../services/userService');

const getUsers = async (req, res) => {
  const result = await usersService.getAllusers();

  res.send(result);
};

const getUser = async (req, res) => {
  const { id } = req.params;
  const user = await usersService.getUserById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.status(200).json(user);
};

const createUser = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const user = await usersService.createUser(name);

  res.status(201).json(user);
};

const updateUser = async (req, res) => {
  const { id } = req.params;

  const checkUser = await usersService.getUserById(id);

  if (!checkUser) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  const updatedUser = await usersService.updateUser({ id, name });

  if (!updatedUser) {
    res.sendStatus(404);

    return;
  }

  res.status(200).json(updatedUser);
};

const removeUser = async (req, res) => {
  const { id } = req.params;

  const checkUser = await usersService.getUserById(id);

  if (!checkUser) {
    res.sendStatus(404);

    return;
  }

  await usersService.removeUser(id);
  res.sendStatus(204);
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  removeUser,
};
