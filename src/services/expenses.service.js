'use strict';

const { Expense } = require('../models/Expense');

async function getAll({
  userId,
  from,
  to,
  categories,
}) {
  const filteredExpenses = await Expense.findAll({
    order: [ 'createdAt' ],
  });

  if (userId) {
    return filteredExpenses.filter(expense => expense.userId === +userId);
  }

  if (categories) {
    return filteredExpenses.filter(expense => (
      categories.includes(expense.category)
    ));
  }

  if (to) {
    const toDate = new Date(to);

    return filteredExpenses.filter(expense => {
      const targetDate = new Date(expense.spentAt);

      return targetDate <= toDate;
    });
  }

  if (from) {
    const fromDate = new Date(from);

    return filteredExpenses.filter(expense => {
      const targetDate = new Date(expense.spentAt);

      return targetDate >= fromDate;
    });
  }

  if (from && to) {
    const fromDate = new Date(from);
    const toDate = new Date(to);

    return filteredExpenses.filter(expense => {
      const targetDate = new Date(expense.spentAt);

      return targetDate >= fromDate && targetDate <= toDate;
    });
  }

  if (filteredExpenses.length === 0) {
    return [];
  }

  return filteredExpenses;
}

function getById(expenseId) {
  return Expense.findByPk(expenseId);
}

function create({
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

function remove(expenseId) {
  return Expense.destroy({
    where: { id: expenseId },
  });
}

async function update({ id, ...updates }) {
  // eslint-disable-next-line no-unused-vars
  const [_, [updatedExpense]] = await Expense.update({ ...updates }, {
    where: { id },
    returning: true,
  });

  return updatedExpense;
}

function normalize(expense) {
  return {
    id: expense.id,
    userId: expense.userId,
    spentAt: expense.spentAt,
    title: expense.title,
    amount: expense.amount,
    category: expense.category,
    note: expense.note,
  };
}

module.exports = {
  getAll, getById, create, remove, update, normalize,
};
