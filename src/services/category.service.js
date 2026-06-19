const { Op } = require('sequelize');
const { Category } = require('../models/Category.model');

const getAll = async ({ name } = {}) => {
  const where = {};

  if (name) {
    where.name = { [Op.iLike]: `%${name}%` };
  }

  const result = await Category.findAll({
    where,
  });

  return result;
};

const getById = async (id) => Category.findByPk(id);
const add = (expense) => Category.create(expense);

const remove = (id) => Category.destroy({ where: { id } });

const update = async (id, categoryData) => {
  await Category.update(categoryData, { where: { id } });

  return getById(id);
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
