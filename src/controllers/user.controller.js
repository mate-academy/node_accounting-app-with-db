const userService = require('./../services/user.service.js');

const get = async (req, res) => {
  res.statusCode = 200;

  res.send(await userService.getAll());
};

const getOne = async (req, res) => {
  const { id } = req.params;

  const user = await userService.getById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(user);
};

const post = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const item = await userService.create(name);

  if (!item) {
    res.sendStatus(400);

    return;
  }

  res.statusCode = 201;
  res.send(item);
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

const patch = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!(await userService.getById(id))) {
    res.sendStatus(404);

    return;
  }

  const user = await userService.change(id, name);

  res.statusCode = 200;
  res.send(user);
};

module.exports = {
  get,
  getOne,
  post,
  remove,
  patch,
};
