const { CATEGORY_NOT_FOUND, NAME_REQUIRED } = require('../const/errors');
const {
  getAll,
  normalize,
  getById,
  create,
  update,
  remove,
} = require('../services/categories.service');

const getCategories = async (req, res) => {
  const categories = await getAll();

  const normalizedCategories = categories.map((category) =>
    // eslint-disable-next-line prettier/prettier
    normalize(category));

  res.status(200);
  res.send(normalizedCategories);
};

const getCategoryById = async (req, res) => {
  const { id } = req.params;

  const category = await getById(id);

  if (!category) {
    res.status(404);

    res.send(CATEGORY_NOT_FOUND);
  }

  res.status(200);
  res.send(normalize(category));
};

const createCategory = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400);

    res.send(NAME_REQUIRED);
  }

  const newCategory = await create(name);

  res.status(201);
  res.send(normalize(newCategory));
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    res.status(400);
    res.send(NAME_REQUIRED);
  }

  const category = await getById(id);

  if (!category) {
    res.status(404);
    res.send(CATEGORY_NOT_FOUND);
  }

  await update(id, name);

  const updatedCategory = await getById(id);

  res.status(200);
  res.send(normalize(updatedCategory));
};

const removeCategory = async (req, res) => {
  const { id } = req.params;

  const category = await getById(id);

  if (!category) {
    res.status(404);
    res.send(CATEGORY_NOT_FOUND);
  }

  await remove(id);

  res.status(204);
  res.send(normalize(category));
};

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  removeCategory,
};
