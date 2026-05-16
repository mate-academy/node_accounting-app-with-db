const userService = require('../services/user.service');

const get = async (req, res) => {
  const users = await userService.getUsers();

  res.send(users);
};

const getOne = async (req, res) => {
  const { id } = req.params;

  const user = await userService.getUser(id);

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

  const newUser = await userService.addUser(name);

  return res.status(201).json(newUser);
};

const remove = async (req, res) => {
  const { id } = req.params;

  const user = await userService.getUser(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  await userService.deleteUser(id);

  res.sendStatus(204);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = await userService.getUser(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const updatedUser = await userService.updateUser(id, name);

  res.send(updatedUser);
};

module.exports = {
  get,
  getOne,
  create,
  update,
  remove,
};
