const serviceUsers = require('./../services/usersService');

const get = async (req, res) => {
  const users = await serviceUsers.getAllUsers();

  res.status(200).send(users);
};

const getOne = async (req, res) => {
  const { id } = req.params;
  const user = await serviceUsers.getUserById(id);

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

  const user = await serviceUsers.createUser(name);

  res.status(201).send(user);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const user = await serviceUsers.getUserById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  await serviceUsers.removeUser(id);

  res.sendStatus(204);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const user = await serviceUsers.getUserById(id);

  if (typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  if (!user) {
    res.sendStatus(404);

    return;
  }

  const updatedUser = await serviceUsers.updateUser({ id, name });

  res.send(updatedUser);
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
