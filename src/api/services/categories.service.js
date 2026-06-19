const { models } = require('../../models/models');
const { Categories } = models;

const getAll = async () => {
  const categories = await Categories.findAll();

  return categories;
};

const getCategoryById = (id) => {
  return Categories.findByPk(id);
};

const createCategory = (name) => {
  return Categories.create({ name });
};

const updateCategory = async ({ id, name }) => {
  await Categories.update({ name }, { where: { id } });

  const category = await Categories.findByPk(id);

  return category.get({ plain: true });
};

const deleteCategory = async (id) => {
  await Categories.destroy({ where: { id } });
};

const categoriesServices = {
  getAll,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};

module.exports = {
  categoriesServices,
};
