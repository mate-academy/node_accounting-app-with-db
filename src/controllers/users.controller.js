const usersService = require('../services/users.service');

const getAllUsers = async (req, res) => {
  const users = await usersService.getUsers();

  res.send(users);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await usersService.getUser(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(user);
};

const createNewUser = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = await usersService.createUser(name);

  res.status(201).send(newUser);
};

const updateUserById = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const user = await usersService.getUser(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  const updatedUser = await usersService.updateUser({ id, name });

  res.status(200).send(updatedUser);
};

const deleteUserById = async (req, res) => {
  const { id } = req.params;
  const user = await usersService.getUser(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  usersService.deleteUser(user.id);
  res.sendStatus(204);
};

module.exports = {
  getAllUsers,
  getUserById,
  createNewUser,
  updateUserById,
  deleteUserById,
};
