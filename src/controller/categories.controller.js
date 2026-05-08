'use strict';

const serviceCategory = require('./../service/categories.service');

const getAllCategories = async (req, res) => {
  try {
    const categories = await serviceCategory.getAllCategories();

    res.statusCode = 200;
    res.send(categories);
  } catch (err) {
    return res.status(500).send({ error: 'Internal server error' });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const category = await serviceCategory.getCategoryById(id);

    if (!category) {
      return res.status(404).send('Category with this id does not exist');
    }

    return res.status(200).send(category);
  } catch (err) {
    return res.status(500).send({ error: 'Internal server error' });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send('Name parameter is required');
    }

    const newCategory = await serviceCategory.createCategory(name);

    return res.status(201).send(newCategory);
  } catch (err) {
    return res.status(500).send({ error: 'Internal server error' });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const category = await serviceCategory.getCategoryById(id);

    if (!category) {
      return res.status(404).send('Category with this id does not exist');
    }

    await serviceCategory.deleteCategory(id);

    return res.sendStatus(204);
  } catch (err) {
    return res.status(500).send({ error: 'Internal server error' });
  }
};

const updateCategory = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name } = req.body;
    const category = await serviceCategory.getCategoryById(id);

    if (!category) {
      return res.status(404).send('Category with this id does not exist');
    }

    if (typeof name !== 'string') {
      return res.status(400).send('Incorrect data type');
    }

    await serviceCategory.updateCategory(id, { name });

    const updatedCategory = await serviceCategory.getCategoryById(id);

    return res.status(200).send(updatedCategory);
  } catch (err) {
    return res.status(500).send({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  deleteCategory,
  updateCategory,
};
