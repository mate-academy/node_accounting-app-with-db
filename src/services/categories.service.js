const { Categories } = require('../models/Categories.model');

async function getAllCategories() {
  try {
    const result = await Categories.findAll();

    return result;
  } catch {
    return [];
  }
}

async function getCategory(id) {
  try {
    const result = await Categories.findByPk(id);

    return result;
  } catch {
    return null;
  }
}

async function createCategory(categories) {
  try {
    const result = await Categories.create({ category: categories });

    return result;
  } catch {
    return null;
  }
}

async function updateCategory(id, categories) {
  try {
    const result = await Categories.update(
      { category: categories },
      {
        where: {
          id,
        },
        returning: true,
        plain: true,
      },
    );

    return result[1];
  } catch {
    return null;
  }
}

async function removeCategory(id) {
  try {
    const result = await Categories.destroy({ where: { id } });

    return result;
  } catch {
    return null;
  }
}

module.exports = {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  removeCategory,
};
