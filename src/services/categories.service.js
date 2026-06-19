const { Category } = require('../models/Category.model');

const getAll = async () => {
  const categories = await Category.findAll();

  return categories;
};

const getById = async (id) => {
  const category = await Category.findByPk(id);

  return category;
};

const create = async ({ name }) => {
  const category = await Category.create({ name });

  return category;
};

const remove = async (id) => {
  const deleted = await Category.destroy({ where: { id } });

  return deleted;
};

const update = async ({ id, name }) => {
  await Category.update({ name }, { where: { id } });

  const category = await getById(id);

  return category;
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
