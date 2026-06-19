const categoriesService = require('../services/categories.service');

const getAll = async (req, res) => {
  const categories = await categoriesService.getAll();

  res.json(categories);
};

const create = async (req, res) => {
  const name = req.body.name;

  if (!name) {
    return res.sendStatus(400);
  }

  const category = await categoriesService.create(name);

  res.status(201).json(category);
};

const getOne = async (req, res) => {
  const category = await categoriesService.getById(req.params.id);

  if (!category) {
    return res.sendStatus(404);
  }

  res.json(category);
};

const deleteOne = async (req, res) => {
  const category = await categoriesService.getById(req.params.id);

  if (!category) {
    return res.sendStatus(404);
  }

  await categoriesService.deleteById(req.params.id);

  res.sendStatus(204);
};

const update = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  const category = await categoriesService.getById(req.params.id);

  if (!category) {
    return res.sendStatus(404);
  }

  await categoriesService.update({
    id: req.params.id,
    name,
  });

  const updatedcategory = await categoriesService.getById(req.params.id);

  res.json(updatedcategory);
};

module.exports = {
  getAll,
  create,
  getOne,
  deleteOne,
  update,
};
