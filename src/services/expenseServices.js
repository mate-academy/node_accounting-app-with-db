'use strict';

const { Expense } = require('../models/expenseModel');

async function getExpenses(userId, categories, from, to) {
  let filteredExpenses = await Expense.findAll();

  if (userId) {
    filteredExpenses = filteredExpenses
      .filter(expense => +expense.userId === +userId);
  }

  if (categories) {
    filteredExpenses = filteredExpenses
      .filter(expense => categories.includes(expense.category));
  }

  if (from && to) {
    filteredExpenses = filteredExpenses
      .filter(expense => (
        expense.spentAt > from && expense.spentAt < to
      ));
  }

  if (from && !to) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.spentAt >= from);
  }

  if (to && !from) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.spentAt <= to);
  }

  return filteredExpenses;
};

async function getExpenseByUserId(userId) {
  const foundExpense = await Expense.findAll({
    where: { userId },
  });

  return foundExpense;
}

async function getExpenseById(id) {
  const foundExpense = await Expense.findByPk(id);

  return foundExpense;
}

async function create({
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) {
  return Expense.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });
}

async function remove(id) {
  Expense.destroy({
    where: { id },
  });
}

async function update(expense, req) {
  return Expense.update(req.body, {
    where: { id: expense.id },
  });
}

module.exports = {
  getExpenses,
  getExpenseByUserId,
  getExpenseById,
  create,
  remove,
  update,
};
