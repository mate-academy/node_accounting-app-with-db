'use strict';

const categoryService = require('../services/categories');

const getAll = async(req, res) => {
  const categories = await categoryService.getCategories();

  res.send(categories);
};

const getOne = async(req, res) => {
  const { categoryId } = req.params;
  const foundCategory = await categoryService.getCategory(categoryId);

  if (!foundCategory) {
    res.sendStatus(404);

    return;
  }

  res.send(foundCategory);
};

const add = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  try {
    const user = await categoryService.createCategory(name);

    res.statusCode = 201;
    res.send(user);
  } catch (error) {
    console.log(error.message);
  }
};

const remove = async(req, res) => {
  const { categoryId } = req.params;
  const category = await categoryService.getCategory(categoryId);

  if (!category) {
    res.sendStatus(404);

    return;
  }

  await categoryService.deleteCategory(categoryId);
  res.sendStatus(204);
};

const update = async(req, res) => {
  const { categoryId } = req.params;
  const category = await categoryService.getCategory(categoryId);

  if (!category) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  const upratedUser = await categoryService.updateCategory({
    id: categoryId, name,
  });

  res.statusCode = 200;
  res.send(upratedUser);
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
