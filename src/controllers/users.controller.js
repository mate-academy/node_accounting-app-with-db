const usersService = require('../services/users.service.js');

const getAllUsers = (req, res) => {
  res.status(200).send(usersService.getAllUsers());
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).send('Name is required');

    return;
  }

  const newUser = usersService.createUser(name);

  res.status(201).send(newUser);
};

const getUser = (req, res) => {
  const { id } = req.params;

  const user = usersService.getUserById(+id);

  if (!user) {
    res.status(404).send('User not found!');

    return;
  }

  res.status(200).send(user);
};

const removeUser = (req, res) => {
  const { id } = req.params;

  if (!usersService.getUserById(+id)) {
    res.status(404).send('User not found!');

    return;
  }

  usersService.removeUser(+id);
  res.status(204).send('User removed successfully!');
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    res.status(400).send('Name is required');

    return;
  }

  const user = usersService.getUserById(+id);

  if (!user) {
    res.status(404).send('User not found!');

    return;
  }

  const updatedUser = usersService.updateUser(+id, name);

  res.status(200).send(updatedUser);
};

module.exports = {
  getAllUsers,
  createUser,
  getUser,
  removeUser,
  updateUser,
};
