'use strict';

const { Sequelize } = require('sequelize');
const { Expense } = require('../models/expense');
const { User } = require('../models/user');
const { Category } = require('../models/category');

const getExpenses = async() => {
  return Expense.findAll({
    include: [
      { model: User },
      { model: Category },
    ],
  });
};

const getFilteredExpenses = ({ userId, categoryId, from, to }) => {
  const Op = Sequelize.Op;

  return Expense.findAll({
    where: {
      userId: +userId,
      category: categoryId,
      spentAt: from ? {
        [Op.gt]: from, [Op.lt]: to,
      } : { [Op.ne]: null },
    },
  });
};

const getExpense = async(expenseId) => {
  return Expense.findByPk(expenseId);
};

const createExpense = async(data) => {
  return Expense.create({
    ...data,
  });
};

const updateExpense = async({
  id,
  data,
}) => {
  return Expense.update({ ...data }, {
    where: {
      id: id,
    },
  });
};

const deleteExpense = async(expenseId) => {
  return Expense.destroy({
    where: {
      id: expenseId,
    },
  });
};

module.exports = {
  getExpenses,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
  getFilteredExpenses,
};
