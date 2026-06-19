const { categoriesService } = require('../services/categories.service');

const getAll = async (req, res) => {
  const categories = await categoriesService.getAll();

  res.json(categories.map((category) => categoriesService.normalize(category)));
};

const getOne = async (req, res) => {
  const category = await categoriesService.getById(req.params.id);

  if (!category) {
    return res.sendStatus(404);
  }

  res.json(categoriesService.normalize(category));
};

const create = async (req, res) => {
  const name = req.body.name;

  if (!name) {
    return res.sendStatus(400);
  }

  const newCategory = await categoriesService.create(name);

  res.status(201).json(newCategory);
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
  const { id } = req.params;
  const { name } = req.body;

  const categoryExists = await categoriesService.getById(id);

  if (!categoryExists) {
    return res.sendStatus(404);
  }

  if (!name) {
    return res.sendStatus(400);
  }

  const updatedCategory = await categoriesService.update({
    id,
    name,
  });

  res.json(updatedCategory);
};

const categoriesController = {
  getAll,
  getOne,
  create,
  deleteOne,
  update,
};

module.exports = {
  categoriesController,
};
