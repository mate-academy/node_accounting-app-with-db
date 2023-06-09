'use strict';

const { categoriesService } = require('../services/categories');

const getAll = async(req, res) => {
  try {
    const categories = await categoriesService.getAll();

    res.status(200).send(categories);
  } catch (error) {
    res.status(500).send({ message: 'Error retrieving categories' });
  }
};

const getOne = async(req, res) => {
  const { categoryId } = req.params;

  if (!categoryId) {
    return res.status(400).json({ message: 'Category ID is missing.' });
  }

  try {
    const category = await categoriesService.getById(categoryId);

    if (!category) {
      return res
        .status(404)
        .json({ message: `Category with id ${categoryId} not found.` });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.' });
  }
};

const add = async(req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.sendStatus(400);
    }

    const category = await categoriesService.create({ name });

    res.status(201).send(category);
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
};

const remove = async(req, res) => {
  const { categoryId } = req.params;

  if (!categoryId) {
    return res.sendStatus(400);
  }

  try {
    const category = await categoriesService.getById(categoryId);

    if (!category) {
      return res
        .status(404)
        .send({ message: `Category with id ${categoryId} not found` });
    }

    await categoriesService.removeById(categoryId);
    res.sendStatus(204);
  } catch (err) {
    res
      .status(500)
      .send({ message: 'An error occurred while removing the Category' });
  }
};

const update = async(req, res) => {
  const { categoryId } = req.params;
  const { name } = req.body;

  if (!categoryId || !name) {
    return res.sendStatus(400);
  }

  try {
    const category = await categoriesService.getById(categoryId);

    if (!category) {
      return res
        .status(404)
        .send({ message: `Category with id ${categoryId} not found` });
    }

    await categoriesService.updateById(categoryId, { name });
    res.status(200).send(category);
  } catch (error) {
    res
      .status(500)
      .send({ message: 'An error occurred while updating the Category.' });
  }
};

module.exports = {
  categoriesController: {
    getAll,
    getOne,
    add,
    remove,
    update,
  },
};
