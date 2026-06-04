const { Category } = require('../models/Category.model');

const getAll = async () => {
  return Category.findAll({ order: [['name', 'DESC']] });
};

const create = async (name) => {
  return Category.create({ name });
};

const getById = async (id) => {
  return Category.findByPk(id);
};

const remove = async (id) => {
  await Category.destroy({ where: { id } });
};

const update = async ({ id, name }) => {
  await Category.update({ name }, { where: { id } });

  return getById(id);
};

module.exports = {
  getAll,
  create,
  getById,
  remove,
  update,
};
