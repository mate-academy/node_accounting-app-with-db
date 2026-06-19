/* eslint-disable no-console */
const categoryService = require('../services/categoryService.js');

const getAll = async (req, res) => {
  const categories = await categoryService.getAll();

  res.json(categories);
};

const getOne = async (req, res) => {
  const id = Number(req.params.id);
  const category = await categoryService.getById(id);

  if (!category) {
    return res.status(404).json({ message: 'Category not found' });
  }

  res.json(category);
};

const create = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  const category = await categoryService.create(name);

  res.status(201).json(category);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const category = await categoryService.getById(id);

  if (!category) {
    return res.status(404).json({ message: 'Category not found' });
  }

  await categoryService.remove(id);

  res.sendStatus(204);
};

const update = async (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;

  if (id === undefined) {
    return res.status(400).json({ message: 'Id is required' });
  }

  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  const category = await categoryService.update({ id, name });

  if (!category) {
    return res.status(404).json({ message: 'Category not found' });
  }

  res.json(category);
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
