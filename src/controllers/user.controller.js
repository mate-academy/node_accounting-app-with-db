const userService = require('../services/user.service');

const getAll = async (req, res) => {
  const users = await userService.getAll();

  res.status(200).json(users);
};

const getOne = async (req, res) => {
  const id = +req.params.id;

  if (isNaN(id)) {
    return res.sendStatus(400);
  }

  const user = await userService.getById(id);

  if (!user) {
    return res.sendStatus(404);
  }

  res.status(200).json(user);
};

const create = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  const newUser = await userService.create({ name });

  res.status(201).json(newUser);
};

const update = async (req, res) => {
  const id = +req.params.id;
  const { name } = req.body;

  if (!name || typeof name !== 'string' || isNaN(id)) {
    return res.sendStatus(400);
  }

  const user = await userService.getById(id);

  if (!user) {
    return res.sendStatus(404);
  }

  const updatedUser = await userService.update(id, { name });

  res.status(200).json(updatedUser);
};

const remove = async (req, res) => {
  const id = +req.params.id;

  if (isNaN(id)) {
    return res.sendStatus(400);
  }

  const user = await userService.getById(id);

  if (!user) {
    return res.sendStatus(404);
  }

  await userService.remove(id);
  res.sendStatus(204);
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
