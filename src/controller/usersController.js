const usersService = require('./../services/usersService.js');

const get = async (req, res) => {
  const users = await usersService.getAllUsers();

  res.status(200).send(users);
};

const getOne = async (req, res) => {
  const { id } = req.params;
  const user = await usersService.getUserById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(user);
};

const create = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const user = await usersService.createUser(name);

  res.status(201).send(user);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const user = await usersService.getUserById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  await usersService.removeUser(id);

  res.sendStatus(204);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const user = await usersService.getUserById(id);

  if (typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  if (!user) {
    res.sendStatus(404);

    return;
  }

  const updatedUser = await usersService.updateUser({ id, name });

  res.send(updatedUser);
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
