const express = require('express');
const { Category } = require('../models');
const {
  formatCategoryResponse,
  formatCategoriesResponse,
} = require('../utils/responseFormatters');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      order: [['name', 'ASC']],
    });

    res.status(200).json(formatCategoriesResponse(categories));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Bad request - Name is required' });
    }

    const existingCategory = await Category.findOne({ where: { name } });

    if (existingCategory) {
      return res.status(400).json({
        error: 'Bad request - Category already exists',
      });
    }

    const newCategory = await Category.create({ name, description });

    res.status(201).json(formatCategoryResponse(newCategory));
  } catch (error) {
    // res.status(500).json({ error: error.message });
    if (
      error.name === 'SequelizeValidationError' ||
      error.name === 'SequelizeUniqueConstraintError'
    ) {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const categoryId = parseInt(req.params.id);
    const category = await Category.findByPk(categoryId);

    if (!category) {
      return res.status(404).json({ error: 'Not found' });
    }

    res.status(200).json(formatCategoryResponse(category));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    if (isNaN(categoryId)) {
      return res
        .status(400)
        .json({ error: 'Bad request - Category ID must be a valid integer.' });
    }
    const categoryId = parseInt(req.params.id);
    const { name, description } = req.body;

    if (!name && !description) {
      return res.status(400).json({
        error: 'Bad request - At least one field is required for update',
      });
    }

    const category = await Category.findByPk(categoryId);

    if (!category) {
      return res.status(404).json({ error: 'Not found' });
    }

    if (name) {
      category.name = name;
    }

    if (description !== undefined) {
      category.description = description;
    }

    await category.save();

    res.status(200).json(formatCategoryResponse(category));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const categoryId = parseInt(req.params.id);
    const category = await Category.findByPk(categoryId);

    if (!category) {
      return res.status(404).json({ error: 'Not found' });
    }

    await category.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
