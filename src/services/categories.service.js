/* eslint-disable no-console */
const { Category } = require('../models/Category.model');

async function getAllCategories() {
  try {
    const categories = await Category.findAll({ order: ['name'] });

    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error('Failed to retrieve categories.');
  }
}

async function getCategory(categoryId) {
  try {
    const category = await Category.findByPk(categoryId);

    return category;
  } catch (error) {
    console.error('Error fetching category:', error);
    throw new Error('Failed to retrieve category.');
  }
}

async function createCategory(name) {
  try {
    const category = await Category.create({ name });

    return category;
  } catch (error) {
    console.error('Error creating category:', error);
    throw new Error('Failed to create category.');
  }
}

async function deleteCategory(categoryId) {
  try {
    const deletedRows = await Category.destroy({
      where: {
        id: categoryId,
      },
    });

    return deletedRows > 0;
  } catch (error) {
    console.error('Error removing category:', error);

    return false;
  }
}

async function updateCategory(categoryId, body) {
  try {
    const { name } = body;

    await Category.update(
      { name },
      {
        where: {
          id: categoryId,
        },
      },
    );

    return true;
  } catch (error) {
    console.error('Error updating category:', error);

    return false;
  }
}

module.exports = {
  getAllCategories,
  getCategory,
  createCategory,
  deleteCategory,
  updateCategory,
};
