'use strict';

const categoriesService = require('../services/categories.service');

const getAll = async (req, res) => {
  try {
    const categories = await categoriesService.getAll();

    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const create = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).json({ error: 'Bad request' });

    return;
  }

  try {
    const user = await categoriesService.create({ name });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await categoriesService.getById(id);

    if (!category) {
      res.status(404).json({ error: 'Category not found' });

      return;
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await categoriesService.getById(id);

    if (!category) {
      res.status(404).json({ error: 'Category not found' });

      return;
    }

    await categoriesService.remove(id);

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const category = await categoriesService.getById(id);

    if (!category) {
      res.status(404).json({ error: 'Category not found' });

      return;
    }

    if (!name) {
      res.status(400).json({ error: 'Bad request' });

      return;
    }

    await categoriesService.update({ id, name });

    const updatedCategory = await categoriesService.getById(id);

    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAll,
  create,
  getById,
  remove,
  update,
};
