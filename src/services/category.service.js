const { Category } = require('./../models/Category.model');

const getAll = async () => {
  return Category.findAll();
};

const getById = async (id) => {
  return Category.findByPk(id);
};

const create = async (name) => {
  return Category.create({ name });
};

const update = async ({ id, name }) => {
  return Category.update({ name }, { where: { id } });
};

const remove = async (id) => {
  await Category.destroy({ where: { id } });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
