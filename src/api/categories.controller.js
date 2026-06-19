const {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  removeCategory,
} = require('../services/categories.service');

async function getAll(req, res) {
  const result = await getAllCategories();

  res.send(result);
}

async function get(req, res) {
  const result = await getCategory(req.params.id);

  if (!result) {
    return res.status(404).send({ error: ['Category not Found'] });
  }

  res.send(result);
}

async function create(req, res) {
  const result = await createCategory(req.body.category);

  if (!result) {
    return res.status(400).end();
  }

  res.status(201).send(result);
}

async function update(req, res) {
  const result = await updateCategory(req.params.id, req.body.categories);

  if (!result) {
    res.status(404).end();

    return;
  }

  res.send(result);
}

async function remove(req, res) {
  const result = await removeCategory(req.params.id);

  if (!result) {
    res.status(404).end();
  }

  res.status(204).end();
}

module.exports = {
  getAll,
  get,
  create,
  update,
  remove,
};
