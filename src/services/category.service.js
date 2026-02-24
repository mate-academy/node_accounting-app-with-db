const { models } = require('../models/models.js');
const { normalizeCategory } = require('../dto');

const getAllCategories = async () => {
  const categories = await models.Category.findAll();

  return categories.map(normalizeCategory);
};

const getCategoryById = async (id) => {
  const category = await models.Category.findByPk(id);

  if (!category) {
    return null;
  }

  return normalizeCategory(category.get({ plain: true }));
};

const getCategoryByName = async (name) => {
  const category = await models.Category.findOne({ where: { name } });

  if (!category) {
    return null;
  }

  return normalizeCategory(category.get({ plain: true }));
};

const createCategory = async ({ name }) => {
  const category = await models.Category.create({ name });

  if (category) {
    return getCategoryById(category.id);
  }

  return null;
};

const removeCategory = async (id) => {
  await models.Category.destroy({ where: { id } });
};

const updateCategory = async (id, { name }) => {
  await models.Category.update({ name }, { where: { id } });

  return getCategoryById(id);
};

module.exports = {
  getAllCategories,
  getCategoryById,
  getCategoryByName,
  createCategory,
  removeCategory,
  updateCategory,
};
