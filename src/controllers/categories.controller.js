const categoriesService = require('../services/categories.service');

async function getAllCategories(req, res) {
  const categories = await categoriesService.getAllCategories();

  return res.send(categories);
}

async function createCategory(req, res) {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const category = await categoriesService.createCategory(name);

  res.statusCode = 201;

  res.send(category);
}

async function getCategoryById(req, res) {
  const id = Number(req.params.id);

  const category = await categoriesService.getCategoryById(id);

  if (!category) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;

  res.send(category);
}

async function deleteCategory(req, res) {
  const id = Number(req.params.id);

  const result = await categoriesService.deleteCategory(id);

  if (!result) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus(204);
}

async function updateCategory(req, res) {
  const id = Number(req.params.id);

  const categoryForUpdate = await categoriesService.updateCategory(
    id,
    req.body,
  );

  if (!categoryForUpdate) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;

  res.send(categoryForUpdate);
}

module.exports = {
  getAllCategories,
  createCategory,
  getCategoryById,
  deleteCategory,
  updateCategory,
};
