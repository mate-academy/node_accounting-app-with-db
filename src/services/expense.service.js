'use strict';

const { Op } = require('sequelize');

const { Expense } = require('../models/Expense.js');
const { getNormalizedFilters } = require('../helpers/getNormalizedFilters.js');

const getAllFiltered = async(filters) => {
  const normalizedFilters = getNormalizedFilters(filters);

  const result = await Expense.findAll({
    where: {
      userId: normalizedFilters.userId || { [Op.not]: null },
      category: normalizedFilters.categories || { [Op.not]: null },
      spentAt: normalizedFilters.spentAt || { [Op.not]: null },
    },
    order: [['spentAt', 'DESC']],
  });

  return result;
};

const create = (newExpense) => {
  return Expense.create(newExpense);
};

const getById = (id) => {
  return Expense.findByPk(id);
};

const remove = async(id) => {
  await Expense.destroy({
    where: {
      id,
    },
  });
};

const update = async({
  id,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  await Expense.update({
    spentAt,
    title,
    amount,
    category,
    note,
  }, { where: { id } });

  const expense = getById(id);

  return expense;
};

module.exports = {
  expenseService: {
    getAllFiltered,
    create,
    getById,
    remove,
    update,
  },
};
