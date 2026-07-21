const usersServices = require('../services/users.service');

const getAll = async (req, res) => {
  const users = await usersServices.getAll();

  res.json(users);
};

const create = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  const user = await usersServices.create(name);

  res.status(201).json(user);
};

const getById = async (req, res) => {
  const userId = req.params.id;

  if (!userId) {
    return res.status(404).json({ error: 'UserId is required' });
  }

  const user = await usersServices.getById(userId);

  if (!user) {
    return res.status(404).json({ error: 'User is required' });
  }

  return res.status(200).json(user);
};

const deleteOne = async (req, res) => {
  const userId = req.params.id;

  if (!userId) {
    return res.status(400).json({ error: 'UserId is required' });
  }

  const user = await usersServices.getById(userId);

  if (!user) {
    return res.status(404).json({ error: 'User is required' });
  }

  await usersServices.deleteOne(userId);

  res.sendStatus(204);
};

const update = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  const { id } = req.params;

  const user = await usersServices.getById(id);

  if (!user) {
    return res.status(404).json({ error: 'User is required' });
  }

  const updatedUser = await usersServices.update({ id, name });

  res.json(updatedUser);
};

module.exports = {
  getAll,
  create,
  getById,
  deleteOne,
  update,
};
