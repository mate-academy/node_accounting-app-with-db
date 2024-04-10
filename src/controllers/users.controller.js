const userService = require('../services/users.service');

const get = async (req, res) => {
  res.send(await userService.getAll());
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

  const newUser = await userService.create(name);

  res.status(201);
  res.send(newUser);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const user = await userService.getById(id);

  if (!user) {
    res.statusCode(404);

    return;
  }

  if (typeof name !== 'string') {
    res.statusCode(400);

    return;
  }

  const updateUser = await userService.update({ id, name });

  res.send(updateUser);
};

const remove = async (req, res) => {
  const { id } = req.params;

  if (!(await userService.getById(id))) {
    return res.sendStatus(404);
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
