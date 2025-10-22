const { Category } = require('../models/Category.model');

const getAll = () => Category.findAll();

const getById = (id) => Category.findByPk(id);

const create = (categoryData) => Category.create(categoryData);

const update = async (id, categoryData) => {
  await Category.update(categoryData, { where: { id } });

  return Category.findByPk(id);
};

const remove = (id) => Category.destroy({ where: { id } });

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
