'use strict';

const { Expense } = require('../models/Expense');

function normalize({ id, userId, spentAt, title, amount, category, note }) {
  return {
    id,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };
}

async function getAll(userId, category, from, to) {
  const expenses = await Expense.findAll({
    order: ['createdAt'],
    logging: false,
  });

  return expenses.filter(expense => {
    const isUserIdMatch = userId
      ? expense.userId === +userId
      : true;

    const isCategoriesMatch = category
      ? expense.category === category
      : true;

    const isFromMatch = from
      ? expense.spentAt >= from
      : true;

    const isToMatch = to
      ? expense.spentAt <= to
      : true;

    return isUserIdMatch && isCategoriesMatch && isFromMatch && isToMatch;
  });
};

async function addExpense(expenseData) {
  const newExpense = await Expense.create(expenseData);

  return newExpense;
};

async function getById(expenseId) {
  const foundExpense = await Expense.findByPk(+expenseId);

  return foundExpense;
};

function removeExpense(expenseId) {
  return Expense.destroy({
    where: {
      id: +expenseId,
    },
  });
};

async function updateExpense(expenseId, dataToUpdate) {
  const updatedExpense = await Expense.update(dataToUpdate, {
    where: {
      id: +expenseId,
    },
  });

  return updatedExpense;
}

module.exports = {
  normalize,
  getAll,
  addExpense,
  getById,
  removeExpense,
  updateExpense,
};
