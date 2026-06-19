const categoryService = require('../services/categoryService');

const getCategories = async (req, res) => {
  const categories = await categoryService.getCategories();

  res.json(categories);
};

const getCategoryById = async (req, res) => {
  const id = Number(req.params.id);
  const category = await categoryService.getCategoryById(id);

  if (!category) {
    return res.sendStatus(404);
  }

  res.json(category);
};

const createCategory = async (req, res) => {
  const { category } = req.body;

  if (!category) {
    return res.sendStatus(400);
  }

  const newCategory = await categoryService.createCategory({ category });

  res.status(201).json(newCategory);
};

const updateCategory = async (req, res) => {
  const id = Number(req.params.id);
  const { category } = req.body;

  if (!category) {
    return res.sendStatus(400);
  }

  const updated = await categoryService.updateCategory({ id, category });

  if (!updated) {
    return res.sendStatus(404);
  }

  const updatedCategory = await categoryService.getCategoryById(id);

  res.json(updatedCategory);
};

const deleteCategory = async (req, res) => {
  const id = Number(req.params.id);
  const category = await categoryService.getCategoryById(id);

  if (!category) {
    return res.sendStatus(404);
  }

  await categoryService.deleteCategory(id);

  res.sendStatus(204);
};

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
