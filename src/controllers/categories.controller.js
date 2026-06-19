const categoryService = require('../services/categories.service');

const getAll = async (req, res) => {
  const categories = await categoryService.getAll();

  res.json(categories);
};

const getById = async (req, res) => {
  const category = await categoryService.getById(req.params.id);

  if (!category) {
    res.status(404).send('Not Found');

    return;
  }

  res.json(category);
};

const create = async (req, res) => {
  const { name: categoryName } = req.body;

  if (!categoryName) {
    res.status(400).send('Name is required');

    return;
  }

  const category = await categoryService.create({ name: categoryName });

  res.status(201).json(category);
};

const update = async (req, res) => {
  const { name: categoryName } = req.body;

  if (!categoryName) {
    res.status(400).send('Name is required');

    return;
  }

  const category = await categoryService.update(req.params.id, {
    name: categoryName,
  });

  if (!category) {
    res.status(404).send('Not Found');

    return;
  }

  res.json(category);
};

const deleteById = async (req, res) => {
  const deleted = await categoryService.deleteById(req.params.id);

  if (!deleted) {
    res.status(404).send('Not Found');

    return;
  }

  res.status(204).send();
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById,
};
