const { Router } = require('express');
const categoriesService = require('../services/categories.service.js');

const categoriesRouter = Router();

categoriesRouter.get('/', async (req, res) => {
  const categories = await categoriesService.getAll();

  res.status(200).json(categories);
});

categoriesRouter.get('/:id', async (req, res) => {
  const id = +req.params.id;

  if (!id || Number.isNaN(id)) {
    res.sendStatus(400);
  }

  const category = await categoriesService.get(id);

  if (!category) {
    res.sendStatus(404);
  }

  res.status(200).json(category);
});

categoriesRouter.post('/', async (req, res) => {
  const { category } = req.body;

  if (!category) {
    res.sendStatus(400);
  }

  const created = await categoriesService.create(req.body.category);

  res.status(201).json(created);
});

categoriesRouter.patch('/:id', async (req, res) => {
  const id = +req.params.id;
  const { category } = req.body;

  if (!id || Number.isNaN(id) || !category) {
    res.sendStatus(400);
  }

  const updated = await categoriesService.update(id, category);

  if (!updated) {
    res.sendStatus(404);
  }

  res.status(200).json(updated);
});

categoriesRouter.delete('/:id', async (req, res) => {
  const id = +req.params.id;

  if (!id || Number.isNaN(id)) {
    res.sendStatus(404);
  }

  const deleted = await categoriesService.remove(id);

  if (!deleted) {
    res.sendStatus(404);
  }

  res.sendStatus(204);
});

module.exports = categoriesRouter;
