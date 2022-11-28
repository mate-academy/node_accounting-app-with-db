'use strict';

const { Expense } = require('../model/expenses');

function getAll() {
  return Expense.findAll({
    order: ['spentAt'],
  });
}

async function getFiltered(searchParams) {
  const { userId, category } = searchParams;

  let filteredExpenses = await Expense.findAll();

  if (category) {
    filteredExpenses = filteredExpenses.filter(
      expense => expense.category === category
    );
  }

  if (userId) {
    filteredExpenses = filteredExpenses.filter(
      expense => expense.userId === +userId
    );
  }

  return filteredExpenses;
}

function getById(expensesId) {
  return Expense.findByPk(expensesId);
}

function create(
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
) {
  return Expense.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });
}

function remove(expensesId) {
  return Expense.destroy({
    where: {
      id: expensesId,
    },
  });
}

function update(expensesId, title, spentAt, amount, category, note) {
  return Expense.update({
    title,
    spentAt,
    amount,
    category,
    note,
  }, {
    where: { id: expensesId },
  });
}

module.exports = {
  getAll,
  getFiltered,
  getById,
  create,
  remove,
  update,
};
