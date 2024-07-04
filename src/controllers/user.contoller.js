const userService = require('../services/user.service');

const getUsers = (_, res) => {
  const users = userService.getUsers();

  res.json(users);
};

const getUserById = (req, res) => {
  const { id } = req.params;

  const user = userService.getUserById(Number(id));

  if (!user) {
    res.status(404).json({ message: 'User not found' });

    return;
  }

  res.json(user);
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Field "name" is required' });
  }

  const user = userService.createUser(name);

  res.status(201).json(user);
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  const user = userService.deleteUser(Number(id));

  if (!user) {
    res.status(404).json({ message: 'User not found' });

    return;
  }

  res.status(204).end();
};

const patchUser = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  const user = userService.patchUser(Number(id), name);

  if (!user) {
    res.status(404).json({ message: 'User not found' });

    return;
  }

  res.json(user);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  deleteUser,
  patchUser,
};
