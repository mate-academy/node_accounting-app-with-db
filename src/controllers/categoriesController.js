'use strict';

const categoriesService = require('../services/categoriesService');

async function getAllCategories(req, res) {
  try {
    const categories = await categoriesService.getAll();

    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
}

async function createCategory(req, res) {
  const { title } = req.body;

  try {
    const newCategory = await categoriesService.create(title);

    res.status(201).json(newCategory);
  } catch (err) {
    res.status(err.code || 500).json({ error: err.message });
  }
}

async function getCategoryById(req, res) {
  const id = Number(req.params.id);

  try {
    const category = await categoriesService.getById(id);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch category' });
  }
}

async function updateCategory(req, res) {
  const id = Number(req.params.id);
  const { title } = req.body;

  try {
    const updated = await categoriesService.update(id, title);

    res.status(200).json(updated);
  } catch (err) {
    res.status(err.code || 500).json({ error: err.message });
  }
}

async function deleteCategory(req, res) {
  const { id } = Number(req.params.id);

  try {
    const deleted = await categoriesService.remove(id);

    if (!deleted) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({
      error: 'Failed to delete category due to server error',
      details: err.message,
    });
  }
}

module.exports = {
  getAllCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
