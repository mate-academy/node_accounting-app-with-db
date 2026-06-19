const { Category } = require('./../models/Category.model');

const getAllCategories = async () => {
  return Category.findAll();
};

const getOneCategory = async (id) => {
  return Category.findByPk(id);
};

const createCategory = async (title) => {
  return Category.create({ title });
};

const updateCategory = async ({ id, title }) => {
  await Category.update({ title }, { where: { id } });

  return Category.findByPk(id);
};

const deleteCategory = async (id) => {
  return Category.destroy({ where: { id } });
};

module.exports = {
  getAllCategories,
  getOneCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
