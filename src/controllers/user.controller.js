const userService = require('../services/user.service');

const get = async (req, res) => {
  const users = await userService.getAll();

  // res.send(users.map((u) => userService.normalize(u)));

  res.send(users.map(userService.normalize));
};

const getOne = async (req, res) => {
  const id = Number(req.params.id);

  const user = await userService.getById(id);

  if (!user) {
    res.status(404).send();

    return;
  }

  res.send(userService.normalize(user));
  // res.send(user);
};

const create = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).send();

    return;
  }

  const user = await userService.create(name);

  res.status(201).send(userService.normalize(user));
};

const update = async (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;
  const user = await userService.getById(id);

  if (!user) {
    res.status(404).send();

    return;
  }

  if (!name) {
    res.status(400).send();

    return;
  }

  const updatedUser = await userService.update({ id, name });

  res.send(userService.normalize(updatedUser));
};

const remove = async (req, res) => {
  const id = Number(req.params.id);

  const user = await userService.getById(id);

  if (!user) {
    res.status(404).send();

    return;
  }

  await userService.remove(id);
  res.sendStatus(204);
};

module.exports = {
  get,
  getOne,
  create,
  update,
  remove,
};
