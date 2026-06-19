const { categoriesServices } = require('../services/categories.service');

const getAll = async (req, res) => {
  const categories = await categoriesServices.getAll();

  res.json(categories);
};

const getCategory = async (req, res) => {
  const categoryId = +req.params.id;

  if (!categoryId) {
    return res.sendStatus(400);
  }

  const category = await categoriesServices.getCategoryById(categoryId);

  if (!category) {
    return res.sendStatus(400);
  }

  res.json(category);
};

const createCategory = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  const category = await categoriesServices.createCategory(name);

  res.status(201).json(category);
};

const updateCategory = async (req, res) => {
  const { name } = req.body;
  const category = await categoriesServices.getCategoryById(+req.params.id);

  if (!name) {
    return res.sendStatus(400);
  }

  if (!category) {
    return res.sendStatus(404);
  }

  const updatedCategory = await categoriesServices.updateCategory({
    id: +req.params.id,
    name: name,
  });

  res.json(updatedCategory);
};

const deleteCategory = async (req, res) => {
  const category = await categoriesServices.getCategoryById(+req.params.id);

  if (!category) {
    return res.sendStatus(400);
  }

  await categoriesServices.deleteCategory(+req.params.id);

  res.sendStatus(204);
};

const categoriesControllers = {
  getAll,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};

module.exports = {
  categoriesControllers,
};
