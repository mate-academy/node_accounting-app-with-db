const categoryService = require('../services/category.service');

const get = async (req, res) => {
  const categories = await categoryService.getAll();

  res.send(categories);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const category = await categoryService.getById(+id);

  if (!category) {
    res.sendStatus(404);

    return;
  }

  res.send(category);
};

const create = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newCategory = await categoryService.create(name);

  res.statusCode = 201;
  res.send(newCategory);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const category = await categoryService.getById(+id);

  if (!category) {
    res.sendStatus(404);

    return;
  }

  await categoryService.update({ id, name });

  const updatedCategory = await categoryService.getById(+id);

  res.send(updatedCategory);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const category = await categoryService.getById(+id);

  if (!category) {
    res.sendStatus(404);

    return;
  }

  await categoryService.remove(+id);
  res.sendStatus(204);
};

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
};
