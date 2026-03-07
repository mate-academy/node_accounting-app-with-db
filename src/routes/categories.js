'use strict';

const express = require('express');
const { Category } = require('../models/Category.model');

const router = express.Router();

router.get('/', async (req, res) => {
  const categories = await Category.findAll({
    order: [['id', 'ASC']],
  });

  res.status(200).json(categories);
});

router.post('/', async (req, res) => {
  const { name } = req.body || {};

  if (name === undefined) {
    return res.status(400).send('Bad request');
  }

  try {
    const category = await Category.create({ name });

    return res.status(201).json(category);
  } catch (error) {
    return res.status(400).send('Bad request');
  }
});

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).send('Bad request');
  }

  const category = await Category.findByPk(id);

  if (!category) {
    return res.status(404).send('Not found');
  }

  return res.status(200).json(category);
});

router.patch('/:id', async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).send('Bad request');
  }

  const category = await Category.findByPk(id);

  if (!category) {
    return res.status(404).send('Not found');
  }

  const { name } = req.body || {};

  if (name !== undefined) {
    category.name = name;
  }

  try {
    await category.save();

    return res.status(200).json(category);
  } catch (error) {
    return res.status(400).send('Bad request');
  }
});

router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).send('Bad request');
  }

  const category = await Category.findByPk(id);

  if (!category) {
    return res.status(404).send('Not found');
  }

  await category.destroy();

  return res.status(204).send();
});

module.exports = router;
