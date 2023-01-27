'use strict';

const Expense = require('../models/Expense');

const getAll = async(
  userId = null, category = null, fromDate = null, toDate = null
) => {
  let allExpenses = await Expense.findAll({
    order: [['spentAt', 'DESC']],
  });

  if (userId) {
    allExpenses = allExpenses.filter(expense => expense.userId === userId);
  }

  if (category) {
    allExpenses = allExpenses.filter(expense => expense.category === category);
  }

  if (fromDate) {
    allExpenses = allExpenses.filter(expense => expense.spentAt > fromDate);
  }

  if (toDate) {
    allExpenses = allExpenses.filter(expense => expense.spentAt < toDate);
  }

  return allExpenses;
};

const getById = (expenseId) => {
  return Expense.findByPk(expenseId);
};

const create = async(userId, spentAt, title, amount, category, note) => {
  const expenses = await getAll();

  const maxId = Math.max(...expenses.map(expense => expense.id));

  return Expense.create({
    id: maxId > 0 ? maxId + 1 : 1,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });
};

const remove = (expenseId) => {
  return Expense.destroy({
    where: {
      id: expenseId,
    },
  });
};

const update = (expenseId, newData) => {
  return Expense.update({
    ...newData,
  }, {
    where: {
      id: expenseId,
    },
  });
};

module.exports = {
  getAll, getById, create, remove, update,
};
