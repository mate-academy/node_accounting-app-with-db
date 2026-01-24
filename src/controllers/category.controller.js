const {
  getAll,
  getCategoryById,
  create,
  update,
  remove,
} = require('../services/category.service');

const get = async (req, res) => {
  const categories = await getAll();

  res.send(categories);
};

const getById = async (req, res) => {
  const { id } = res.params;

  const category = await getCategoryById(id);

  if (!category) {
    res.sendStatus(400);

    return;
  }

  res.send(category);
};

const createCategory = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newCategory = await create(name);

  res.status(201).send(newCategory);
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (typeof name !== 'string' || name === undefined) {
    res.sendStatus(400);

    return;
  }

  const category = await getById(id);

  if (!category) {
    return res.sendStatus(404);
  }

  const updatedCategory = await update(id, name);

  res.status(200).send(updatedCategory);
};

const removeCategory = async (req, res) => {
  const { id } = req.params;

  if (!(await getCategoryById(id))) {
    res.sendStatus(400);

    return;
  }

  await remove(id);

  res.sendStatus(204);
};

module.exports = {
  get,
  getById,
  createCategory,
  updateCategory,
  removeCategory,
};
