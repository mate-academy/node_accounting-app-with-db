const categoryService = require('../services/category.service');

const get = async (req, res) => {
  const categories = await categoryService.getAll();

  res.send(categories);
};

const getOne = async (req, res) => {
  const category = await categoryService.getById(req.params.id);

  if (!category) {
    return res.sendStatus(404);
  }

  res.send(category);
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
  const category = await categoryService.update(req.params.id, req.body);

  if (!category) {
    return res.sendStatus(404);
  }

  res.send(category);
};

const remove = async (req, res) => {
  const category = await categoryService.remove(req.params.id);

  if (!category) {
    return res.sendStatus(404);
  }

  res.sendStatus(204);
};

module.exports = {
  get,
  getOne,
  create,
  update,
  remove,
};
