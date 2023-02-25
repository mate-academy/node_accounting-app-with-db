'use strict';

const { Expense } = require('../database/expenses.database.js');

const expenseService = {
  getAll: async(params) => {
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
  },
  getById: (expenseId) => {
    return Expense.findByPk(expenseId);
  },
  create: (expense) => {
    return Expense.create(expense);
  },
  remove: (expenseId) => {
    Expense.destroy({
      where: { id: expenseId },
    });
  },
  update: (id, params) => {
    return Expense.update(params, {
      where: { id },
    });
  },
};

module.exports = {
  expenseService,
};
