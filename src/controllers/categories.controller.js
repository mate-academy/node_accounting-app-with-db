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

  res.status(200);
  res.send(categories.map((category) => normalize(category)));
};

const getCategoryById = async (req, res) => {
  const { id } = req.params;

  const category = await getById(id);

  if (!category) {
    res.status(404);

    res.send('Category not found');
  }

  res.status(200);
  res.send(normalize(category));
};

const createCategory = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400);

    res.send('Name is required');
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
    res.send('Name is required');
  }

  const category = await getById(id);

  if (!category) {
    res.status(404);
    res.send('Category not found');
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
    res.send('Category not found');
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
