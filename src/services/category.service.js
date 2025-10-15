const { Category } = require('../models/Category.model');

Category.sync();

const getCategories = async () => {
  const result = await Category.findAll();

  return result;
};

const getCategory = async (id) => {
  const category = await Category.findByPk(+id);

  return category;
};

const createCategory = async ({ title, expenseId }) => {
  const category = await Category.create({ title, expenseId: +expenseId });

  return category;
};

const deleteCategory = async (id) => {
  const category = await getCategory(+id);

  await Category.destroy({ where: { id: +id } });

  return category || null;
};

const updateCategory = async ({ id, expenseId, title }) => {
  const categoryToUpdate = await getCategory(id);
  const updateFields = {};

  if (!categoryToUpdate) {
    return null;
  }

  if (expenseId !== undefined) {
    updateFields.expenseId = expenseId;
  }

  if (title !== undefined) {
    updateFields.title = title;
  }

  await Category.update(updateFields, { where: { id: +id } });

  const updatedCategory = await getCategory(+id);

  return updatedCategory;
};

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  deleteCategory,
  updateCategory,
};
