'use strict';

const { Expense } = require('../db');
const { Op } = require('sequelize');

const getAllExpenses = async(userId, categories, from, to) => {
  const whereClause = {};

  if (userId) {
    whereClause.userId = +userId;
  }

  if (categories) {
    whereClause.category = { [Op.in]: categories };
  }

  if (from && to) {
    whereClause.spentAt = {
      [Op.between]: [new Date(from), new Date(to)],
    };
  }

  const filteredExpenses = await Expense.findAll({
    where: whereClause,
  });

  return filteredExpenses;
};

const getExpenseById = async(id) => {
  try {
    const filteredExpenses = await Expense.findByPk(id);

    return filteredExpenses;
  } catch (err) {
    return null;
  }
};

const addNewExpense = async expense => {
  const newExpense = await Expense.create(expense);

  return newExpense;
};

const removeExpense = async(id) => {
  await Expense.destroy({
    where: {
      id,
    },
  });
};

const updateExpense = async({ id }, title) => {
  await Expense.update(
    { ...title },
    {
      where: {
        id,
      },
    },
  );

  const expense = await getExpenseById(id);

  return expense;
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  addNewExpense,
  removeExpense,
  updateExpense,
};
