const userService = require('../services/user.service');

const get = async (req, res) => {
  const users = await userService.getAll();

  res.send(users.map((user) => userService.normalize(user)));
};

const getOne = (req, res) => {
  const user = req.entry;

  res.send(userService.normalize(user));
};

const create = async (req, res) => {
  const { name } = req.body;

  const user = await userService.create(name);

  res.status(201).send(userService.normalize(user));
};

const remove = async (req, res) => {
  const { id } = req.entry;

  await userService.remove(id);
  res.sendStatus(204);
};

const update = async (req, res) => {
  const { name } = req.body;
  const { id } = req.entry;

  await userService.update({ id, name });

  const user = await userService.getById(id);

  res.send(userService.normalize(user));
};

module.exports = {
  get,
  create,
  getOne,
  remove,
  update,
};
