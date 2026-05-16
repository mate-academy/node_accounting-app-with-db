const categoryService = require('../services/category.service');

const get = async (req, res) => {
  const categories = await categoryService.getAll();

  res.send(categories);
};

const getOne = async (req, res) => {
  const id = Number(req.params.id);
  const category = await categoryService.getById({ id });

  if (!category) {
    return res.sendStatus(404);
  }

  res.send(categoryService.normalize(category));
};

const create = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  const category = await categoryService.create({ name });

  res.status(201).send(category);
};

const update = async (req, res) => {
  const id = Number(req.params.id);
  const existing = await categoryService.getById({ id });

  if (!existing) {
    return res.sendStatus(404);
  }

  const updated = await categoryService.update({ id, ...req.body });

  res.send(categoryService.normalize(updated));
};

const remove = async (req, res) => {
  const id = Number(req.params.id);
  const existing = await categoryService.getById({ id });

  if (!existing) {
    return res.sendStatus(404);
  }

  await categoryService.remove(id);
  res.sendStatus(204);
};

module.exports = {
  get,
  getOne,
  create,
  update,
  remove,
};
