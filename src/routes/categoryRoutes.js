'use strict';

const express = require('express');
const categoryService = require('../services/categoryService');

const router = express.Router();

router.post('/', async(req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send();
  }

  const newCategory = await categoryService.createCategory(name);

  res.status(201).json(newCategory);
});

router.get('/:id', async(req, res) => {
  const category = await categoryService.getCategoryById(req.params.id);

  if (!category) {
    return res.status(404).send();
  }

  res.status(200).json(category);
});

router.patch('/:id', async(req, res) => {
  const updatedCategory = await categoryService
    .updateCategory(req.params.id, req.body.name);

  if (!updatedCategory) {
    return res.status(404).send({ message: 'Not found' });
  }

  res.status(200).json(updatedCategory);
});

router.delete('/:id', async(req, res) => {
  const deleted = await categoryService.deleteCategory(req.params.id);

  if (!deleted) {
    return res.status(404).send();
  }

  res.status(204).send();
});

module.exports = router;
