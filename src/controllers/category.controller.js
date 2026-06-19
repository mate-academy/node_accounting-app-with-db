const { categoryService } = require('../services/category.service');

const getAll = async (req, res) => {
  const categories = await categoryService.getAll(req.query);

  res.set('Content-Type', 'application/json');
  res.status(200).json(categories);
};

const getById = async (req, res) => {
  const category = await categoryService.getById(parseInt(req.params.id));

  if (!category) {
    return res.sendStatus(404);
  }

  res.set('Content-Type', 'application/json');
  res.status(200).json(category);
};

const add = async (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  const category = await categoryService.add({
    name,
    description: description ?? '',
  });

  res.set('Content-Type', 'application/json');
  res.status(201).json(category);
};

const remove = async (req, res) => {
  const categoryId = parseInt(req.params.id);

  const category = await categoryService.getById(categoryId);

  if (!category) {
    return res.sendStatus(404);
  }

  await categoryService.remove(categoryId);
  res.sendStatus(204);
};

const update = async (req, res) => {
  const categoryId = parseInt(req.params.id);
  const category = await categoryService.getById(categoryId);

  if (!category) {
    return res.sendStatus(404);
  }

  const updatedCategory = await categoryService.update(categoryId, req.body);

  res.set('Content-type', 'application/json');
  res.json(updatedCategory);
};

const categoryController = {
  getAll,
  getById,
  add,
  remove,
  update,
};

module.exports = {
  categoryController,
};
