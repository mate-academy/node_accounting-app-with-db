const usersService = require('../services/usersService');

const get = async (req, res) => {
  res.statusCode = 200;
  res.send(await usersService.getAll());
};

const getById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const user = await usersService.getById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(user);
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
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  if (!(await usersService.getById(id))) {
    res.sendStatus(404);

    return;
  }

  await usersService.remove(id);

  res.sendStatus(204);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!id || !name) {
    res.sendStatus(400);

    return;
  }

  const user = await usersService.update(id, name);

  if (!user) {
    res.sendStatus(404);

    return;
  }
  res.send(user);
};

module.exports = {
  get,
  getById,
  create,
  remove,
  update,
};
