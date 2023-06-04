'use strict';

const { Expense } = require('../models/expense');
const { Op } = require('sequelize');

const getAllExpenses = (filters) => {
  const { userId: id, category, from, to } = filters;

  return Expense.findAll({
    where: {
      [Op.and]: {
        id,
        category,
        spentAt: {
          [Op.between]: [from, to],
        },
      },
    },
  });
};

const getOneExpense = (expenseId) => {
  return Expense.findByPk(expenseId);
};

module.exports = {
  getAllExpenses,
  getOneExpense,
};
