const categoryService = require('../services/categories.service.js');

const get = async (req, res) => {
  const categories = await categoryService.getCategories();

  res.status(200).send(categories);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const category = await categoryService.getCategory(id);

  if (!category) {
    return res.status(404).send({ message: 'Category not found' });
  }

  res.status(200).send(category);
};

const create = async (req, res) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    return res.status(400).send({ message: 'Invalid data' });
  }

  const newCategory = await categoryService.createCategory(name);

  res.status(201).send(newCategory);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    return res.status(400).send({ message: 'Invalid data' });
  }

  const category = await categoryService.getCategory(id);

  if (!category) {
    return res.status(404).send({ message: 'Category not found' });
  }

  const updated = await categoryService.updateCategory({ id, name });

  res.status(200).send(updated);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const category = await categoryService.getCategory(id);

  if (!category) {
    return res.status(404).send({ message: 'Category not found' });
  }

  await categoryService.deleteCategory(id);
  res.status(204).send();
};

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
};
