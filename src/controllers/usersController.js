const usersServices = require('../services/usersService.js');

const get = async (req, res) => {
  const users = await usersServices.getAllUsers();

  res.send(users);
};

const getOne = async (req, res) => {
  const { id } = req.params;
  const user = await usersServices.getUserById(id);

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

  const user = await usersServices.createUser(name);

  res.status(201).send(user);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const user = await usersServices.getUserById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  await usersServices.deleteUser(id);

  res.sendStatus(204);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (typeof name !== 'string') {
    res.sendStatus(422);

    return;
  }

  const user = await usersServices.updateUser({ id, name });

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(user);
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
