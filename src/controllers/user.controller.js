const userService = require('../services/user.service');

const getAll = async (_, res) => {
  const userList = await userService.getAll();

  res.send(userList.map((user) => userService.normilize(user)));
};

const create = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  res.statusCode = 201;

  const newUser = await userService.create(name);

  res.send(userService.normilize(newUser));
};

const get = async (req, res) => {
  const { id } = req.params;

  const user = await userService.getById(id);

  if (!user) {
    return res.sendStatus(404);
  }

  res.send(userService.normilize(user));
};

const remove = async (req, res) => {
  const { id } = req.params;

  if (!(await userService.getById(id))) {
    return res.sendStatus(404);
  }

  await userService.remove(id);

  res.sendStatus(204);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!(await userService.getById(id))) {
    return res.sendStatus(404);
  }

  if (!name) {
    return res.sendStatus(400);
  }

  await userService.update(id, name);
  res.send(userService.normilize(await userService.getById(id)));
};

module.exports = {
  getAll,
  create,
  get,
  remove,
  update,
};
