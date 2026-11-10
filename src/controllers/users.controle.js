const usersService = require('../services/users.service');

const get = async (req, res) => {
  const users = await usersService.getAll();

  res.send(users.map((user) => usersService.normalize(user)));
};

const post = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const user = await usersService.createUser(name);

  res.status(201).send(usersService.normalize(user));
};

const getOne = async (req, res) => {
  const { id } = req.params;

  const user = await usersService.getById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(usersService.normalize(user));
};

const remove = async (req, res) => {
  const { id } = req.params;

  if (!(await usersService.getById(id))) {
    res.sendStatus(404);

    return;
  }

  await usersService.remove(id);

  res.sendStatus(204);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const user = await usersService.getById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  const updatedUser = await usersService.update({ id, name });

  res.send(usersService.normalize(updatedUser));
};

module.exports = {
  get,
  getOne,
  remove,
  update,
  post,
};
