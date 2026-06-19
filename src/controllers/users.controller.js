const userService = require('../services/users.service');

exports.getUsers = async (req, res) => {
  const users = await userService.getUsers();

  res.json(users);
};

exports.createUser = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Bad request' });
  }

  const user = await userService.createUser(name);

  res.status(201).json(user);
};

exports.getUserById = async (req, res) => {
  const id = Number(req.params.id);
  const user = await userService.getUserById(id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json(user);
};

exports.deleteUserById = async (req, res) => {
  const id = Number(req.params.id);
  const deleted = await userService.deleteUserById(id);

  if (!deleted) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.status(204).send();
};

exports.updateUserById = async (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Bad request' });
  }

  const user = await userService.getUserById(id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const updated = await userService.updateUserById(id, name);

  res.json(updated);
};
