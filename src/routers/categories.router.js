const {
  getAll,
  getById,
  create,
  update,
  remove,
} = require('../services/categories.service.js');

const getAllCategories = async (req, res) => {
  const categories = await getAll();

  res.send(categories);
};

const getCategoryById = async (req, res) => {
  const { id } = req.params;

  const idNum = Number(id);

  const category = await getById(idNum);

  if (!category) {
    res.status(404).send({ message: 'Not found' });

    return;
  }

  res.send(category);
};

const createCategory = async (req, res) => {
  const { name } = req.body;

  if (typeof name !== 'string') {
    res.status(400).send({ message: 'Invalid field' });

    return;
  }

  if (name === undefined) {
    res.status(400).send({ message: 'Missing required field' });

    return;
  }

  const category = await create({ name });

  res.status(201).send(category);
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;

  const idNum = Number(id);

  const category = await remove(idNum);

  if (!category) {
    res.status(404).send({ message: 'Not found' });

    return;
  }

  res.status(204).send();
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const idNum = Number(id);

  if (typeof name !== 'string') {
    res.status(400).send({ message: 'Invalid field' });

    return;
  }

  if (name === undefined) {
    res.status(400).send({ message: 'Missing required field' });

    return;
  }

  const category = await update({ id: idNum, name });

  if (!category) {
    res.status(404).send({ message: 'Not found' });

    return;
  }

  res.send(category);
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  deleteCategory,
  updateCategory,
};
