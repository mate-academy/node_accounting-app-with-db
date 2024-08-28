const usersService = require('../services/users.service');

const getUsers = async (req, res) => {
  const users = await usersService.getUsers();

  res.send(users.map(usersService.normalize));
};

const createUser = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = await usersService.createUser(name);

  res.status(201).send(usersService.normalize(newUser));
};

const getUser = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const user = await usersService.getUser(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(usersService.normalize(user));
};

const removeUser = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const user = await usersService.getUser(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  await usersService.removeUser(id);

  res.sendStatus(204);
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!id || !name) {
    res.sendStatus(400);

    return;
  }

  if (!(await usersService.getUser(id))) {
    res.sendStatus(404);

    return;
  }

  await usersService.updateUser(id, name);

  const newUser = await usersService.getUser(id);

  res.send(usersService.normalize(newUser));
};

module.exports = {
  getUsers,
  createUser,
  getUser,
  deleteUser: removeUser,
  updateUser,
};
