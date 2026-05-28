'use strict';

const serviceCategory = require('../service/category.js');

const getAllCategories = async (req, res) => {
  try {
    const categories = await serviceCategory.getAllCategories();

    res.statusCode = 200;
    res.send(categories);
  } catch (err) {
    return res.status(500).send({ error: 'Internal Server Error' });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await serviceCategory.getCategoryById(+id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    res.statusCode = 200;
    res.send(user);
  } catch (err) {
    return res.status(500).send({ error: 'Internal Server Error' });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const newCategory = await serviceCategory.createCategory(name);

    res.statusCode = 201;
    res.send(newCategory);
  } catch (err) {
    return res.status(500).send({ error: 'Internal Server Error' });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await serviceCategory.getCategoryById(+id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    await serviceCategory.deleteCategory(+id);
    res.sendStatus(204);
  } catch (err) {
    return res.status(500).send({ error: 'Internal Server Error' });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.sendStatus(400);
    }

    const existingCategory = await serviceCategory.getCategoryById(+id);

    if (!existingCategory) {
      return res.sendStatus(404);
    }

    await serviceCategory.updateCategory(+id, { name });

    const updatedCategory = await serviceCategory.getCategoryById(+id);

    return res.status(200).send(updatedCategory);
  } catch (error) {
    return res.status(500).send({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  deleteCategory,
  updateCategory,
};
