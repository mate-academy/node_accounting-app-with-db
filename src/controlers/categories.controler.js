const categoryServices = require('../services/categories.services');

const getAll = async (req, res) => {
  const categories = await categoryServices.get();

  res.status(200).send(categories);
};

const getOne = async (req, res) => {
  const { id } = req.params;
  const normalaizedId = Number(id);

  if (isNaN(normalaizedId)) {
    return res.status(400).send('Bad request');
  }

  const category = await categoryServices.getOne(normalaizedId);

  if (!category) {
    return res.status(404).send('Not found');
  }

  res.status(200).send(category);
};

const add = async (req, res) => {
  const { title } = req.body;

  if (!title || typeof title !== 'string') {
    return res.status(400).send('Bad request');
  }

  const newCategory = await categoryServices.add(title.trim());

  res.status(201).send(newCategory);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const normalaizedId = Number(id);

  if (isNaN(normalaizedId)) {
    return res.status(400).status('Bad request');
  }

  const category = await categoryServices.getOne(normalaizedId);

  if (!category) {
    return res.status(404).send('Not found');
  }

  await categoryServices.remove(normalaizedId);
  res.sendStatus(204);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const normalaizedId = Number(id);

  if (isNaN(normalaizedId) || !title || typeof title !== 'string') {
    return res.status(400).send('Bad request');
  }

  const category = await categoryServices.getOne(normalaizedId);

  if (!category) {
    return res.status(404).send('Not found');
  }

  await categoryServices.update({ id: normalaizedId, title: title.trim() });

  const updatedCategory = await categoryServices.getOne(normalaizedId);

  res.status(200).send(updatedCategory);
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
