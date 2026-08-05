const usersService = require('../services/usersService');
/* eslint-disable no-console */

const create = async (req, res) => {
  console.log('controller create');

  const name = req.body.name;

  if (!name) {
    return res.status(400).json({ message: 'Bad Request' });
  }

  const user = await usersService.createUser(name);

  console.log('USER CREATED', user);

  return res.status(201).json(user);
};

const getAll = async (req, res) => {
  const users = await usersService.getAllUsers();

  return res.status(200).json(users);
};

const getOne = async (req, res) => {
  const { id } = req.params;
  const user = await usersService.getUserById(id);

  if (!user) {
    return res.status(404).json({ message: 'Not Found' });
  }

  return res.status(200).json(user);
};

const remove = async (req, res) => {
  const { id } = req.params;

  const deleted = await usersService.deleteUser(id);

  if (!deleted) {
    return res.status(404).json({ message: 'Not Found' });
  }

  return res.sendStatus(204);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = await usersService.updateUser(id, name);

  if (!user) {
    return res.status(404).json({ message: 'Not Found' });
  }

  return res.status(200).json(user);
};

module.exports = {
  create,
  getAll,
  getOne,
  remove,
  update,
};
