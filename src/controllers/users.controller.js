const usersService = require('../services/users.service.js');

const getAllUsers = async (req, res) => {
  const users = await usersService.getAllUsers();

  res.status(200).send(users);
};

const createUser = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).send('Name is required');

    return;
  }

  const newUser = await usersService.createUser(name);

  res.status(201).send(newUser);
};

const getUser = async (req, res) => {
  const { id } = req.params;

  const user = await usersService.getUserById(+id);

  if (!user) {
    res.status(404).send('User not found!');

    return;
  }

  res.status(200).send(user);
};

const removeUser = async (req, res) => {
  const { id } = req.params;

  const user = await usersService.getUserById(+id);

  if (!user) {
    res.status(404).send('User not found!');

    return;
  }

  await usersService.removeUser(+id);
  res.status(204).send('User removed successfully!');
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    res.status(400).send('Name is required');

    return;
  }

  const user = await usersService.getUserById(+id);

  if (!user) {
    res.status(404).send('User not found!');

    return;
  }

  const updatedUser = await usersService.updateUser(+id, name);

  res.status(200).send(updatedUser);
};

module.exports = {
  getAllUsers,
  createUser,
  getUser,
  removeUser,
  updateUser,
};
