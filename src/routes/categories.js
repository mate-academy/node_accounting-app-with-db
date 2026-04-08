'use strict';

const express = require('express');
const { Category } = require('../models/Category.model');

function createCategoryRouter() {
  const router = express.Router();

  router.get('/', async (req, res) => {
    res.send(await Category.findAll());
  });

  router.post('/', async (req, res) => {
    const category = req.body;

    if (!category.name) {
      return res.status(400).send('Name is required');
    }

    res.status(201).send(await Category.create(category));
  });

  router.get('/:id', async (req, res) => {
    const category = await Category.findByPk(Number(req.params.id));

    if (!category) {
      return res.status(404).send('Category not found');
    }

    res.send(category);
  });

  router.delete('/:id', async (req, res) => {
    const category = await Category.findByPk(Number(req.params.id));

    if (!category) {
      return res.status(404).send('Category not found');
    }

    await category.destroy();

    res.status(204).send('Deleted');
  });

  router.patch('/:id', async (req, res) => {
    const category = await Category.findByPk(Number(req.params.id));

    if (!category) {
      return res.status(404).send('Category not found');
    }

    await category.update(req.body);

    res.send(category);
  });

  return router;
}

module.exports = createCategoryRouter;
