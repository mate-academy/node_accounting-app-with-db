const usersService = require('../services/users.service');

const getAll = async (req, res) => {
  const users = await usersService.getAll();

  res.json(users);
};

const getOne = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.status(400).end();

    return;
  }

  const user = await usersService.getById(id);

  if (user) {
    res.json(user);

    return;
  }

  res.status(404).end();
};

const create = async (req, res) => {
  const name = req.body.name;

  if (!name) {
    res.status(400).end();

    return;
  }

  const user = await usersService.create(name);

  res.status(201).json(user);
};

const remove = async (req, res) => {
  const id = req.params.id;

  const user = await usersService.getById(id);

  if (!user) {
    res.status(404).end();

    return;
  }

  await usersService.remove(id);

  res.status(204).end();
};

const update = async (req, res) => {
  const id = req.params.id;
  const name = req.body.name;

  if (!id || !name) {
    res.status(400).end();

    return;
  }

  const user = await usersService.getById(id);

  if (!user) {
    res.status(404).end();

    return;
  }

  await usersService.update(id, name);

  const updatedUser = await usersService.getById(id);

  res.status(200).json(updatedUser);
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
