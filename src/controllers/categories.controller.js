const {
  models: { Category },
} = require('../models/models');

function handleControllerError(res, action, error) {
  // eslint-disable-next-line no-console
  console.error(`Smth bad with: ${action}`, error);
  res.sendStatus(500);
}

async function getAllCategories(req, res) {
  try {
    const categories = await Category.findAll({
      order: [['id', 'ASC']],
    });

    res.send(categories);
  } catch (error) {
    handleControllerError(res, 'get', error);
  }
}

async function getCategoryById(req, res) {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(Number(id));

    if (!category) {
      return res.sendStatus(404);
    }

    res.status(200).send(category);
  } catch (error) {
    handleControllerError(res, 'get', error);
  }
}

async function create(req, res) {
  try {
    const { name } = req.body;

    if (!name) {
      return res.sendStatus(400);
    }

    const category = await Category.create({ name });

    res.status(201).send(category);
  } catch (error) {
    handleControllerError(res, 'create', error);
  }
}

async function remove(req, res) {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(Number(id));

    if (!category) {
      return res.status(404).json({ error: 'Not found' });
    }

    await category.destroy();

    return res.sendStatus(204);
  } catch (error) {
    handleControllerError(res, 'remove', error);
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const category = await Category.findByPk(Number(id));

    if (!category) {
      return res.status(404).json({ error: 'Not found' });
    }

    if (!name) {
      return res.status(400).json({ error: 'Bad Request' });
    }

    category.name = name;

    await category.save();

    return res.status(200).send(category);
  } catch (error) {
    handleControllerError(res, 'update', error);
  }
}

module.exports = {
  getAllCategories,
  getCategoryById,
  remove,
  create,
  update,
};
