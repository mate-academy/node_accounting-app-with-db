'use strict';

const { Router } = require('express');

function createCategoriesRouter(categoriesService) {
  const categoriesRouter = Router();

  categoriesRouter.get('/', async (_req, res) => {
    const categories = await categoriesService.getAll();

    res.json(categories);
  });

  categoriesRouter.get('/:id', async (req, res) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.sendStatus(400);
    }

    const category = await categoriesService.getById(id);

    if (!category) {
      return res.sendStatus(404);
    }

    res.json(category);
  });

  categoriesRouter.post('/', async (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.sendStatus(400);
    }

    const category = await categoriesService.create(name);

    res.status(201).json(category);
  });

  categoriesRouter.delete('/:id', async (req, res) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.sendStatus(400);
    }

    const category = await categoriesService.getById(id);

    if (!category) {
      return res.sendStatus(404);
    }

    await categoriesService.deleteById(id);

    res.sendStatus(204);
  });

  categoriesRouter.patch('/:id', async (req, res) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.sendStatus(400);
    }

    const { name } = req.body;

    if (!name) {
      return res.sendStatus(400);
    }

    const category = await categoriesService.getById(id);

    if (!category) {
      return res.sendStatus(404);
    }

    const updated = await categoriesService.update(id, name);

    res.json(updated);
  });

  return categoriesRouter;
}

module.exports = {
  createCategoriesRouter,
};
