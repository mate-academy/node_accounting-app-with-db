'use strict';

const service = require('../service/categories.service');

const getAllCategories = async (req, res) => {
  const categories = await service.getAllCategories();
  res.status(200).send(categories);
};

const getCategoryById = async (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).send();
  }

  const category = await service.getCategoryById(id);

  if (!category) {
    return res.status(404).send();
  }

  res.status(200).send(category);
};

const createCategory = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send();
  }

  const category = await service.createCategory(name);

  res.status(201).send(category);
};

const deleteCategory = async (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).send();
  }

  const category = await service.getCategoryById(id);

  if (!category) {
    return res.status(404).send();
  }

  await service.deleteCategory(id);

  res.sendStatus(204);
};

const updateCategory = async (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;

  if (Number.isNaN(id)) {
    return res.status(400).send();
  }

  if (typeof name !== 'string') {
    return res.status(400).send();
  }

  const category = await service.getCategoryById(id);

  if (!category) {
    return res.status(404).send();
  }

  await service.updateCategory(id, { name });

  const updated = await service.getCategoryById(id);

  res.status(200).send(updated);
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  deleteCategory,
  updateCategory,
};
