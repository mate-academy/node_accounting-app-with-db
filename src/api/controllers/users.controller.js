const { usersServices } = require('../services/users.services');

const getAll = async (req, res) => {
  const users = await usersServices.getAll();

  res.json(users);
};

const getUser = async (req, res) => {
  const userId = +req.params.id;

  if (!userId) {
    return res.sendStatus(400);
  }

  const user = await usersServices.getUserById(userId);

  if (!user) {
    return res.sendStatus(404);
  }

  res.json(user);
};

const createUser = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  const user = await usersServices.createUser(name);

  res.status(201).json(user);
};

const deleteUser = async (req, res) => {
  const user = await usersServices.getUserById(+req.params.id);

  if (!user) {
    return res.sendStatus(404);
  }

  await usersServices.deleteUser(+req.params.id);

  res.sendStatus(204);
};

const updateUser = async (req, res) => {
  const { name } = req.body;
  const user = await usersServices.getUserById(+req.params.id);

  if (!name) {
    return res.sendStatus(400);
  }

  if (!user) {
    return res.sendStatus(404);
  }

  const updatedUser = await usersServices.updateUser({
    id: +req.params.id,
    name: name,
  });

  res.json(updatedUser);
};

const usersController = {
  getAll,
  getUser,
  deleteUser,
  updateUser,
  createUser,
};

module.exports = {
  usersController,
};
