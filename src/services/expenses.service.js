'use strict';

const { Expense } = require('../datebase/expenses.database');

const getAll = async(params) => {
  const { userId, category, from, to } = params;

  const expenses = await Expense.findAll();

  const filteredExpenses = expenses.filter(expense => {
    const condition1 = userId
      ? expense.userId === userId
      : true;

    const condition2 = from
      ? new Date(from).getTime() < new Date(expense.spentAt).getTime()
      : true;

    const condition3 = to
      ? new Date(to).getTime() > new Date(expense.spentAt).getTime()
      : true;

    const condition4 = category
      ? category.includes(expense.category)
      : true;

    const isAllContitions
      = condition1 && condition2
      && condition3 && condition4;

    if (isAllContitions) {
      return true;
    }

    return false;
  });

  return filteredExpenses;
};

const create = (expense) => {
  return Expense.create(expense);
};

const getById = (expenseId) => {
  return Expense.findByPk(expenseId);
};

const remove = (expenseId) => {
  Expense.destroy({
    where: { id: expenseId },
  });
};

const update = (id, params) => {
  return Expense.update(params, {
    where: { id },
  });
};

module.exports.expenseService = {
  getAll,
  create,
  getById,
  remove,
  update,
};
