const categoriesService = require('../services/categories.service');

const getAll = async (req, res) => {
  const categories = await categoriesService.getAll();

  res.send(categories);
};

const getOne = async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.sendStatus(400);
  }

  const category = await categoriesService.getById(id);

  if (!category) {
    return res.sendStatus(404);
  }

  res.send(category);
};

const create = async (req, res) => {
  const name = req.body.name;

  if (!name || typeof name !== 'string') {
    return res.sendStatus(400);
  }

  const category = await categoriesService.create(name);

  res.status(201).json(category);
};

const deleteOne = async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.sendStatus(400);
  }

  const category = await categoriesService.deleteById(id);

  if (!category) {
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

  const category = await categoriesService.update(id, name);

  if (!category) {
    return res.sendStatus(404);
  }

  res.send(category);
}

module.exports = {
  getAll,
  getOne,
  create,
  update,
  deleteOne,
};
