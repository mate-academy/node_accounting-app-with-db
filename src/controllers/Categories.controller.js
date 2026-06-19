/* eslint-disable */
const categoriesService = require('../services/categories.service.js');

async function get(req, res) {
  const categories = await categoriesService.getAll();
  return res.send(categories);
}

async function getOne(req, res) {
  const { id } = req.params;

  const category = await categoriesService.getById(id);

  if (!category) {
    res.sendStatus(404);

    return;
  }

  res.send(category);
}

async function create(req, res) {
  const { name, type } = req.body;

  if (!name || !type) {
    res.sendStatus(400);

    return;
  }

  const category = await categoriesService.create({
    name,
    type,
  });

  res.status(201).send(category);
}

async function update(req, res) {
  const { id } = req.params;

  const category = await categoriesService.getById(id);

  if (!category) {
    res.sendStatus(404);

    return;
  }

  const updatedCategory = await categoriesService.update({ id, ...req.body });

  res.json(updatedCategory);
}

async function remove(req, res) {
  const { id } = req.params;

  if (!await categoriesService.getById(id)) {
    return res.sendStatus(404);
  }

  await categoriesService.remove(id);
  res.sendStatus(204);
}

module.exports = {
  get,
  getOne,
  create,
  update,
  remove,
};
