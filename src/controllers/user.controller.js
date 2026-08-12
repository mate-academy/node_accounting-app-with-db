const userService = require('../services/user.service');

const get = async (req, res) => {
  const users = await userService.getAll();

  res.json(users);
};
const getOne = async (req, res) => {
  const { id } = req.params;
  const user = await userService.getById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  // res.send(user);

  res.json(user);
};
const create = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const user = await userService.create(name);

  res.status(201).json(user);
};
const remove = async (req, res) => {
  const { id } = req.params;

  if (!(await userService.getById(id))) {
    res.sendStatus(404);

    return;
  }

  await userService.remove(id);

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

  await userService.update({ id, name });

  const updatedUser = await userService.getById(id);

  res.json(updatedUser);
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
