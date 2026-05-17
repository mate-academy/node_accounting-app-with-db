const usersService = require('./../services/users.service');

const getAll = async (req, res) => {
  const users = await usersService.getAll();

  res.status(200).send(users);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const user = await usersService.getOne(id);

  if (!user) {
    return res.sendStatus(404);
  }

  res.status(200).json(user);
};

const create = async (req, res) => {
  const { name } = req.body;

  if (typeof name !== 'string' || name === '') {
    return res.sendStatus(400);
  }

  const newUser = await usersService.create(name);

  res.status(201).json(newUser);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name: newName } = req.body;

  await usersService.update(id, newName);

  const user = await usersService.getOne(id);

  res.status(200).json(user);
};

const deleteById = async (req, res) => {
  const { id } = req.params;

  const user = await usersService.getOne(id);

  if (!user) {
    return res.sendStatus(404);
  }

  usersService.deleteUser(id);

  res.sendStatus(204);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById,
};
