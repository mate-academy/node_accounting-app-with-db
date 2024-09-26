const usersService = require('../services/users.service');

const getAll = async (req, res) => {
  res.status(200).send(await usersService.getAll());
};

const getOne = async (req, res) => {
  const { id } = req.params;
  const user = await usersService.getOne(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

const create = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const user = await usersService.create(name);

  res.status(201).send(user);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const user = await usersService.getOne(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  const updatedUser = await usersService.update(id, name);

  res.send(updatedUser);
};

const remove = async (req, res) => {
  const { id } = req.params;

  const user = await usersService.getOne(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  await usersService.remove(id);
  res.sendStatus(204);
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
