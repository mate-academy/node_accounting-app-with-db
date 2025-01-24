const userService = require('../services/user.service');

const get = async (_req, res) => {
  res.status(200).send(await userService.getAll());
};

const getById = async (req, res) => {
  const { id } = req.params;

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
    return res.sendStatus(400);
  }

  const newUser = await userService.createUser(name);

  res.status(201).send(newUser);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const user = await userService.getById(id);

  if (!id) {
    res.sendStatus(400);

    return;
  }

  if (!user) {
    res.sendStatus(404);

    return;
  }

  await userService.remove(+id);

  res.sendStatus(204);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const user = await userService.getById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  const updatedUser = await userService.update({ id, name });

  res.send(updatedUser);
};

module.exports = {
  get,
  getById,
  remove,
  create,
  update,
};
