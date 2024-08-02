const usersService = require('../services/users.service');

const getAll = async (req, res) => {
  const users = await usersService.getAll();

  res.json(users.map(usersService.normalize));
};

const create = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  const newUser = await usersService.create(name);

  res.status(201).json(usersService.normalize(newUser));
};

const getById = async (req, res) => {
  const { id } = req.params;
  const numId = +id;

  if (!id || isNaN(numId)) {
    return res.sendStatus(400);
  }

  const user = await usersService.getById(numId);

  if (!user) {
    return res.sendStatus(404);
  }

  res.json(usersService.normalize(user));
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const numId = +id;

  if (!id || isNaN(numId)) {
    return res.sendStatus(400);
  }

  const user = await usersService.getById(numId);

  if (!user) {
    return res.sendStatus(404);
  }

  await usersService.deleteById(numId);

  res.status(204).json(usersService.normalize(user));
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const numId = +id;

  if (!id || !name || isNaN(numId)) {
    return res.sendStatus(400);
  }

  const user = await usersService.getById(numId);

  if (!user) {
    return res.sendStatus(404);
  }

  const updatedUser = await usersService.updateById(numId, { name });

  res.json(usersService.normalize(updatedUser));
};

module.exports = {
  getAll,
  create,
  getById,
  deleteById,
  updateById,
};
