const usersService = require('../services/users.service');

const get = async (req, res) => {
  const users = await usersService.getAll();

  res.send(users);
};

const getOne = async (req, res) => {
  const { id } = req.params;
  const data = await usersService.getById(id);

  if (!data) {
    res.sendStatus(404);

    return;
  }

  res.send(data);
};

const create = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = await usersService.create(name);

  res.status(201);

  res.send(newUser);
};

const remove = async (req, res) => {
  const { id } = req.params;

  const user = await usersService.getById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  await usersService.remove(id);

  res.sendStatus(204);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const user = await usersService.getById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  const updatedUser = await usersService.update(id, name);

  res.send(updatedUser);
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
