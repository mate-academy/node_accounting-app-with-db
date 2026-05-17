const { Category } = require('../models/Category.model.js');

const getAllCategories = async () => {
  return Category.findAll();
};

const getCategory = async (id) => {
  return Category.findByPk(id);
};

const createCategory = async (name) => {
  return Category.create({ name });
};

const removeCategory = async (id) => {
  const categoryToRemove = await getCategory(id);

  await Category.destroy({ where: { id } });

  return categoryToRemove;
};

const updateCategory = async (id, { name }) => {
  const category = await getCategory(id);

  if (!category) {
    return null;
  }

  const updatedCategory = await Category.update({ name });

  return updatedCategory;
};

module.exports = {
  getAllCategories,
  getCategory,
  createCategory,
  removeCategory,
  updateCategory,
};
