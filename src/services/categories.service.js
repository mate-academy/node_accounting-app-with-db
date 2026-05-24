const { Category } = require('../models');

const normalize = ({ id, name }) => ({ id, name });

const create = async (name) => {
  const category = await Category.create({ name });

  return category;
};

const getAll = async () => {
  const categories = await Category.findAll();

  return categories;
};

const getOne = (id) => {
  const category = Category.findByPk(id);

  return category;
};

const update = async (id, { name }) => {
  // eslint-disable-next-line no-unused-vars
  const [_categoriesUpdated, [updatedCategory]] = await Category.update(
    { name },
    { where: { id }, returning: true },
  );

  return updatedCategory;
};

const remove = async (id) => {
  const categoriesRemoved = await Category.destroy({ where: { id } });

  return categoriesRemoved;
};

const categoriesService = {
  normalize,
  getAll,
  getOne,
  create,
  update,
  remove,
};

exports.categoriesService = categoriesService;
