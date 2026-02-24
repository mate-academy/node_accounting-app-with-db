const services = require('../services');

const getAllCategories = async (req, res) => {
  const categories = await services.categoryService.getAllCategories();

  res.send(categories);
};

const getCategoryById = async (req, res) => {
  const { id } = req.params;

  const category = await services.categoryService.getCategoryById(id);

  if (!category) {
    return res.sendStatus(404);
  }

  res.send(category);
};

const createCategory = async (req, res) => {
  const { name = null } = req?.body || {};

  if (!name) {
    return res.sendStatus(400);
  }

  const category = await services.categoryService.createCategory({ name });

  res.status(201).send(category);
};

const removeCategory = async (req, res) => {
  const { id } = req.params;

  const category = await services.categoryService.getCategoryById(id);

  if (!category) {
    return res.sendStatus(404);
  }

  await services.categoryService.removeCategory(id);

  res.sendStatus(204);
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name = null } = req?.body || {};

  const category = await services.categoryService.getCategoryById(id);

  if (!category) {
    return res.sendStatus(404);
  }

  if (!name) {
    return res.sendStatus(400);
  }

  const updatedCategory = await services.categoryService.updateCategory(id, {
    name,
  });

  res.send(updatedCategory);
};

module.exports = {
  getAllCategories,
  getCategoryById,
  removeCategory,
  createCategory,
  updateCategory,
};
