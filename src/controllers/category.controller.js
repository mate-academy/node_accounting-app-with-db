const categoryService = require('../services/category.service.js');

const get = async (req, res) => {
  const categories = await categoryService.getAll();

  res.send(categories);
};

const getOne = async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).send('Invalid id');
  }

  const category = await categoryService.getById(id);

  if (!category) {
    return res.status(404).send('Not found');
  }
  res.send(category);
};

const create = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send('Name is required');
  }

  try {
    const category = await categoryService.create(name);

    res.status(201).send(category);
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).send('Category with this name already exists');
    }
    throw err;
  }
};

const update = async (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;

  if (!name) {
    return res.status(400).send('Name is required');
  }

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).send('ID is required');
  }

  const isExist = await categoryService.getById(id);

  if (!isExist) {
    return res.status(404).send('Category Not found');
  }

  const updatedCategory = await categoryService.update({ id, name });

  if (!updatedCategory) {
    return res.sendStatus(404);
  }
  res.send(updatedCategory);
};

const remove = async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).send('ID is required');
  }

  const isExist = await categoryService.getById(id);

  if (!isExist) {
    res.status(404).send('Not found');

    return;
  }

  await categoryService.remove(id);
  res.sendStatus(204);
};

module.exports = {
  get,
  getOne,
  create,
  update,
  remove,
};
