const usersService = require('../services/users.services.js');

const getAll = async (req, res) => {
  const users = await usersService.getAllUsers();

  res.send(users);
};

const addUser = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  const newUser = await usersService.addUser({ name });

  res.status(201).send(newUser);
};

const getUser = async (req, res) => {
  const { id } = req.params;

  const user = await usersService.findUser(id);

  if (!user) {
    return res.sendStatus(404);
  }

  res.status(200).send(user);
};

const removeUser = async (req, res) => {
  const { id } = req.params;

  const user = await usersService.findUser(id);

  if (!user) {
    return res.sendStatus(404);
  }

  usersService.deleteUser(id);

  res.sendStatus(204);
};

const changeUser = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const newUser = await usersService.changeUser({ id, name });

  res.send(newUser);
};

module.exports = {
  getAll,
  addUser,
  removeUser,
  getUser,
  changeUser,
};
