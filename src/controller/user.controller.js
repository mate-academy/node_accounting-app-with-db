const userService = require('../services/user.service');

const get = async (req, res) => {
  const users = await userService.getAll();

  res.status(200).send(users);
};

const getOne = async (req, res) => {
  const { id } = req.params;

  const user = await userService.getById(id);

  if (!user) {
    return res.sendStatus(404);
  }

  res.status(200).send(user);
};

const post = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  const user = await userService.create(name);

  if (!user) {
    return res.sendStatus(400);
  }

  res.status(201).send(user);
};

const remove = async (req, res) => {
  const { id } = req.params;

  const user = await userService.getById(id);

  if (!user) {
    return res.sendStatus(404);
  }

  await userService.remove(id);
  res.sendStatus(204);
};

const patch = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = await userService.getById(id);

  if (!user) {
    return res.sendStatus(404);
  }

  const updatedUser = await userService.change(id, name);

  res.status(200).send(updatedUser);
};

module.exports = {
  get,
  getOne,
  post,
  remove,
  patch,
};
