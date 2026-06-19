const { Category } = require('../models/Category.model');

async function getCategories() {
  return Category.findAll();
}

async function getCategoryById(id) {
  return Category.findByPk(id);
}

async function createCategory({ category }) {
  return Category.create({ category });
}

async function updateCategory({ id, category }) {
  const categoryToUpdate = await getCategoryById(id);

  if (!categoryToUpdate) {
    return;
  }

  const updatedNumber = await Category.update(
    { category },
    {
      where: {
        id,
      },
    },
  );

  return updatedNumber[0];
}

async function deleteCategory(id) {
  return Category.destroy({
    where: {
      id,
    },
  });
}

async function reset() {
  await Category.destroy({ where: {} });
}

async function getOrCreateCategoryByName(categoryName) {
  let category = await Category.findOne({ where: { category: categoryName } });

  if (!category) {
    category = await Category.create({ category: categoryName });
  }

  return category;
}

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  reset,
  getOrCreateCategoryByName,
};
