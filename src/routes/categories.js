const express = require('express');
const {
  models: { Category },
} = require('../models/models');
const router = express.Router();

router.get('/', async (req, res) => {
  const categories = await Category.findAll();

  res.json(categories);
});

router.post('/', async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  const category = await Category.create({ name });

  res.status(201).json(category);
});

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const category = await Category.findByPk(id);

  if (!category) {
    return res.status(404).json({ message: 'Category not found' });
  }

  category.name = name;
  await category.save();
  res.json(category);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const category = await Category.findByPk(id);

  if (!category) {
    return res.status(404).json({ message: 'Category not found' });
  }

  await category.destroy();
  res.status(204).end();
});

module.exports = router;
