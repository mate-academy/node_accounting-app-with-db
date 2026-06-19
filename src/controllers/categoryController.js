const categoryService = require('../services/categoryService.js');

const getAllController = async (req, res) => {
  const categories = await categoryService.getAll();

  res.json(categories);
};

const getByIdController = async (req, res) => {
  const id = Number(req.params.id);

  if (!req.params.id || Number.isNaN(id)) {
    return res.status(400).json({
      message: 'The required path parameter id is missing or invalid',
    });
  }

  const category = await categoryService.getById(id);

  if (!category) {
    return res.status(404).json({ message: 'Category not found' });
  }
  res.json(category);
};

const createController = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Required field missing' });
  }

  const category = await categoryService.create(name);

  res.status(201).json(category);
};

const deleteOneController = async (req, res) => {
  const id = Number(req.params.id);

  if (!req.params.id || Number.isNaN(id)) {
    return res.status(400).json({
      message: 'The required path parameter id is missing or invalid',
    });
  }

  const deleted = await categoryService.deleteById(id);

  if (!deleted) {
    return res.status(404).json({ message: 'Category not found' });
  }
  res.sendStatus(204);
};

const updateController = async (req, res) => {
  const id = Number(req.params.id);

  if (!req.params.id || Number.isNaN(id)) {
    return res.status(400).json({
      message: 'The required path parameter id is missing or invalid',
    });
  }

  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Required field missing' });
  }

  const category = await categoryService.getById(Number(req.params.id));

  if (!category) {
    return res.status(404).json({ message: 'Category not found' });
  }

  const updatedCategory = await categoryService.update({
    id: Number(req.params.id),
    name,
  });

  res.json(updatedCategory);
};

module.exports = {
  getAllController,
  getByIdController,
  createController,
  deleteOneController,
  updateController,
};
