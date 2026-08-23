const userService = require('../services/user.service.js');

const get = async (req, res) => {
  const users = await userService.getAll();

  res.send(users);
};

const getOne = async (req, res) => {
  const id = Number(req.params.id);
  const user = await userService.getById(id);

  if (!user) {
    return res.status(404).send('Not found');
  }
  res.send(user);
};

const create = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send('Name is required');
  }

  const user = await userService.create(name);

  res.status(201).send(user);
};

const update = async (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;

  if (!name) {
    return res.status(400).send('Name is required');
  }

  const user = await userService.getById(id);

  if (!user) {
    return res.sendStatus(404);
  }

  const updatedUser = await userService.update({ id, name });

  res.send(updatedUser);
};

const remove = async (req, res) => {
  const id = Number(req.params.id);

  if (!(await userService.getById(id))) {
    res.status(404).send('Not found');

    return;
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
