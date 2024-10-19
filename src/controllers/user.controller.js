const userService = require('../services/user.service');

const get = async (req, res) => {
  const users = await userService.getAll();

  if (!users) {
    res.send(users);
    res.sendStatus(404);

    return;
  }

  res.send(users);
};

const getOne = async (req, res) => {
  const { id } = req.params;

  const user = await userService.getById(+id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const user = await userService.getById(+id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(422);

    return;
  }

  await userService.updateUser({ id, name });

  const updatedUser = await userService.getById(+id);

  if (!updatedUser) {
    res.sendStatus(404);

    return;
  }

  res.send(updatedUser);
};

const create = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const user = await userService.createUser(name);

  res.statusCode = 201;
  res.send(user);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const userId = +id;

  if (await userService.getById(userId)) {
    await userService.deleteUser(userId);
    res.sendStatus(204);

    return;
  }

  res.sendStatus(404);
};

module.exports = {
  get,
  getOne,
  update,
  create,
  remove,
};
