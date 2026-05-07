const categoriesService = require('../services/categories.service');

const get = () => async (req, res) => {
  res.json(await categoriesService.getAll());
};

const getOne = () => async (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).send('Bad Request');
  }

  const reqId = await categoriesService.getById(id);

  if (!reqId) {
    return res.status(404).send('Not Found');
  }

  res.json(reqId);
};

const create = () => async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send('Bad Request');
  }

  const user = await categoriesService.create(name);

  return res.status(201).json(user);
};

const remove = () => async (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).send('Bad Request');
  }

  const deleted = await categoriesService.remove(id);

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

  const { name } = req.body;

  if (typeof name !== 'string' || name.trim() === '') {
    return res.status(400).send('Bad Request');
  }

  const userIdToUpdate = await categoriesService.getById(id);

  if (!userIdToUpdate) {
    return res.status(404).send('Not Found');
  }

  const updatedUser = await categoriesService.update({ id, name });

  res.status(200).json(updatedUser);
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
