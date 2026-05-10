const categoriesService = require('../services/category.service');

const get = async (req, res) => {
  const categories = await categoriesService.getAllCategories();
  res.send(categories);
};

const getOne = async (req, res) => {
  const id = Number(req.params.id);

  const foundCategory = await categoriesService.getCategory(id);

  if (!foundCategory) {
    res.sendStatus(404);

    return;
  }

  res.send(foundCategory);
};

const create = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  try {
    const newCategory = await categoriesService.createCategory(name);
    res.status(201).send(newCategory);
  } catch (error) {
    if (error.message === 'Category with this name already exists') {
      return res.status(400).json({ error: error.message });
    }

    res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  const { name } = req.body;
  const id = Number(req.params.id);

  const foundCategory = await categoriesService.getCategory(id);

  if (!foundCategory) {
    res.sendStatus(404);

    return;
  }

  if (!name) {
    return res.sendStatus(400);
  }

  const updatedCategory = await categoriesService.updateCategory({ id, name });

  res.send(updatedCategory);
};

const remove = async (req, res) => {
  const id = Number(req.params.id);

  if (!(await categoriesService.getCategory(id))) {
    res.sendStatus(404);

    return;
  }

  await categoriesService.removeCategory(id);

  res.sendStatus(204);
};

module.exports = {
  get,
  getOne,
  create,
  update,
  remove,
};
