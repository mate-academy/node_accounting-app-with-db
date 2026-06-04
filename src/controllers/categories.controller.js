const categoriesService = require('../repository/categories.repository');

const get = async (_req, res) => {
  try {
    const categories = await categoriesService.getAll();

    res.json(categories);
  } catch (error) {
    res.sendStatus(500);
  }
};

const create = async (req, res) => {
  const { name } = req.body;

  if (typeof name !== 'string' || name.trim().length === 0) {
    res.sendStatus(400);

    return;
  }

  try {
    const category = await categoriesService.create(name);

    res.status(201).json(category);
  } catch (error) {
    res.sendStatus(500);
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await categoriesService.getById(id);

    if (!category) {
      res.sendStatus(404);

      return;
    }
    res.json(category);
  } catch (error) {
    res.sendStatus(500);
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await categoriesService.getById(id);

    if (!category) {
      res.sendStatus(404);

      return;
    }

    await categoriesService.remove(id);

    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(500);
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (typeof name !== 'string' || name.trim().length === 0) {
    res.sendStatus(400);

    return;
  }

  try {
    const category = await categoriesService.getById(id);

    if (!category) {
      res.sendStatus(404);

      return;
    }

    const updatedCategory = await categoriesService.update({ id, name });

    res.json(updatedCategory);
  } catch (error) {
    res.sendStatus(500);
  }
};

module.exports = {
  get,
  create,
  getOne,
  remove,
  update,
};
