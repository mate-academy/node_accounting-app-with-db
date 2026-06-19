const userService = require('../services/user.service.js');

const get = async (req, res) => {
  const users = await userService.getAll();

  res.send(users);
};

const getOne = async (req, res) => {
  const { id } = req.params;

  const user = await userService.getById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }
  res.send(user);
};

const create = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  const user = await userService.create(name);

  res.statusCode = 201;
  res.send(user);
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
    res.sendStatus(422);

    return;
  }

  await userService.update({ id, name });

  const updatedUser = await userService.getById(id);

  res.send(updatedUser);
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
