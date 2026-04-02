const usersService = require('../services/users.service');

const get = () => async (req, res) => {
  res.json(await usersService.getAll());
};

const getOne = () => async (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).send('Bad Request');
  }

  const reqId = await usersService.getById(id);

  if (!reqId) {
    return res.status(404).send('Not Found');
  }

  res.json(reqId);
};

const create = () => async (req, res) => {
  const { firstName } = req.body;

  if (!firstName) {
    return res.status(400).send('Bad Request');
  }

  const user = await usersService.create(firstName);

  return res.status(201).json(user);
};

const remove = () => async (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).send('Bad Request');
  }

  const deleted = await usersService.remove(id);

  if (!deleted) {
    return res.status(404).send('Not Found');
  }

  res.status(204).send();
};

const update = () => async (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).send('Bad Request');
  }

  const { firstName } = req.body;

  if (typeof firstName !== 'string' || firstName.trim() === '') {
    return res.status(400).send('Bad Request');
  }

  const userIdToUpdate = await usersService.getById(id);

  if (!userIdToUpdate) {
    return res.status(404).send('Not Found');
  }

  const updatedUser = await usersService.update({ id, firstName });

  res.status(200).json(updatedUser);
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
