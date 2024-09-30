const userService = require('../services/user.service');

const get = async (req, res) => {
  res.send(await userService.get());
};

const getById = async (req, res) => {
  const id = +req.params.id;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const user = await userService.getById(id);

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

  const newUser = await userService.create(name);

  res.status(201).send(newUser);
};

const update = async (req, res) => {
  const id = +req.params.id;
  const { name } = req.body;

  if (!id || !name) {
    res.sendStatus(400);

    return;
  }

  if (!userService.getById(id)) {
    res.sendStatus(404);

    return;
  }

  const updatedUser = await userService.update(id, name);

  res.send(updatedUser);
};

const remove = async (req, res) => {
  const id = +req.params.id;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  if (!userService.getById(id)) {
    res.sendStatus(404);

    return;
  }

  await userService.remove(id);

  res.sendStatus(204);
};

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
};
