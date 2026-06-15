const usersService = require('../services/users.service.js');

const get = async (req, res) => {
  res.json(await usersService.getAll());
};

const getOne = async (req, res) => {
  const id = req.params.id;
  const user = await usersService.getById(id);

  if (!user) {
    return res.sendStatus(404);
  }

  res.json(user);
};

const create = async (req, res) => {
  const { name } = req.body;

  if (name === undefined || name === '') {
    return res.sendStatus(400);
  }

  const user = await usersService.create(name);

  res.status(201).json(user);
};

const update = async (req, res) => {
  const id = req.params.id;
  const { name } = req.body;

  if (name === undefined || name.trim() === '') {
    return res.sendStatus(400);
  }

  const user = await usersService.getById(id);

  if (!user) {
    return res.sendStatus(404);
  }

  const updatedUser = await usersService.update({ id, name });

  res.json(updatedUser);
};

const remove = async (req, res) => {
  const id = req.params.id;

  if (!(await usersService.getById(id))) {
    return res.sendStatus(404);
  }

  await usersService.remove(id);

  res.sendStatus(204);
};

module.exports = {
  get,
  getOne,
  create,
  update,
  remove,
};
