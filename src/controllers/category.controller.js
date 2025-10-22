const categoryService = require('../services/category.service');

const get = async (req, res) => {
  const categories = await categoryService.getAll();

  res.status(200).json(categories);
};

const getOne = async (req, res) => {
  const id = +req.params.id;

  if (isNaN(id)) {
    return res.sendStatus(400);
  }

  const category = await categoryService.getById(id);

  if (!category) {
    return res.status(404);
  }

  res.status(200).json(category);
};

const create = async (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    return res.status(400);
  }

  const newCategory = await categoryService.create({
    name,
    description: description ?? '',
  });

  res.status(201).json(newCategory);
};

const update = async (req, res) => {
  const id = +req.params.id;

  if (isNaN(id)) {
    return res.sendStatus(400);
  }

  const { name, description } = req.body;

  if (!name || typeof name !== 'string') {
    return res.status(400);
  }

  const category = await categoryService.getById(id);

  if (!category) {
    return res.sendStatus(404);
  }

  const updatedCategory = await categoryService.update(id, {
    name,
    description,
  });

  res.status(200).json(updatedCategory);
};

const remove = async (req, res) => {
  const id = +req.params.id;

  if (isNaN(id)) {
    return res.sendStatus(400);
  }

  const category = await categoryService.getById(id);

  if (!category) {
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
