'use strict';

const categoryService = require('../services/serviceCategories');

const getAll = async (_req, res) => {
  const categories = await categoryService.getAllCategories();

  res.json(categories);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const category = await categoryService.getCategoryById(id);

  if (!category) {
    return res.status(404).send('Category not found');
  }

  res.json(category);
};

const create = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send('Name is required');
  }

  try {
    const newCategory = await categoryService.createCategory(name);

    res.status(201).json(newCategory);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).send('Category with this name already exists');
    }

    throw error;
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(400).send('Name is required');
  }

  try {
    const category = await categoryService.updateCategory(id, name);

    if (!category) {
      return res.status(404).send('Category not found');
    }

    res.json(category);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).send('Category with this name already exists');
    }

    throw error;
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  const isDeleted = await categoryService.deleteCategory(id);

  if (!isDeleted) {
    return res.status(404).send('Category not found');
  }

  res.sendStatus(204);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
