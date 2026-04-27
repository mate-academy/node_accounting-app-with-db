const usersService = require('../services/users.service');

const getAll = async (req, res) => {
  const users = await usersService.getAll();

  res.send(users);
};

const getOne = async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.sendStatus(400);
  }

  const user = await usersService.getById(id);

  if (!user) {
    return res.sendStatus(404);
  }

  res.send(user);
};

const create = async (req, res) => {
  const name = req.body.name;

  if (!name || typeof name !== 'string') {
    return res.sendStatus(400);
  }

  const user = await usersService.create(name);

  res.status(201).json(user);
};

const deleteOne = async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.sendStatus(400);
  }

  const user = await usersService.deleteById(id);

  if (!user) {
    return res.sendStatus(404);
  }

  res.sendStatus(204);
};

async function update(req, res) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.sendStatus(400);
  }

  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    return res.sendStatus(400);
  }

  const user = await usersService.update(id, name);

  if (!user) {
    return res.sendStatus(404);
  }

  res.send(user);
}

module.exports = {
  getAll,
  getOne,
  create,
  update,
  deleteOne,
};
