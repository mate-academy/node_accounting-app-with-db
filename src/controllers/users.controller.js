const usersService = require('../services/users.service.js');

const getAll = async (req, res) => {
  return res.send(await usersService.getAll());
};

const create = async (req, res) => {
  const { name } = req.body;

  if (typeof name !== 'string') {
    return res.sendStatus(400);
  }

  const newUser = await usersService.create({ name });

  res.status(201).send(newUser);
};

const getByID = async (req, res) => {
  const { id } = req.params;

  const numberId = Number(id);

  if (Number.isNaN(numberId)) {
    return res.sendStatus(400);
  }

  const user = await usersService.getById(numberId);

  if (!user) {
    return res.sendStatus(404);
  }

  res.send(user);
};

const deleteById = async (req, res) => {
  const { id } = req.params;

  const numberId = Number(id);

  if (Number.isNaN(numberId)) {
    return res.sendStatus(400);
  }

  const result = await usersService.deleteById(numberId);

  if (!result) {
    return res.sendStatus(404);
  }

  res.sendStatus(204);
};

const update = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  const numberId = Number(id);

  if (Number.isNaN(numberId)) {
    return res.sendStatus(400);
  }

  const userExist = await usersService.getById(numberId);

  if (!userExist) {
    return res.sendStatus(404);
  }

  if (typeof name !== 'string') {
    return res.sendStatus(400);
  }

  res.send(await usersService.update(numberId, req.body));
};

module.exports = {
  getAll,
  getByID,
  create,
  deleteById,
  update,
};
