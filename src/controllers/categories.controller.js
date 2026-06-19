const categoryService = require('../services/categories.service');

exports.getCategories = async (req, res) => {
  const categories = await categoryService.getCategories();

  res.json(categories);
};

exports.createCategory = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Bad request' });
  }

  const category = await categoryService.createCategory(name);

  res.status(201).json(category);
};

exports.getCategoryById = async (req, res) => {
  const id = Number(req.params.id);

  const category = await categoryService.getCategoryById(id);

  if (!category) {
    return res.status(404).json({ error: 'Category not found' });
  }

  res.json(category);
};

exports.updateCategoryById = async (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Bad request' });
  }

  const category = await categoryService.getCategoryById(id);

  if (!category) {
    return res.status(404).json({ error: 'Category not found' });
  }

  const updated = await categoryService.updateCategoryById(id, name);

  res.json(updated);
};

exports.deleteCategoryById = async (req, res) => {
  const id = Number(req.params.id);

  const deleted = await categoryService.deleteCategoryById(id);

  if (!deleted) {
    return res.status(404).json({ error: 'Category not found' });
  }

  res.status(204).send();
};
