const usersService = require('../services/users.service');

const getAllUsers = async (req, res) => {
  const users = await usersService.getAll();

  res.send(users);
};

const getUserById = async (req, res) => {
  const id = Number(req.params.id);
  const user = await usersService.getById(id);

  if (!user) {
    return res.sendStatus(404);
  }

  res.status(200).json(user);
};

const createUser = async (req, res) => {
  const name = req.body.name;

  if (!name) {
    return res.sendStatus(400);
  }

  const user = await usersService.create(name);

  res.status(201).send(user);
};

const deleteUser = async (req, res) => {
  const id = Number(req.params.id);
  const user = await usersService.getById(id);

  if (!user) {
    return res.sendStatus(404);
  }

  await usersService.deleteById(id);

  res.sendStatus(204);
};

const updateUser = async (req, res) => {
  const id = Number(req.params.id);
  const user = await usersService.getById(id);
  const newName = req.body.name;

  if (!user) {
    return res.sendStatus(404);
  }

  const updatedUser = await usersService.updateById(id, { name: newName });

  res.send(updatedUser);
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
};
