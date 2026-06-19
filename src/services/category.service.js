const { Category } = require('../models/Category.model.js');

const getAll = async () => {
  const categories = await Category.findAll();

  return categories;
};

const getById = async (id) => {
  const category = await Category.findByPk(id);

  return category;
};

const remove = async (id) => {
  await Category.destroy({
    where: {
      id,
    },
  });
};

const edit = async (category, { name }) => {
  await category.update({ name }, { silent: true });

  return category;
};

const create = async ({ name }) => {
  const category = await Category.create({ name });

  return category;
};

const categoryService = {
  getAll,
  getById,
  remove,
  edit,
  create,
};

module.exports = categoryService;
