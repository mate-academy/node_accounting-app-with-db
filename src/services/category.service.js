const { Category } = require('../models/Category.model');

const getAll = async () => {
  const result = await Category.findAll();

  return result;
};

const getById = async (id) => {
  const result = await Category.findByPk(id);

  return result;
};

const add = (category) => {
  return Category.create(category);
};

const remove = async (id) => {
  await Category.destroy({
    where: { id },
  });
};

const update = async (newCategory) => {
  const category = await getById(newCategory.id);

  if (!category) {
    return;
  }

  await category.update(newCategory);

  return category;
};

const categoryService = {
  getAll,
  getById,
  add,
  remove,
  update,
};

module.exports = {
  categoryService,
};
