const userService = require('./../services/users.service');

const get = async (req, res, next) => {
  const users = await userService.get();

  res.send(users);
};

const create = async (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const user = await userService.create(name);

  res.statusCode = 201;
  res.send(user);
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const userId = Number(id);

  if (Number.isNaN(userId)) {
    res.sendStatus(400);

    return;
  }

  const user = await userService.getById(userId);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

const remove = async (req, res, next) => {
  const { id } = req.params;
  const userId = Number(id);

  const user = await userService.getById(userId);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  await userService.remove(userId);

  res.sendStatus(204);
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const userId = Number(id);
  const { name } = req.body;

  if (Number.isNaN(userId) || !name) {
    res.sendStatus(400);

    return;
  }

  const user = await userService.getById(userId);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  await userService.update({ id: userId, name });

  const updatedUser = await userService.getById(userId);

  res.send(updatedUser);
};

module.exports = {
  get,
  create,
  getById,
  remove,
  update,
};
