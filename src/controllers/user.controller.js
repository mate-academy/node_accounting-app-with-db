const { userService } = require('../services/user.service');

const getAll = async (req, res) => {
  const users = await userService.getAll();

  res.send(users);
};

const get = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const user = await userService.get(id);

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

  const newUser = await userService.create({ name });

  res.statusCode = 201;
  res.send(newUser);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!id || !name) {
    res.sendStatus(400);

    return;
  }

  const user = await userService.get(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  const newUser = { id: +id, name };

  await userService.update(newUser);

  res.send(newUser);
};

const remove = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const user = await userService.get(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  await userService.remove(id);
  res.sendStatus(204);
};

module.exports = {
  get,
  getAll,
  create,
  update,
  remove,
};
