const userService = require('../services/users.service.js');

const getAll = async (req, res) => {
  const users = await userService.getAll();

  res.json(users);
};

const create = async (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ error: 'Please enter name' });
  }

  const newUser = await userService.create(req.body.name);

  res.status(201).json(newUser);
};

const getById = async (req, res) => {
  const targetId = req.params.id;

  const targetUser = await userService.getById(targetId);

  if (!targetUser) {
    return res.status(404).send('Not Found');
  }

  res.json(targetUser);
};

const remove = async (req, res) => {
  const targetId = req.params.id;

  const index = await userService.remove(targetId);

  if (index === 0) {
    return res.status(404).send('Not Found');
  }

  res.sendStatus(204);
};

const update = async (req, res) => {
  if (!req.body.name) {
    res.status(400).json({ error: 'Please enter name' });
  }

  const { name } = req.body;
  const targetId = req.params.id;

  const targetUser = await userService.update(name, targetId);

  if (!targetUser) {
    return res.status(404).send({ error: 'User not found' });
  }

  res.send(targetUser);
};

module.exports = {
  getAll,
  create,
  getById,
  remove,
  update,
};
