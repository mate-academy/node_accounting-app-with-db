const usersService = require('../services/users.service');

const getAll = async (_, res) => {
  res.send(await usersService.getAll());
};

const getOne = async (req, res) => {
  const id = +req.params.id;

  if (isNaN(id)) {
    res.sendStatus(400);

    return;
  }

  const user = await usersService.getById(id);

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

  res.statusCode = 201;
  res.send(await usersService.create(name));
};

const remove = async (req, res) => {
  const id = +req.params.id;

  if (isNaN(id)) {
    res.sendStatus(400);

    return;
  }

  const isDeleted = await usersService.remove(id);

  if (!isDeleted) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus(204);
};

const update = async (req, res) => {
  const id = +req.params.id;
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const result = await usersService.update(id, name);

  if (!result[0]) {
    res.sendStatus(404);

    return;
  }

  res.send(result[1][0]);
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
