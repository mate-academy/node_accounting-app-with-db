const categoryService = require('../services/category.service');

const get = async (req, res) => {
  const categories = await categoryService.getAll();

  return res.status(200).json(categories);
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryService.getById(id);

    if (!category) {
      return res.status(404).end();
    }

    return res.status(200).json(category);
  } catch (error) {
    return res.status(404).end();
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryService.getById(id);

    if (!category) {
      return res.status(404).end();
    }

    await categoryService.remove(id);

    return res.status(204).end();
  } catch (error) {
    return res.status(404).end();
  }
};

const edit = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(400).end();
  }

  const category = await categoryService.getById(id);

  const updatedCategory = await categoryService.edit(category, { name });

  return res.status(200).json(updatedCategory);
};

const create = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).end();
  }

  const category = await categoryService.create({ name });

  if (!category) {
    return res.status(404).end();
  }

  return res.status(201).json(category);
};

const categoryController = {
  get,
  getOne,
  remove,
  edit,
  create,
};

module.exports = categoryController;
