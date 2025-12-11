'use strict';

const { models } = require('../models/models');
const { Category } = models;

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Поле "name" є обов\'язковим.' });
    }

    const newCategory = await Category.create({ name });

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

    res.status(200).json(categories);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Помилка сервера при отриманні категорій.' });
  }
};

module.exports = {
  createCategory,
  getCategories,
};
