const { usersService } = require('../services/users.service');

const getAll = async (req, res) => {
  const users = await usersService.getAll();

  res.json(users);
};

const getById = async (req, res) => {
  const id = Number(req.params.id);
  const user = await usersService.getById(id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json(user);
};

const create = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  const user = await usersService.create(name);

  res.status(201).json(user);
};

const remove = async (req, res) => {
  const id = Number(req.params.id);
  const user = await usersService.deleteById(id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.status(204).send();
};

const update = async (req, res) => {
  const id = Number(req.params.id);
  const changes = req.body;
  const user = await usersService.update({ id, ...changes });

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json(user);
};

const usersController = {
  getAll,
  getById,
  create,
  remove,
  update,
};

module.exports = { usersController };
