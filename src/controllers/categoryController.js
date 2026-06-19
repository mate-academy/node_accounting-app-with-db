'use strict';

const categoryService = require('../services/categoryService');

const getCategories = async (req, res) => {
  const categories = await categoryService.getAll();

  res.json(categories);
};

const getCategory = async (req, res) => {
  const id = Number(req.params.id);
  const category = await categoryService.getById(id);

  if (!category) {
    return res.status(404).json({ message: 'Category not found' });
  }

  res.json(category);
};

const createCategory = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  const category = await categoryService.create(name);

  res.status(201).json(category);
};

const updateCategory = async (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  const category = await categoryService.update(id, name);

  if (!category) {
    return res.status(404).json({ message: 'Category not found' });
  }

  res.json(category);
};

const deleteCategory = async (req, res) => {
  const id = Number(req.params.id);
  const deleted = await categoryService.remove(id);

  if (!deleted) {
    return res.status(404).json({ message: 'Category not found' });
  }

  res.sendStatus(204);
};

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
