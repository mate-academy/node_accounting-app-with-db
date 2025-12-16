'use strict';

const { models } = require('../models/models');
const { Category } = models;

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({ message: 'Invalid name' });
    }

    const newCategory = await Category.create({ name: name.trim() });

    res.status(201).json({ id: newCategory.id, name: newCategory.name });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res
        .status(409)
        .json({ message: 'Категорія з такою назвою вже існує.' });
    }

    return res
      .status(500)
      .json({ message: 'Помилка сервера при створенні категорії.' });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      attributes: ['id', 'name'],
      order: [['name', 'ASC']],
    });

    return res.status(200).json(categories);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Помилка сервера при отриманні категорій.' });
  }
};
const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    return res.status(200).json({
      id: category.id,
      name: category.name,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Помилка сервера при пошуку' });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name || typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({ message: 'Invalid name.' });
    }

    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    category.name = name.trim();
    await category.save();

    return res.status(200).json({
      id: category.id,
      name: category.name,
    });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ message: 'Category is exist' });
    }

    return res.status(500).json({ message: 'Помилка сервера.' });
  }
};
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Category.destroy({
      where: { id },
    });

    if (!result) {
      return res.status(404).json({ message: 'Category not found' });
    }

    return res.status(204).send();
  } catch (error) {
    if (
      error.name === 'SequelizeForeignKeyConstraintError' ||
      error.parent?.code === '23503'
    ) {
      return res.status(409).json({
        message: "related expenses exist'",
      });
    }

    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
