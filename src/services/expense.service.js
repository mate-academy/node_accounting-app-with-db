/* eslint-disable function-paren-newline */
const { Op } = require('sequelize');
const { Expense } = require('./../models/Expense.model');

const get = async () => {
  return Expense.findAll();
};

const getOne = async (id) => {
  return Expense.findByPk(id);
};

const getByQuery = async (query) => {
  if (!query || Object.keys(query).length === 0) {
    return get();
  }

  const { userId, categories, from, to } = query;
  const whereConditions = {};

  if (userId) {
    whereConditions.userId = +userId;
  }

  if (categories) {
    const categoryList = Array.isArray(categories)
      ? categories
      : categories.split(',');

    whereConditions.category = {
      [Op.in]: categoryList,
    };
  }

  if (from && to) {
    whereConditions.spentAt = {
      [Op.between]: [new Date(from), new Date(to)],
    };
  }

  return Expense.findAll({
    where: whereConditions,
    order: [['spentAt', 'ASC']],
  });
};

const create = async ({ userId, spentAt, title, amount, category, note }) => {
  return Expense.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });
};

const update = async ({ id, ...updates }) => {
  return Expense.update({ ...updates }, { where: { id } });
};

const remove = async (id) => {
  await Expense.destroy({ where: { id } });
};

// const clear = () => {
//   expenses = [];
// };

module.exports = {
  get,
  getOne,
  getByQuery,
  create,
  update,
  remove,
  // clear,
};
