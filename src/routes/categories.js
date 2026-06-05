const express = require('express');
const { Category } = require('../models/Category.model');
const router = express.Router();

router.get('/', async (req, res) => {
  const categories = await Category.findAll();

  res.status(200).json(categories);
});

router.post('/', async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Bad request' });
  }

  const category = await Category.create(req.body);

  res.status(201).json(category);
});

router.get('/:id', async (req, res) => {
  const id = +req.params.id;
  const category = await Category.findByPk(id);

  if (!category) {
    return res.status(404).json({ error: 'Not found' });
  }

  res.status(200).json(category);
});

router.delete('/:id', async (req, res) => {
  const id = +req.params.id;
  const category = await Category.findByPk(id);

  if (!category) {
    return res.status(404).json({ error: 'Not found' });
  }

  await category.destroy();

  res.sendStatus(204);
});

router.patch('/:id', async (req, res) => {
  const id = +req.params.id;
  const name = req.body.name;
  const category = await Category.findByPk(id);

  if (!category) {
    return res.status(404).json({ error: 'Not found' });
  }

  if (!name) {
    return res.status(400).json({ error: 'Bad request' });
  }

  await category.update(req.body);

  res.status(200).json(category);
});

module.exports = router;
