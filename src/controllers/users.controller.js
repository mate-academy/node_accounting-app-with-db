const usersService = require('../services/users.service');

const getAllUsers = async (req, res) => {
  const users = await usersService.getAll();

  res.json(users);
};

const getOneUser = async (req, res) => {
  const id = Number(req.params.id);
  const user = await usersService.getById(id);

  if (!user) {
    return res.sendStatus(404);
  }

  res.json(user);
};

const createUser = async (req, res) => {
  const name = req.body.name;

  if (!name) {
    return res.sendStatus(400);
  }

  const user = await usersService.create(name);

  res.status(201).json(user);
};

const deleteOneUser = async (req, res) => {
  const id = Number(req.params.id);
  const user = await usersService.getById(id);

  if (!user) {
    return res.sendStatus(404);
  }

  await usersService.deleteById(id);
  res.sendStatus(204);
};

const updateUser = async (req, res) => {
  const { name } = req.body;
  const id = Number(req.params.id);
  const user = await usersService.getById(id);

  if (!user) {
    return res.sendStatus(404);
  }

  const updatedUser = await usersService.update({
    id,
    name,
  });

  res.json(updatedUser);
};

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  deleteOneUser,
  updateUser,
};
