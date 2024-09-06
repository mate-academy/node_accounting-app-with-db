const userService = require('./../services/user.service');

const get = async (req, res) => {
  res.send(await userService.getAll());
};

const create = async (req, res) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  const user = await userService.create(name);

  res.status(201).send(user);
};

const getOne = async (req, res) => {
  const id = +req.params.id;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const user = await userService.getById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

const remove = async (req, res) => {
  const id = +req.params.id;

  if (!(await userService.getById(id))) {
    res.sendStatus(404);

    return;
  }

  await userService.remove(id);
  res.sendStatus(204);
};

const update = async (req, res) => {
  const id = +req.params.id;
  const { name } = req.body;

  if (!(await userService.getById(id))) {
    res.sendStatus(404);

    return;
  }

  if (typeof name !== 'string' || !name) {
    res.sendStatus(400);

    return;
  }

  await userService.update({ id, name });

  const updatedUser = await userService.getById(id);

  res.send(updatedUser);
};

module.exports = {
  get,
  create,
  getOne,
  remove,
  update,
};
