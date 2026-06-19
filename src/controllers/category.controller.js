'use strict';

const express = require('express');
const { Category } = require('../models/Category.model');

const router = express.Router();

router.post('/', async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  const category = await Category.create({ name });

  res.status(201).json(category);
});

router.get('/', async (req, res) => {
  const categories = await Category.findAll();

  res.json(categories);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  const category = await Category.findByPk(id);

  if (!category) {
    return res.sendStatus(404);
  }

  await category.update({ name });

  res.json(category);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const category = await Category.findByPk(id);

  if (!category) {
    return res.sendStatus(404);
  }

  await category.destroy();

  res.sendStatus(204);
});

module.exports = router;
