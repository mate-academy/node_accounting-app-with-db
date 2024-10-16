const userService = require('../services/userService');

const get = async (req, res) => {
  res.send(await userService.getAllUsers());
};

const getOne = async (req, res) => {
  const { id } = req.params;

  const user = await userService.getUserById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const user = await userService.updateUser({ id, name });

  if (!user) {
    res.sendStatus(404);

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(422);

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

  const user = await userService.createUser(name);

  res.statusCode = 201;
  res.send(user);
};

const remove = async (req, res) => {
  const { id } = req.params;

  if (!(await userService.getUserById(id))) {
    res.sendStatus(404);

    return;
  }

  await userService.deleteUser(id);

  res.sendStatus(204);
};

module.exports = {
  get,
  getOne,
  update,
  create,
  remove,
};
