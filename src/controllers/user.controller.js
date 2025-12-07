const userService = require('../services/user.service');

const get = async (req, res) => {
  const users = await userService.getAll();

  res.status(200).send(users);
};

const getOne = async (req, res) => {
  const { id } = req.params;

  const user = await userService.getOne(id);

  if (!user) {
    return res.sendStatus(404);
  }

  res.status(200).send(user);
};

const create = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  const newUser = await userService.create(name);

  res.status(201).send(newUser);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  const updatedUser = await userService.update(id, name);

  if (!updatedUser) {
    return res.sendStatus(404);
  }

  res.status(200).send(updatedUser);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const deleted = await userService.remove(id);

  if (!deleted) {
    return res.sendStatus(404);
  }

  res.sendStatus(204);
};

module.exports = {
  get,
  getOne,
  create,
  update,
  remove,
};
