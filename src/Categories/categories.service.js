const { Category } = require('../models/Categories.model');

const getAllCategories = async () => {
  return Category.findAll();
};
const getOneCategory = async (id) => {
  return Category.findByPk(id);
};
const createCategory = async (categoryItem) => {
  const newCategory = await Category.create(categoryItem);

  return newCategory;
};
const updateCategory = async (id, paramsToUpdate) => {
  const [updatedCount, updatedCategory] = await Category.update(
    paramsToUpdate,
    {
      where: { id },
      returning: true,
    },
  );

  if (updatedCount === 0) {
    return null;
  }

  return updatedCategory[0];
};
const deleteCategory = async (id) => {
  const deletedCount = await Category.destroy({ where: { id } });

  return deletedCount > 0;
};

module.exports = {
  getAllCategories,
  getOneCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
