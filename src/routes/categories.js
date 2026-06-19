const express = require('express');
const router = express.Router();
const { models } = require('../models/models');

// GET /categories - Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await models.Category.findAll();

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /categories - Create a new category
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    // Check if category already exists
    const existingCategory = await models.Category.findOne({ where: { name } });

    if (existingCategory) {
      return res
        .status(400)
        .json({ error: 'Category with this name already exists' });
    }

    const newCategory = await models.Category.create({ name });

    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /categories/:id - Get a specific category
router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const category = await models.Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PATCH /categories/:id - Update a category
router.patch('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const category = await models.Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    // Check if another category already has this name
    const existingCategory = await models.Category.findOne({
      where: { name, id: { [models.Sequelize.Op.ne]: id } },
    });

    if (existingCategory) {
      return res
        .status(400)
        .json({ error: 'Category with this name already exists' });
    }

    await category.update({ name });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /categories/:id - Delete a category
router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const category = await models.Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    await category.destroy();
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
