'use strict';

const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model');

const getExpenses = async(
  userId,
  categories,
  from,
  to,
) => {
  const expenses = await Expense.findAll({
    where: {
      userId,
      spentAt: {
        [Op.between]: [from, to],
      },
      category: {
        [Op.in]: categories,
      },
    },
  });

  return expenses;
};

const createExpense = async(
  userId,
  title,
  spentAt,
  category,
  amount,
  note = '',
) => {
  await Expense.create({
    userId,
    title,
    spentAt,
    category,
    amount,
    note,
  });
};

const getExpense = (id) => {
  return Expense.findByPk(id);
};

const deleteExpense = async(id) => {
  await Expense.destroy({ where: id });
};

const updateExpense = async({
  id,
  title,
  spentAt,
  category,
  amount,
  note,
}) => {
  await Expense.update({
    title,
    spentAt,
    category,
    amount,
    note,
  }, { where: id });
};

module.exports = {
  getExpenses,
  createExpense,
  getExpense,
  deleteExpense,
  updateExpense,
};
