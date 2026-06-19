const Category = require('../models/Categories.model.js');

const getAllCategories = async (req, res) => {
  const result = await Category.findAll();

  res.send(result);
};

async function getCategoryById(req, res) {
  const { id } = req.params;

  const numericId = Number(id);

  if (isNaN(numericId)) {
    return res.sendStatus(400);
  }

  const result = await Category.findByPk(id);

  if (!result) {
    return res.sendStatus(404);
  }

  res.send(result);
}

async function createCategory(req, res) {
  const { name } = req.body;

  if (!name || !name.trim()) {
    return res.sendStatus(400);
  }

  const result = await Category.create({ name });

  res.status(201).json(result);
}

async function deleteCategory(req, res) {
  const { id } = req.params;

  const numericId = Number(id);

  if (isNaN(numericId)) {
    return res.sendStatus(400);
  }

  const result = await Category.findByPk(id);

  if (!result) {
    return res.sendStatus(404);
  }

  await Category.destroy({
    where: {
      id: id,
    },
  });

  res.sendStatus(204);
}

async function updateCategory(req, res) {
  const { id } = req.params;
  const { name } = req.body;

  const numericId = Number(id);

  if (isNaN(numericId)) {
    return res.sendStatus(400);
  }

  if (!name || !name.trim()) {
    return res.sendStatus(400);
  }

  const [updatedCount, updatedRows] = await Category.update(
    { name },
    { where: { id } },
  );

  if (updatedCount === 0) {
    return res.sendStatus(404);
  }

  const updatedCategory = updatedRows[0];

  res.send(updatedCategory);
}

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  deleteCategory,
  updateCategory,
};
