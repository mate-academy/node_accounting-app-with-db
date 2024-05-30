const usersServices = require('../services/users.service.js');

const getAllUsers = async (req, res) => {
  res.send(await usersServices.allUsers());
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const userById = await usersServices.userById(id);

  if (!userById) {
    res.sendStatus(404);

    return;
  }

  res.send(userById);
};

const createUser = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = await usersServices.createUser(name);

  res.status(201).send(newUser);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!(await usersServices.userById(id))) {
    res.sendStatus(404);

    return;
  }

  await usersServices.deleteUser(id);

  res.sendStatus(204);
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const userById = await usersServices.userById(id);

  if (!userById) {
    res.sendStatus(404);

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(422);

    return;
  }

  const updatedUser = await usersServices.updateUser({ id, name });

  res.send(updatedUser);
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
};
