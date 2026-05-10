const { Category } = require('../models/Category.model');

const getAllCategories = () => {
  return Category.findAll();
};

const getCategory = (id) => {
  return Category.findByPk(id);
};

const createCategory = async (name) => {
  try {
    const category = await Category.create({
      name,
    });

    return category;
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      throw new Error('Category name already exists');
    }
    throw error;
  }
};

const updateCategory = async ({ id, name }) => {
  await Category.update({ name }, { where: { id } });
  return getCategory(id);
};

const removeCategory = async (id) => {
  await Category.destroy({ where: { id } });
};

module.exports = {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  removeCategory,
};
