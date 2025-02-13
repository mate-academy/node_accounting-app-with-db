const userService = require('../services/user.service');

const get = async (req, res) => {
  res.json(await userService.getAll());
};

const getOne = async (req, res) => {
  const { id } = req.params;
  const user = await userService.getById(id);

  if (!user) {
    return res.sendStatus(404);
  }

  res.json(user);
};

const create = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  res.status(201).json(await userService.create(name));
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  const user = await userService.getById(id);

  if (!user) {
    return res.sendStatus(404);
  }

  await userService.update({ id, name });

  res.json(await userService.getById(id));
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
