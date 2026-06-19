/* eslint-disable no-console */
const userService = require('../services/userService.js');

const getAll = async (req, res) => {
  const users = await userService.getAll();

  res.json(users);
};

const getOne = async (req, res) => {
  const id = Number(req.params.id);
  const user = await userService.getById(id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json(user);
};

const create = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  const user = await userService.create(name);

  res.status(201).json(user);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const user = await userService.getById(id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  await userService.remove(id);

  res.sendStatus(204);
};

const update = async (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;

  if (id === undefined) {
    return res.status(400).json({ message: 'Id is required' });
  }

  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  const user = await userService.update({ id, name });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json(user);
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
