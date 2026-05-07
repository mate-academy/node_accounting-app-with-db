'use strict';

const express = require('express');
const {
  models: { Category },
} = require('../models/models');

const router = express.Router();

router.post('/', async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Missing required parameter: name' });
  }

  try {
    const category = await Category.create({ name });

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  const categories = await Category.findAll();

  res.status(200).json(categories);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const category = await Category.findByPk(id);

  if (!category) {
    return res.status(404).json({ error: 'Category not found' });
  }
  res.status(200).json(category);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const category = await Category.findByPk(id);

  if (!category) {
    return res.status(404).json({ error: 'Category not found' });
  }
  await category.destroy();
  res.status(204).send();
});

const updateHandler = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const category = await Category.findByPk(id);

  if (!category) {
    return res.status(404).json({ error: 'Category not found' });
  }

  if (name !== undefined) {
    category.name = name;
  }

  await category.save();
  res.status(200).json(category);
};

router.patch('/:id', updateHandler);
router.put('/:id', updateHandler);

module.exports = router;
