const usersService = require('../services/users.service.js');

const getAll = async (req, res) => {
  const users = await usersService.getAll();

  res.json(users);
};

const getOne = async (req, res) => {
  const id = Number(req.params.id);
  const user = await usersService.getById(id);

  if (!user) {
    return res.sendStatus(404);
  }

  res.json(user);
};

const create = async (req, res) => {
  const name = req.body.name;

  if (!name) {
    return res.sendStatus(400);
  }

  const user = await usersService.create(name);

  res.status(201).json(user);
};

const deleteOne = async (req, res) => {
  const id = Number(req.params.id);
  const user = await usersService.getById(id);

  if (!user) {
    return res.sendStatus(404);
  }

  await usersService.deleteById(id);

  res.sendStatus(204);
};

const update = async (req, res) => {
  const name = req.body.name;
  const id = Number(req.params.id);
  const user = await usersService.getById(id);

  if (!user) {
    return res.sendStatus(404);
  }

  await usersService.update({
    id,
    name,
  });

  const updatedUser = await usersService.getById(id);

  res.json(updatedUser);
};

module.exports = {
  getAll,
  getOne,
  create,
  deleteOne,
  update,
};
